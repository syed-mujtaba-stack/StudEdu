"""
Rate limiting middleware using slowapi.
"""
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request, Response
from fastapi.responses import JSONResponse
from config import settings


def get_user_id_or_ip(request: Request) -> str:
    """
    Get user identifier for rate limiting.
    Uses user_id from headers if available, otherwise falls back to IP.
    """
    # Check for user ID in headers (set by frontend auth)
    user_id = request.headers.get("X-User-ID")
    if user_id:
        return f"user:{user_id}"
    
    # Fall back to IP address
    return get_remote_address(request)


# Create limiter instance
limiter = Limiter(key_func=get_user_id_or_ip)


def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded) -> Response:
    """Custom handler for rate limit exceeded errors."""
    return JSONResponse(
        status_code=429,
        content={
            "error": "rate_limit_exceeded",
            "message": f"Rate limit exceeded. Try again in {exc.detail}.",
            "retry_after": str(exc.detail)
        }
    )


# Rate limit strings for different endpoints
RATE_LIMITS = {
    "default": f"{settings.rate_limit_per_minute}/minute",
    "tutor": "15/minute",  # Lower for chat (more resource intensive)
    "quiz": "10/minute",   # Lower for quiz generation
    "summarize": "20/minute",
    "notes": "15/minute"
}
