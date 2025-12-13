
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { AI_BACKEND_URL } from './useAIStream';

export interface DashboardStats {
    total_learning_time: string;
    completed_courses: number;
    courses_in_progress: number;
    streak_days: number;
}

export interface CourseProgress {
    id: string;
    title: string;
    description: string;
    thumbnail_url?: string;
    progress: number;
    total_lessons: number;
    completed_lessons: number;
    instructor_name?: string;
    price?: string; // For UI compatibility
    category?: string; // For UI compatibility
    rating?: number; // For UI compatibility
    students?: string; // For UI compatibility
}

export function useDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [courses, setCourses] = useState<CourseProgress[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!user) return;

        console.log("Fetching dashboard data from:", AI_BACKEND_URL); // Debug URL

        setIsLoading(true);
        setError(null);

        try {
            // Fetch Stats
            const statsRes = await fetch(`${AI_BACKEND_URL}/api/dashboard/stats`, {
                headers: {
                    'Authorization': `Bearer ${user.id}` // Mock auth header
                }
            });
            if (!statsRes.ok) throw new Error('Failed to fetch stats');
            const statsData = await statsRes.json();
            setStats(statsData);

            // Fetch Courses
            const coursesRes = await fetch(`${AI_BACKEND_URL}/api/dashboard/courses`, {
                headers: {
                    'Authorization': `Bearer ${user.id}`
                }
            });
            if (!coursesRes.ok) throw new Error('Failed to fetch courses');
            const coursesData = await coursesRes.json();
            setCourses(coursesData);

        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        stats,
        courses,
        isLoading,
        error,
        refresh: fetchData
    };
}
