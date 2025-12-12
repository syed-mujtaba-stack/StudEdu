"""
AI Notes Generator endpoint.
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

router = APIRouter(prefix="/api/ai/notes", tags=["AI Notes Generator"])


class NotesGenerateRequest(BaseModel):
    """Request body for notes generation."""
    content: str = Field(..., description="Lesson content to generate notes from")
    detail_level: Literal["brief", "standard", "comprehensive"] = Field(
        default="standard",
        description="Level of detail in notes"
    )
    include_examples: bool = Field(default=True, description="Include examples")
    include_summary: bool = Field(default=True, description="Include summary section")
    lesson_title: Optional[str] = Field(default=None, description="Lesson title")
    stream: bool = Field(default=False, description="Enable streaming response")


class NotesGenerateResponse(BaseModel):
    """Response with generated notes."""
    notes: str
    detail_level: str
    model: str
    lesson_title: Optional[str]


@router.post("/generate")
@limiter.limit(RATE_LIMITS["notes"])
async def generate_notes(request: Request, body: NotesGenerateRequest):
    """
    Generate study notes from lesson content.
    Returns well-structured Markdown notes.
    """
    config = MODEL_CONFIGS["notes"]
    
    detail_instructions = {
        "brief": "Create concise notes with only the most essential points. Focus on key terms and main concepts.",
        "standard": "Create balanced notes covering all important concepts with moderate detail. Include definitions and key relationships.",
        "comprehensive": "Create detailed notes covering all concepts thoroughly. Include in-depth explanations, nuances, and connections between ideas."
    }
    
    title_section = f"# {body.lesson_title}\n\n" if body.lesson_title else ""
    
    prompt = f"""Generate study notes from this lesson content:

---
{body.content}
---

{detail_instructions.get(body.detail_level, detail_instructions["standard"])}

Format the notes in Markdown with:
{title_section}- Clear headings and subheadings (## and ###)
- **Bold** for key terms and definitions
- Bullet points for lists
- Numbered lists for processes/steps
{"- Practical examples to illustrate concepts" if body.include_examples else ""}
{"- A summary section at the end with key takeaways" if body.include_summary else ""}

Make the notes:
- Easy to scan and review
- Suitable for exam preparation
- Well-organized and logical"""

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
                    prompt=f"Generate {body.detail_level} notes",
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
            
            notes = response["choices"][0]["message"]["content"]
            
            await log_ai_interaction_async(
                user_id=user_id,
                prompt=f"Generate {body.detail_level} notes for {body.lesson_title}",
                response=notes,
                model=config["model"],
                tokens_used=response.get("usage", {}).get("total_tokens")
            )
            
            return NotesGenerateResponse(
                notes=notes,
                detail_level=body.detail_level,
                model=config["model"],
                lesson_title=body.lesson_title
            )
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
