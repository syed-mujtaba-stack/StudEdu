
import json
import logging
from openrouter_client import generate_response

logger = logging.getLogger(__name__)

async def generate_course_content(topic: str, difficulty: str = "intermediate") -> dict:
    """
    Generate a full course structure using AI.
    """
    prompt = f"Create a comprehensive {difficulty} level course about: {topic}"
    
    try:
        response_text = await generate_response(
            tool="course_generator",
            user_message=prompt,
            stream=False
        )
        
        # Parse JSON from response
        # Llama sometimes adds markdown blocks despite instructions, so we clean it
        clean_text = response_text.replace("```json", "").replace("```", "").strip()
        course_data = json.loads(clean_text)
        
        return course_data
        
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse AI response as JSON: {e}")
        logger.debug(f"Raw response: {response_text}")
        raise ValueError("AI failed to generate valid course structure")
    except Exception as e:
        logger.error(f"Error generating course: {e}")
        raise
