"""
Supabase logger service for AI interactions.
"""
import asyncio
from datetime import datetime
from typing import Optional
from config import settings

from services.db import get_supabase_client


async def log_ai_interaction(
    user_id: Optional[str],
    prompt: str,
    response: str,
    model: str,
    tokens_used: Optional[int] = None
) -> bool:
    """
    Log an AI interaction to Supabase.
    
    Args:
        user_id: Optional user ID (can be None for anonymous)
        prompt: The user's prompt/message
        response: The AI's response
        model: Model identifier used
        tokens_used: Optional token count
        
    Returns:
        True if logged successfully, False otherwise
    """
    client = get_supabase_client()
    
    if client is None:
        # Supabase not configured, skip logging
        return False
    
    try:
        # Run in executor to avoid blocking
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(
            None,
            lambda: client.table("ai_logs").insert({
                "user_id": user_id,
                "prompt": prompt[:5000],  # Limit prompt length
                "response": response[:10000],  # Limit response length
                "model": model,
                "tokens_used": tokens_used,
                "created_at": datetime.utcnow().isoformat()
            }).execute()
        )
        return True
    except Exception as e:
        print(f"Failed to log AI interaction: {e}")
        return False


async def log_ai_interaction_async(
    user_id: Optional[str],
    prompt: str,
    response: str,
    model: str,
    tokens_used: Optional[int] = None
):
    """
    Fire-and-forget async logging.
    This won't block the response to the user.
    """
    asyncio.create_task(
        log_ai_interaction(user_id, prompt, response, model, tokens_used)
    )
