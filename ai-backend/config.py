import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from typing import List

load_dotenv()


class Settings(BaseSettings):
    """Application settings."""
    
    # Groq API Configuration
    groq_api_key: str = ""
    groq_base_url: str = "https://api.groq.com/openai/v1"
    
    # Default model
    default_model: str = "llama-3.3-70b-versatile"
    
    # Supabase Configuration
    supabase_url: str = ""
    supabase_key: str = ""
    
    # Rate Limiting
    rate_limit_per_minute: int = 20
    
    # Debug mode
    debug: bool = True
    
    # CORS Origins
    cors_origins: List[str] = [
        "http://localhost:5000",
        "http://localhost:5001",
        "http://localhost:3000",
        "http://127.0.0.1:5000",
        "http://127.0.0.1:5001",
    ]
    
    class Config:
        env_file = ".env"
        extra = "ignore"


# Global settings instance
settings = Settings()


# Model Configurations for different AI tools
# Using Groq's available models
MODEL_CONFIGS = {
    "tutor": {
        "model": "llama-3.3-70b-versatile",
        "temperature": 0.7,
        "max_tokens": 2048,
        "system_prompt": """You are StudEdu AI Tutor, an expert educational assistant. 
Your role is to:
- Explain concepts clearly and thoroughly
- Use examples and analogies to make complex topics understandable
- Encourage students and provide positive reinforcement
- Break down problems into manageable steps
- Ask clarifying questions when needed
- Adapt your explanations to the student's level

Always be patient, supportive, and educational in your responses."""
    },
    "quiz": {
        "model": "llama-3.3-70b-versatile",
        "temperature": 0.5,
        "max_tokens": 4096,
        "system_prompt": """You are a quiz generator for StudEdu. Generate educational multiple-choice questions.

IMPORTANT: You must respond with ONLY valid JSON, no markdown formatting, no code blocks.

Response format:
{
  "questions": [
    {
      "question": "question text",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "correct_answer": 0,
      "explanation": "explanation why the answer is correct"
    }
  ]
}

Rules:
- Generate exactly the requested number of questions
- Each question must have exactly 4 options
- correct_answer is the 0-based index (0=A, 1=B, 2=C, 3=D)
- Vary difficulty based on request
- Make explanations educational"""
    },
    "summarizer": {
        "model": "llama-3.1-8b-instant",
        "temperature": 0.3,
        "max_tokens": 2048,
        "system_prompt": """You are a content summarizer for StudEdu. 
Create clear, concise summaries that capture key points.

Available formats:
- bullets: Bullet point list of key points
- paragraph: Flowing paragraph summary  
- concepts: Key concepts with brief definitions

Be concise but comprehensive. Focus on the most important information."""
    },
    "notes": {
        "model": "llama-3.3-70b-versatile",
        "temperature": 0.4,
        "max_tokens": 4096,
        "system_prompt": """You are a study notes generator for StudEdu.
Create well-structured study notes in Markdown format.

Include:
- Clear headings and subheadings
- Key concepts highlighted
- Important definitions
- Examples when helpful
- Summary section if requested

Make notes scannable and easy to review."""
    }
}


def get_model_config(tool: str) -> dict:
    """Get configuration for a specific AI tool."""
    return MODEL_CONFIGS.get(tool, MODEL_CONFIGS["tutor"])
