import httpx
import json
import logging
from typing import AsyncGenerator, Optional
from config import settings, get_model_config

logger = logging.getLogger(__name__)

class GroqClient:
    """Async client for Groq API (OpenAI-compatible)."""
    
    def __init__(self):
        self.api_key = settings.groq_api_key
        self.base_url = settings.groq_base_url
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
    
    async def chat_completion(
        self,
        messages: list[dict],
        model: str = "llama-3.3-70b-versatile",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        stream: bool = False
    ) -> dict:
        """Send a chat completion request to Groq API."""
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": stream,
        }
        
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers=self.headers,
                json=payload
            )
            
            if response.status_code != 200:
                error_text = response.text
                logger.error(f"Groq API error: {response.status_code} - {error_text}")
                raise Exception(f"Groq API error: {response.status_code}")
            
            return response.json()
    
    async def chat_completion_stream(
        self,
        messages: list[dict],
        model: str = "llama-3.3-70b-versatile",
        temperature: float = 0.7,
        max_tokens: int = 2048,
    ) -> AsyncGenerator[str, None]:
        """Stream chat completion from Groq API."""
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": True,
        }
        
        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream(
                "POST",
                f"{self.base_url}/chat/completions",
                headers=self.headers,
                json=payload
            ) as response:
                if response.status_code != 200:
                    error_text = await response.aread()
                    logger.error(f"Groq API stream error: {response.status_code} - {error_text}")
                    raise Exception(f"Groq API error: {response.status_code}")
                
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        data = line[6:]
                        if data == "[DONE]":
                            break
                        try:
                            chunk = json.loads(data)
                            if chunk.get("choices") and chunk["choices"][0].get("delta", {}).get("content"):
                                yield chunk["choices"][0]["delta"]["content"]
                        except json.JSONDecodeError:
                            continue


# Global client instance
groq_client = GroqClient()


async def generate_response(
    tool: str,
    user_message: str,
    context: Optional[str] = None,
    history: Optional[list[dict]] = None,
    stream: bool = False
) -> AsyncGenerator[str, None] | str:
    """Generate AI response using the appropriate model configuration."""
    
    config = get_model_config(tool)
    
    messages = [
        {"role": "system", "content": config["system_prompt"]}
    ]
    
    # Add context if provided
    if context:
        messages.append({
            "role": "system",
            "content": f"Context for this conversation:\n{context}"
        })
    
    # Add conversation history
    if history:
        for msg in history:
            messages.append({
                "role": msg.get("role", "user"),
                "content": msg.get("content", "")
            })
    
    # Add current user message
    messages.append({"role": "user", "content": user_message})
    
    if stream:
        return groq_client.chat_completion_stream(
            messages=messages,
            model=config["model"],
            temperature=config["temperature"],
            max_tokens=config["max_tokens"]
        )
    else:
        response = await groq_client.chat_completion(
            messages=messages,
            model=config["model"],
            temperature=config["temperature"],
            max_tokens=config["max_tokens"],
            stream=False
        )
        
        return response["choices"][0]["message"]["content"]
