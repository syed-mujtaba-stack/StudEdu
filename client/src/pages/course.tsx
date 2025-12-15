import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, FileText, ArrowLeft, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useRoute } from "wouter";
import { MOCK_COURSES } from "@/lib/mock-data";

import { AI_BACKEND_URL } from "@/hooks/useAIStream";
import { Loader2 } from "lucide-react";

interface LessonItem {
   id: number | string;
   title: string;
   duration: string;
   type: 'video' | 'text' | 'quiz';
   sectionTitle?: string;
   content?: string;
}

interface CourseSection {
   title: string;
   items: LessonItem[];
}

interface CourseData {
   id: string;
   title: string;
   description: string;
   image: string;
   lessons: CourseSection[];
}

export default function Course() {
   const [match, params] = useRoute("/course/:id");
   const courseId = params?.id;

   const [course, setCourse] = useState<CourseData | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!courseId) return;

      // Check if it's a mock ID (start with 'c') or real UUID
      if (courseId.startsWith('c')) {
         const mock = MOCK_COURSES.find(c => c.id === courseId);
         if (mock) {
            setCourse(mock);
            setLoading(false);
            return;
         }
      }

      // Fetch from API
      fetch(`${AI_BACKEND_URL}/api/courses/${courseId}`)
         .then(res => {
            if (!res.ok) throw new Error("Course not found");
            return res.json();
         })
         .then(data => {
            // Transform backend data to match UI expected format if needed
            // Our backend returns { ..., lessons: [{ title, items: [...] }] } which matches
            // Ensure image property exists
            setCourse({
               ...data,
               image: data.image_url || data.thumbnail_url || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
               lessons: data.lessons || []
            });
         })
         .catch(err => {
            console.error(err);
            // Fallback to first mock course if error
            setCourse(MOCK_COURSES[0]);
         })
         .finally(() => setLoading(false));

   }, [courseId]);

   const [activeModule, setActiveModule] = useState<number | string>(0);

   // Flatten lessons for simpler navigation in this prototype
   const allLessons = course?.lessons?.flatMap((section: CourseSection) =>
      section.items.map((item: LessonItem) => ({ ...item, sectionTitle: section.title }))
   ) || [];

   const activeLesson = allLessons.find((l: any) => l.id === activeModule) || allLessons[0] || { title: "No lessons", duration: "0:00" };

   useEffect(() => {
      if (activeLesson && activeLesson.id) {
         setActiveModule(activeLesson.id);
      }
   }, [course]);

   if (loading) {
      return (
         <div className="h-screen flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
         </div>
      );
   }

   if (!course) return <div>Course not found</div>;

   return (
      <Layout showFooter={false}>
         <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-background p-6 md:p-12 scroll-smooth">
               <div className="max-w-3xl mx-auto space-y-8">
                  {/* Header */}
                  <div>
                     <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground mb-4">
                           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                        </Button>
                     </Link>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-primary font-medium">
                           <FileText className="h-4 w-4" />
                           <span>{activeLesson.type === 'text' ? 'Article' : 'Lesson'}</span>
                           <span className="text-muted-foreground">•</span>
                           <span className="text-muted-foreground">{activeLesson.duration} read</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                           {activeLesson.title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                           {activeLesson.sectionTitle}
                        </p>
                     </div>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-slate dark:prose-invert max-w-none border-t pt-8">
                     {activeLesson.content ? (
                        <div className="whitespace-pre-wrap leading-relaxed">
                           {activeLesson.content}
                        </div>
                     ) : (
                        <div className="whitespace-pre-wrap leading-relaxed">
                           {course.description}
                        </div>
                     )}
                  </div>

                  {/* Navigation / Footer */}
                  <div className="flex items-center justify-between border-t pt-8 mt-12">
                     <Button variant="outline">Previous Lesson</Button>
                     <Button>Mark as Complete</Button>
                  </div>
               </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-96 border-l bg-background flex flex-col h-full">
               <div className="p-4 border-b">
                  <h3 className="font-bold text-lg">Course Content</h3>
                  <div className="text-sm text-muted-foreground mt-1">35% Completed</div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mt-3">
                     <div className="h-full bg-primary w-[35%]"></div>
                  </div>
               </div>

               <ScrollArea className="flex-1">
                  <div className="pb-8">
                     {course.lessons.map((section: CourseSection, index: number) => (
                        <div key={index}>
                           <div className="bg-muted/40 px-4 py-3 text-sm font-semibold border-b">
                              {section.title}
                           </div>
                           <div>
                              {section.items.map((module: LessonItem) => (
                                 <button
                                    key={module.id}
                                    onClick={() => setActiveModule(module.id)}
                                    className={cn(
                                       "w-full text-left px-4 py-3 flex items-start gap-3 border-b hover:bg-muted/30 transition-colors",
                                       activeModule === module.id && "bg-primary/5 border-l-4 border-l-primary"
                                    )}
                                 >
                                    <div className="mt-0.5">
                                       <div className={cn(
                                          "h-4 w-4 rounded-full border-2",
                                          activeModule === module.id ? "border-primary" : "border-muted-foreground"
                                       )} />
                                    </div>
                                    <div className="flex-1">
                                       <div className={cn(
                                          "text-sm font-medium mb-1",
                                          activeModule === module.id ? "text-primary" : "text-foreground"
                                       )}>
                                          {module.title}
                                       </div>
                                       <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          {module.type === 'video' ? <Play className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                                          <span>{module.duration}</span>
                                       </div>
                                    </div>
                                 </button>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </ScrollArea>
            </div>
         </div>
      </Layout>
   );
}
