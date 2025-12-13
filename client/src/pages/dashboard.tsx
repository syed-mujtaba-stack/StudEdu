import { Layout } from "@/components/layout/Layout";
import { CourseCard } from "@/components/ui/course-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Clock, BookOpen, Loader2 } from "lucide-react";
import { AIChat } from "@/components/ai/AIChat";
import { useDashboard } from "@/hooks/useDashboard";
import { useAuth } from "@/lib/auth-context";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, courses, isLoading, error } = useDashboard();

  // Filter courses for tabs (logic can be moved to backend later)
  const myCourses = courses.filter(c => c.progress > 0 && c.progress < 100);
  const completedCourses = courses.filter(c => c.progress === 100);
  // Just show all other courses as recommended for now since we don't have a recommendation engine yet
  const recommendedCourses = courses.filter(c => c.progress === 0).slice(0, 3);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name.split(' ')[0]}!</h1>
            <p className="text-muted-foreground mt-1">
              {stats ? `You've learned for ${stats.total_learning_time} this month.` : "Start your learning journey today!"}
            </p>
          </div>
          <Link href="/course/create">
            <Button>Explore Courses</Button>
          </Link>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.streak_days}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
            <div className="bg-accent/5 border border-accent/10 rounded-xl p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.total_learning_time}</div>
                <div className="text-sm text-muted-foreground">Total Learning</div>
              </div>
            </div>
            <div className="bg-secondary/50 border border-secondary rounded-xl p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted-foreground/20 flex items-center justify-center text-muted-foreground">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.courses_in_progress}</div>
                <div className="text-sm text-muted-foreground">Courses in Progress</div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 text-sm text-red-500 bg-red-50 rounded-lg">
            Unable to load dashboard data: {error}
          </div>
        )}

        <Tabs defaultValue="in-progress" className="space-y-8">
          <TabsList>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {myCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    category={course.category || "Course"}
                    image={course.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"}
                    instructor={course.instructor_name || "StudEdu Instructor"}
                    rating={course.rating || 4.5}
                    students={parseInt(course.students || "1000") || 1200}
                    duration={`${course.total_lessons} Lessons`}
                    price="Free"
                    progress={course.progress}
                  />
                ))}
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-muted-foreground border border-dashed rounded-xl gap-4">
                <p>No courses in progress.</p>
                <Link href="/course/create"><Button variant="outline">Browse Catalog</Button></Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            <div className="h-40 flex items-center justify-center text-muted-foreground border border-dashed rounded-xl">
              No saved courses yet.
            </div>
          </TabsContent>

          <TabsContent value="completed">
            {completedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    category={course.category || "Course"}
                    image={course.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"}
                    instructor={course.instructor_name || "StudEdu Instructor"}
                    rating={course.rating || 4.5}
                    students={parseInt(course.students || "1000") || 1200}
                    duration={`${course.total_lessons} Lessons`}
                    price="Completed"
                    progress={course.progress}
                  />
                ))}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center text-muted-foreground border border-dashed rounded-xl">
                Complete a course to see it here!
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map(course => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                category={course.category || "Recommended"}
                image={course.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"}
                instructor={course.instructor_name || "StudEdu Instructor"}
                rating={course.rating || 4.8}
                students={parseInt(course.students || "1000") || 500}
                duration={`${course.total_lessons} Lessons`}
                price="Free"
              // No progress for recommended
              />
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <AIChat />
    </Layout>
  );
}
