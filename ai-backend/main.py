"""
FastAPI main application entry point for AI Backend.
"""

from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
import logging

from config import settings
from middleware.rate_limit import limiter, rate_limit_exceeded_handler
from routes import tutor, quiz, summarizer, notes, dashboard

# --------------------------------------------------
# Logging
# --------------------------------------------------
logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("studedu-backend")

# --------------------------------------------------
# App
# --------------------------------------------------
app = FastAPI(
    title="StudEdu AI Backend",
    description="AI-powered learning tools",
    version="1.0.0",
    docs_url="/api/ai/docs",
    redoc_url="/api/ai/redoc",
    openapi_url="/api/ai/openapi.json"
)

# --------------------------------------------------
# Rate limiter
# --------------------------------------------------
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)

# --------------------------------------------------
# CORS (FIXED)
# --------------------------------------------------
ALLOWED_ORIGINS = [
    "https://studedu-ai.web.app",
    "https://studedu-ai.firebaseapp.com",
    "http://localhost:5173",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# --------------------------------------------------
# OPTIONS preflight handler (CRITICAL FIX)
# --------------------------------------------------
@app.options("/{path:path}")
async def preflight_handler(path: str):
    return Response(status_code=200)

# --------------------------------------------------
# Global exception handler
# --------------------------------------------------
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "internal_error",
            "message": "An unexpected error occurred."
        }
    )

# --------------------------------------------------
# Health
# --------------------------------------------------
@app.get("/api/ai/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "StudEdu AI Backend",
        "version": "1.0.0"
    }

# --------------------------------------------------
# Models
# --------------------------------------------------
@app.get("/api/ai/models")
async def list_models():
    from config import MODEL_CONFIGS
    return {
        "models": MODEL_CONFIGS,
        "default_model": settings.default_model
    }

# --------------------------------------------------
# Routers
# --------------------------------------------------
app.include_router(tutor.router)
app.include_router(quiz.router)
app.include_router(summarizer.router)
app.include_router(notes.router)

# IMPORTANT: dashboard router LAST
app.include_router(
    dashboard.router,
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

# --------------------------------------------------
# Startup
# --------------------------------------------------
@app.on_event("startup")
async def startup_event():
    logger.info("Starting StudEdu AI Backend")

    if not settings.groq_api_key:
        logger.warning("GROQ_API_KEY missing")
    else:
        logger.info("Groq API configured")

    if settings.supabase_url and settings.supabase_key:
        logger.info("Supabase enabled")
    else:
        logger.warning("Supabase not configured")

    logger.info("Backend ready")

# --------------------------------------------------
# Shutdown
# --------------------------------------------------
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down backend")

# --------------------------------------------------
# Local run
# --------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
