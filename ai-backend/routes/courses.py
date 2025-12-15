
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import Optional, List
import logging
import uuid
from datetime import datetime

from services.course_generator import generate_course_content
from services.db import get_supabase_client

router = APIRouter()
logger = logging.getLogger(__name__)

# ----------------------------------------------------------------
# Pydantic Models for Request/Response
# ----------------------------------------------------------------

class GenerateCourseRequest(BaseModel):
    topic: str
    difficulty: Optional[str] = "intermediate"

class LessonModel(BaseModel):
    title: str
    description: str
    type: str
    duration: str

class ModuleModel(BaseModel):
    title: str
    lessons: List[LessonModel]

class CourseGeneratedResponse(BaseModel):
    title: str
    description: str
    modules: List[ModuleModel]
    
# ----------------------------------------------------------------
# Routes
# ----------------------------------------------------------------

@router.post("/generate", response_model=CourseGeneratedResponse)
async def generate_course(request: GenerateCourseRequest):
    """
    Generate a formatted course curriculum using AI.
    """
    try:
        course_data = await generate_course_content(request.topic, request.difficulty)
        return course_data
    except Exception as e:
        logger.error(f"Course generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save")
async def save_course(
    course_data: CourseGeneratedResponse, 
    authorization: str = Header(None)
):
    """
    Save the generated course to Supabase.
    Requires Authorization header with 'Bearer {user_id}'.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    
    # Extract user_id from "Bearer <user_id>"
    # In production, verify JWT. Here we trust the client for prototype speed.
    user_id = authorization.replace("Bearer ", "")
    
    supabase = get_supabase_client()
    if not supabase:
        raise HTTPException(status_code=503, detail="Database unavailable")

    try:
        # 1. Insert Course
        course_res = supabase.table("courses").insert({
            "title": course_data.title,
            "description": course_data.description,
            "instructor_id": user_id,
            "image_url": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80", # Placeholder
            "category": "General", 
            "difficulty": "Intermediate",
            "price": 0,
            "published": True
        }).execute()
        
        if not course_res.data:
            raise Exception("Failed to save course")
            
        course_id = course_res.data[0]['id']
        
        # 2. Insert Lessons (Flattening modules for now as schema might be simpler)
        # Check schema structure next step to refine this. 
        # For now, we assume a 'lessons' table linked to 'course_id'.
        
        all_lessons = []
        order_index = 0
        
        for module in course_data.modules:
            for lesson in module.lessons:
                # Parse duration
                dur_seconds = 300
                try:
                    if ":" in lesson.duration:
                        parts = lesson.duration.split(":")
                        dur_seconds = int(parts[0]) * 60 + int(parts[1])
                    else:
                        dur_seconds = int(lesson.duration)
                except:
                    pass

                all_lessons.append({
                    "course_id": course_id,
                    "title": lesson.title,
                    "content": lesson.description, 
                    "quiz_id": None, 
                    "order_index": order_index,
                    "duration": dur_seconds,
                    # We are temporarily mapping ai 'type' to nothing as DB lacks it, 
                    # relying on GET to default it.
                })
                order_index += 1
                
        if all_lessons:
            supabase.table("lessons").insert(all_lessons).execute()
            
        return {"id": course_id, "message": "Course saved successfully"}

    except Exception as e:
        logger.error(f"Failed to save course: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{course_id}")
async def get_course(course_id: str):
    """
    Get a full course with modules and lessons.
    """
    supabase = get_supabase_client()
    if not supabase:
        raise HTTPException(status_code=503, detail="Database unavailable")

    try:
        # 1. Get Course
        course_res = supabase.table("courses").select("*").eq("id", course_id).execute()
        
        if not course_res.data:
            raise HTTPException(status_code=404, detail="Course not found")
            
        course = course_res.data[0]
        
        # 2. Get Lessons
        lessons_res = supabase.table("lessons").select("*").eq("course_id", course_id).order("order_index").execute()
        
        lessons = lessons_res.data if lessons_res.data else []
        
        # 3. Format Lessons for Frontend
        formatted_lessons = []
        for l in lessons:
            # Format duration seconds -> mm:ss
            try:
                seconds = l.get('duration', 300) or 300
                m = seconds // 60
                s = seconds % 60
                duration_str = f"{m}:{s:02d}"
            except:
                duration_str = "5:00"
                
            formatted_lessons.append({
                **l,
                "duration": duration_str,
                "type": 'text' # Default type to text for Article Mode
            })
        
        modules = [
            {
                "title": "Course Content",
                "items": formatted_lessons
            }
        ]
        
        return {
            **course,
            "lessons": modules
        }

    except Exception as e:
        logger.error(f"Failed to fetch course: {e}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
