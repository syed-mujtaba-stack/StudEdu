from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import List, Optional
from services.db import get_supabase_client

router = APIRouter()

class DashboardStats(BaseModel):
    total_learning_time: str
    completed_courses: int
    courses_in_progress: int
    streak_days: int

class CourseProgress(BaseModel):
    id: str
    title: str
    description: str
    thumbnail_url: Optional[str]
    progress: int
    total_lessons: int
    completed_lessons: int
    instructor_name: Optional[str]

@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(authorization: str = Header(None)):
    """Get dashboard stats for the authenticated user."""
    client = get_supabase_client()
    if not client:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    # In a real app, verifying the JWT from 'authorization' header would give us the user_id.
    # For now, we'll try to get the user from the session if the token is passed to supabase client,
    # or just return mock data if auth is complicated to decode manually here without middleware.
    
    # Ideally, we should have a dependency to get the current user.
    # For speed, let's return a mix of real (if possible) and placeholder data.
    
    return {
        "total_learning_time": "12h 30m", # To be implemented with real tracking
        "completed_courses": 0,
        "courses_in_progress": 0,
        "streak_days": 3
    }

@router.get("/courses", response_model=List[CourseProgress])
async def get_dashboard_courses():
    """Get courses for the dashboard."""
    client = get_supabase_client()
    if not client:
         # Return mock data if DB not connected
        return []

    try:
        # Fetch courses from DB
        response = client.table("courses").select("*").execute()
        courses = response.data
        
        # Transform to match response model (adding mock progress for now)
        return [
            {
                "id": c["id"],
                "title": c["title"],
                "description": c["description"] or "",
                "thumbnail_url": c["thumbnail_url"],
                "progress": 0, # Placeholder
                "total_lessons": 10, # Placeholder
                "completed_lessons": 0, # Placeholder
                "instructor_name": "StudEdu Instructor" 
            }
            for c in courses
        ]
    except Exception as e:
        print(f"Error fetching courses: {e}")
        return []
