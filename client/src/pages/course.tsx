import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Play, Lock, FileText, Download, Share2, MessageSquare, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useRoute } from "wouter";
import { MOCK_COURSES } from "@/lib/mock-data";

export default function Course() {
  const [match, params] = useRoute("/course/:id");
  const courseId = params?.id;
  const course = MOCK_COURSES.find(c => c.id === courseId) || MOCK_COURSES[0];
  
  const [activeModule, setActiveModule] = useState(0);

  // Flatten lessons for simpler navigation in this prototype
  const allLessons = course.lessons.flatMap(section => 
    section.items.map(item => ({ ...item, sectionTitle: section.title }))
  );

  const activeLesson = allLessons.find(l => l.id === activeModule) || allLessons[0];

  useEffect(() => {
    if (activeLesson) {
      setActiveModule(activeLesson.id);
    }
  }, [course]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-background">
           <div className="aspect-video bg-black w-full relative group cursor-pointer">
              {/* Fake Video Player */}
              <img 
                src={course.image} 
                className="w-full h-full object-cover opacity-60"
                alt="Video thumbnail"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground shadow-2xl transform transition-transform group-hover:scale-110">
                  <Play className="h-6 w-6 ml-1 fill-current" />
                </div>
              </div>
              
              <div className="absolute top-4 left-4 z-10">
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm" className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-md">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                  </Button>
                </Link>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                 <div className="h-1 bg-white/30 rounded-full mb-4 overflow-hidden">
                    <div className="h-full w-[35%] bg-primary"></div>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">04:12 / {activeLesson.duration}</div>
                    <div className="flex gap-4 text-sm">
                       <span>CC</span>
                       <span>Settings</span>
                       <span>Fullscreen</span>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="p-6 md:p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                 <div>
                    <h1 className="text-2xl font-bold mb-2">{activeLesson.title}</h1>
                    <p className="text-muted-foreground">{activeLesson.sectionTitle}</p>
                 </div>
                 <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                       <Share2 className="h-4 w-4 mr-2" /> Share
                    </Button>
                    <Button variant="outline" size="sm">
                       <Download className="h-4 w-4 mr-2" /> Resources
                    </Button>
                 </div>
              </div>
              
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                   <div className="prose prose-slate dark:prose-invert max-w-none">
                      <h3>About this lesson</h3>
                      <p>
                        {course.description}
                      </p>
                      <h3>Key Takeaways</h3>
                      <ul>
                        <li>Understanding component architecture</li>
                        <li>Data binding and props</li>
                        <li>Event handling basics</li>
                      </ul>
                      <p>
                        Make sure to download the starter files from the Resources tab before following along.
                      </p>
                   </div>
                   
                   <div className="border rounded-xl p-6 bg-muted/20">
                      <div className="flex items-start gap-4">
                         <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                           <MessageSquare className="h-5 w-5" />
                         </div>
                         <div>
                            <h4 className="font-semibold mb-1">Instructor's Note</h4>
                            <p className="text-sm text-muted-foreground">
                              This concept is crucial for the final project. Take your time to practice the examples.
                            </p>
                         </div>
                      </div>
                   </div>
                </TabsContent>
                
                <TabsContent value="notes">
                   <div className="h-64 flex items-center justify-center border border-dashed rounded-xl text-muted-foreground">
                      Start typing to take notes...
                   </div>
                </TabsContent>
              </Tabs>
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
                 {course.lessons.map((section, index) => (
                    <div key={index}>
                       <div className="bg-muted/40 px-4 py-3 text-sm font-semibold border-b">
                          {section.title}
                       </div>
                       <div>
                          {section.items.map((module) => (
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
    </div>
  );
}
