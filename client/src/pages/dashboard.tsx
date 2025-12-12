import { Layout } from "@/components/layout/Layout";
import { CourseCard } from "@/components/ui/course-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Clock, BookOpen } from "lucide-react";
import { MOCK_COURSES } from "@/lib/mock-data";

export default function Dashboard() {
  const myCourses = MOCK_COURSES.slice(0, 2).map(c => ({
    ...c,
    progress: Math.floor(Math.random() * 80) + 10 // Mock progress
  }));

  const recommendedCourses = MOCK_COURSES.slice(2, 5).map(c => ({
    ...c,
    price: "Free"
  }));

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h1>
            <p className="text-muted-foreground mt-1">You've learned for 32 hours this month. Keep it up!</p>
          </div>
          <Button>Explore Courses</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
               <Flame className="h-6 w-6" />
             </div>
             <div>
               <div className="text-2xl font-bold">12</div>
               <div className="text-sm text-muted-foreground">Day Streak</div>
             </div>
          </div>
          <div className="bg-accent/5 border border-accent/10 rounded-xl p-6 flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
               <Clock className="h-6 w-6" />
             </div>
             <div>
               <div className="text-2xl font-bold">48h</div>
               <div className="text-sm text-muted-foreground">Total Learning</div>
             </div>
          </div>
          <div className="bg-secondary/50 border border-secondary rounded-xl p-6 flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-muted-foreground/20 flex items-center justify-center text-muted-foreground">
               <BookOpen className="h-6 w-6" />
             </div>
             <div>
               <div className="text-2xl font-bold">4</div>
               <div className="text-sm text-muted-foreground">Courses in Progress</div>
             </div>
          </div>
        </div>

        <Tabs defaultValue="in-progress" className="space-y-8">
          <TabsList>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="in-progress" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {myCourses.map(course => (
                 <CourseCard key={course.id} {...course} />
               ))}
             </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="h-40 flex items-center justify-center text-muted-foreground border border-dashed rounded-xl">
              No saved courses yet.
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="h-40 flex items-center justify-center text-muted-foreground border border-dashed rounded-xl">
              Complete a course to see it here!
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {recommendedCourses.map(course => (
               <CourseCard key={course.id} {...course} />
             ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
