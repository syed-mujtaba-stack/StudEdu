"""
FastAPI main application entry point for AI Backend.
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import logging

from config import settings
from middleware.rate_limit import limiter, rate_limit_exceeded_handler
from routes import tutor, quiz, summarizer, notes

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="StudEdu AI Backend",
    description="AI-powered learning tools including Tutor, Quiz Generator, Summarizer, and Notes Generator",
    version="1.0.0",
    docs_url="/api/ai/docs",
    redoc_url="/api/ai/redoc",
    openapi_url="/api/ai/openapi.json"
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions gracefully."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "internal_error",
            "message": "An unexpected error occurred. Please try again."
        }
    )


# Health check endpoint
@app.get("/api/ai/health")
async def health_check():
    """Check if the AI backend is running."""
    return {
        "status": "healthy",
        "service": "StudEdu AI Backend",
        "version": "1.0.0"
    }


# Models info endpoint
@app.get("/api/ai/models")
async def list_models():
    """List available AI models and their configurations."""
    from config import MODEL_CONFIGS
    
    return {
        "models": {
            name: {
                "model": config["model"],
                "temperature": config["temperature"],
                "max_tokens": config["max_tokens"],
                "use_case": name
            }
            for name, config in MODEL_CONFIGS.items()
        },
        "default_model": settings.default_model
    }


# Include routers
app.include_router(tutor.router)
app.include_router(quiz.router)
app.include_router(summarizer.router)
app.include_router(notes.router)


# Startup event
@app.on_event("startup")
async def startup_event():
    """Run on application startup."""
    logger.info("Starting StudEdu AI Backend...")
    
    # Validate API key
    if not settings.groq_api_key:
        logger.warning("GROQ_API_KEY not set! AI features will not work.")
    else:
        logger.info("Groq API key configured")
    
    # Log Supabase status
    if settings.supabase_url and settings.supabase_key:
        logger.info("Supabase logging enabled")
    else:
        logger.warning("Supabase not configured. AI logs will not be stored.")
    
    logger.info("AI Backend started successfully!")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Run on application shutdown."""
    logger.info("Shutting down StudEdu AI Backend...")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
