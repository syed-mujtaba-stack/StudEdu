import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "@/components/ui/course-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Clock, BookOpen } from "lucide-react";

const MY_COURSES = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2025",
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    instructor: "Dr. Angela Yu",
    rating: 4.8,
    students: 12500,
    duration: "42h 15m",
    progress: 35
  },
  {
    id: "4",
    title: "UX/UI Design Principles for Beginners",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
    instructor: "Sarah Doody",
    rating: 4.8,
    students: 3200,
    duration: "18h 20m",
    progress: 12
  }
];

const RECOMMENDED_COURSES = [
  {
    id: "2",
    title: "Data Science & Machine Learning Masterclass",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    instructor: "Andrew Ng",
    rating: 4.9,
    students: 8400,
    duration: "36h 30m",
    price: "$94.99"
  },
  {
    id: "3",
    title: "Digital Marketing Strategy",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    instructor: "Seth Godin",
    rating: 4.7,
    students: 5600,
    duration: "12h 45m",
    price: "$69.99"
  },
  {
    id: "5",
    title: "Financial Analysis Fundamentals",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600",
    instructor: "Chris Haroun",
    rating: 4.6,
    students: 11200,
    duration: "22h 10m",
    price: "$84.99"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container px-4 md:px-6 py-8">
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
               {MY_COURSES.map(course => (
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
             {RECOMMENDED_COURSES.map(course => (
               <CourseCard key={course.id} {...course} />
             ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
