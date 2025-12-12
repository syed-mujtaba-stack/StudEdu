"""
AI Tutor endpoint with streaming chat support.
"""
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, List
import json

from openrouter_client import groq_client
from services.supabase_logger import log_ai_interaction_async
from middleware.rate_limit import limiter, RATE_LIMITS
from config import MODEL_CONFIGS

router = APIRouter(prefix="/api/ai/tutor", tags=["AI Tutor"])


class ChatMessage(BaseModel):
    """A single chat message."""
    role: str  # 'user' or 'assistant'
    content: str


class TutorChatRequest(BaseModel):
    """Request body for tutor chat."""
    message: str
    context: Optional[str] = None
    history: Optional[List[ChatMessage]] = []
    lesson_title: Optional[str] = None
    course_title: Optional[str] = None


class TutorChatResponse(BaseModel):
    """Response from tutor chat (non-streaming)."""
    response: str
    model: str


@router.post("/chat")
@limiter.limit(RATE_LIMITS["tutor"])
async def chat_with_tutor(request: Request, body: TutorChatRequest):
    """
    Chat with the AI tutor.
    Returns a streaming response for real-time message display.
    """
    config = MODEL_CONFIGS["tutor"]
    
    # Build messages with history
    messages = [
        {"role": "system", "content": config["system_prompt"]}
    ]
    
    # Add context about current lesson/course if provided
    if body.context or body.lesson_title or body.course_title:
        context_parts = []
        if body.course_title:
            context_parts.append(f"Course: {body.course_title}")
        if body.lesson_title:
            context_parts.append(f"Lesson: {body.lesson_title}")
        if body.context:
            context_parts.append(f"Content: {body.context}")
        
        messages.append({
            "role": "system",
            "content": f"Current learning context:\n{chr(10).join(context_parts)}"
        })
    
    # Add chat history
    for msg in (body.history or []):
        messages.append({"role": msg.role, "content": msg.content})
    
    # Add current message
    messages.append({"role": "user", "content": body.message})
    
    # Get user ID from headers for logging
    user_id = request.headers.get("X-User-ID")
    
    async def generate():
        """Generator for streaming response."""
        full_response = ""
        
        try:
            async for chunk in groq_client.chat_completion_stream(
                messages=messages,
                model=config["model"],
                temperature=config["temperature"],
                max_tokens=config["max_tokens"]
            ):
                full_response += chunk
                # Send as Server-Sent Event format
                yield f"data: {json.dumps({'content': chunk})}\n\n"
            
            # Send completion signal
            yield f"data: {json.dumps({'done': True})}\n\n"
            
            # Log the interaction asynchronously
            await log_ai_interaction_async(
                user_id=user_id,
                prompt=body.message,
                response=full_response,
                model=config["model"]
            )
            
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


@router.post("/chat/sync", response_model=TutorChatResponse)
@limiter.limit(RATE_LIMITS["tutor"])
async def chat_with_tutor_sync(request: Request, body: TutorChatRequest):
    """
    Non-streaming chat with the AI tutor.
    Returns the complete response at once.
    """
    config = MODEL_CONFIGS["tutor"]
    
    messages = [
        {"role": "system", "content": config["system_prompt"]}
    ]
    
    if body.context:
        messages.append({
            "role": "system",
            "content": f"Current lesson context: {body.context}"
        })
    
    for msg in (body.history or []):
        messages.append({"role": msg.role, "content": msg.content})
    
    messages.append({"role": "user", "content": body.message})
    
    try:
        response = await groq_client.chat_completion(
            messages=messages,
            model=config["model"],
            temperature=config["temperature"],
            max_tokens=config["max_tokens"]
        )
        
        content = response["choices"][0]["message"]["content"]
        
        # Log the interaction
        user_id = request.headers.get("X-User-ID")
        await log_ai_interaction_async(
            user_id=user_id,
            prompt=body.message,
            response=content,
            model=config["model"],
            tokens_used=response.get("usage", {}).get("total_tokens")
        )
        
        return TutorChatResponse(response=content, model=config["model"])
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
