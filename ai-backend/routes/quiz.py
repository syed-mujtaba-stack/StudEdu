"""
AI Quiz Generator endpoint.
"""
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
import json
import re

from openrouter_client import groq_client
from services.supabase_logger import log_ai_interaction_async
from middleware.rate_limit import limiter, RATE_LIMITS
from config import MODEL_CONFIGS

router = APIRouter(prefix="/api/ai/quiz", tags=["AI Quiz Generator"])


class QuizQuestion(BaseModel):
    """A single quiz question."""
    question: str
    options: List[str]
    correct_answer: int  # Index of correct option
    explanation: str


class QuizGenerateRequest(BaseModel):
    """Request body for quiz generation."""
    content: str = Field(..., description="Content to generate quiz from")
    count: int = Field(default=5, ge=1, le=20, description="Number of questions")
    difficulty: str = Field(default="medium", description="Difficulty: easy, medium, hard")
    topic: Optional[str] = Field(default=None, description="Specific topic focus")


class QuizGenerateResponse(BaseModel):
    """Response with generated quiz."""
    questions: List[QuizQuestion]
    topic: Optional[str]
    difficulty: str
    model: str


@router.post("/generate", response_model=QuizGenerateResponse)
@limiter.limit(RATE_LIMITS["quiz"])
async def generate_quiz(request: Request, body: QuizGenerateRequest):
    """
    Generate quiz questions from provided content.
    Uses structured output to ensure valid quiz format.
    """
    config = MODEL_CONFIGS["quiz"]
    
    # Build the prompt
    difficulty_guide = {
        "easy": "straightforward questions testing basic recall and understanding",
        "medium": "questions requiring application and analysis of concepts",
        "hard": "challenging questions requiring synthesis and evaluation"
    }
    
    prompt = f"""Generate exactly {body.count} {body.difficulty} difficulty quiz questions based on this content:

---
{body.content}
---

{f"Focus specifically on: {body.topic}" if body.topic else ""}

Difficulty guideline: {difficulty_guide.get(body.difficulty, difficulty_guide["medium"])}

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{{
  "questions": [
    {{
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": 0,
      "explanation": "Brief explanation of why this is correct"
    }}
  ]
}}

Make sure:
- Each question has exactly 4 options
- correct_answer is the index (0-3) of the correct option
- Questions are diverse and test different aspects of the content
- Explanations are educational and helpful"""

    messages = [
        {"role": "system", "content": config["system_prompt"]},
        {"role": "user", "content": prompt}
    ]
    
    try:
        response = await groq_client.chat_completion(
            messages=messages,
            model=config["model"],
            temperature=config["temperature"],
            max_tokens=config["max_tokens"]
        )
        
        content = response["choices"][0]["message"]["content"]
        
        # Parse JSON from response (handle markdown code blocks)
        json_match = re.search(r'```(?:json)?\s*([\s\S]*?)```', content)
        if json_match:
            json_str = json_match.group(1)
        else:
            json_str = content
        
        # Clean and parse JSON
        json_str = json_str.strip()
        quiz_data = json.loads(json_str)
        
        questions = [
            QuizQuestion(**q) for q in quiz_data.get("questions", [])
        ]
        
        # Log the interaction
        user_id = request.headers.get("X-User-ID")
        await log_ai_interaction_async(
            user_id=user_id,
            prompt=f"Generate {body.count} {body.difficulty} quiz questions",
            response=f"Generated {len(questions)} questions",
            model=config["model"],
            tokens_used=response.get("usage", {}).get("total_tokens")
        )
        
        return QuizGenerateResponse(
            questions=questions,
            topic=body.topic,
            difficulty=body.difficulty,
            model=config["model"]
        )
        
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse quiz response: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
