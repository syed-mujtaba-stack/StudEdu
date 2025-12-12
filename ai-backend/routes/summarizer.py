"""
AI Summarizer endpoint.
"""
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import Optional, Literal
import json

from openrouter_client import groq_client
from services.supabase_logger import log_ai_interaction_async
from middleware.rate_limit import limiter, RATE_LIMITS
from config import MODEL_CONFIGS

router = APIRouter(prefix="/api/ai", tags=["AI Summarizer"])


class SummarizeRequest(BaseModel):
    """Request body for summarization."""
    content: str = Field(..., description="Content to summarize")
    format: Literal["bullets", "paragraph", "concepts"] = Field(
        default="bullets",
        description="Output format: bullets, paragraph, or key concepts"
    )
    max_length: Optional[int] = Field(
        default=None,
        description="Maximum length in words (approximate)"
    )
    stream: bool = Field(default=False, description="Enable streaming response")


class SummarizeResponse(BaseModel):
    """Response with summary."""
    summary: str
    format: str
    model: str
    word_count: int


@router.post("/summarize")
@limiter.limit(RATE_LIMITS["summarize"])
async def summarize_content(request: Request, body: SummarizeRequest):
    """
    Summarize content in the requested format.
    Supports both streaming and non-streaming responses.
    """
    config = MODEL_CONFIGS["summarizer"]
    
    format_instructions = {
        "bullets": """Format your summary as bullet points:
• Each bullet should be a complete, concise point
• Use nested bullets for sub-points if needed
• Start with the most important points""",
        "paragraph": """Format your summary as flowing paragraphs:
• Write in clear, academic prose
• Maintain logical flow between ideas
• Use transitions between paragraphs""",
        "concepts": """Format your summary as key concepts:
**Concept Name**: Brief explanation
• List supporting details
• Include relationships between concepts"""
    }
    
    length_instruction = ""
    if body.max_length:
        length_instruction = f"\nKeep the summary to approximately {body.max_length} words."
    
    prompt = f"""Summarize the following content:

---
{body.content}
---

{format_instructions.get(body.format, format_instructions["bullets"])}
{length_instruction}

Create a clear, educational summary that captures all key information."""

    messages = [
        {"role": "system", "content": config["system_prompt"]},
        {"role": "user", "content": prompt}
    ]
    
    user_id = request.headers.get("X-User-ID")
    
    if body.stream:
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
                    yield f"data: {json.dumps({'content': chunk})}\n\n"
                
                yield f"data: {json.dumps({'done': True})}\n\n"
                
                await log_ai_interaction_async(
                    user_id=user_id,
                    prompt=f"Summarize ({body.format})",
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
                "Connection": "keep-alive"
            }
        )
    
    else:
        try:
            response = await groq_client.chat_completion(
                messages=messages,
                model=config["model"],
                temperature=config["temperature"],
                max_tokens=config["max_tokens"]
            )
            
            summary = response["choices"][0]["message"]["content"]
            word_count = len(summary.split())
            
            await log_ai_interaction_async(
                user_id=user_id,
                prompt=f"Summarize ({body.format})",
                response=summary,
                model=config["model"],
                tokens_used=response.get("usage", {}).get("total_tokens")
            )
            
            return SummarizeResponse(
                summary=summary,
                format=body.format,
                model=config["model"],
                word_count=word_count
            )
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
