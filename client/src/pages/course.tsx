import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Play, Lock, FileText, Download, Share2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const COURSE_CONTENT = [
  {
    title: "Section 1: Introduction",
    modules: [
      { id: 1, title: "Welcome to the Course", duration: "2:15", type: "video", completed: true, locked: false },
      { id: 2, title: "Setting up your environment", duration: "10:30", type: "video", completed: true, locked: false },
      { id: 3, title: "Course Resources", duration: "PDF", type: "file", completed: false, locked: false }
    ]
  },
  {
    title: "Section 2: The Fundamentals",
    modules: [
      { id: 4, title: "Understanding the Basics", duration: "15:45", type: "video", completed: false, current: true, locked: false },
      { id: 5, title: "Core Concepts Explained", duration: "20:10", type: "video", completed: false, locked: false },
      { id: 6, title: "First Assignment", duration: "Quiz", type: "quiz", completed: false, locked: false }
    ]
  },
  {
    title: "Section 3: Advanced Topics",
    modules: [
      { id: 7, title: "Deep Dive into State", duration: "18:20", type: "video", completed: false, locked: true },
      { id: 8, title: "Performance Optimization", duration: "22:15", type: "video", completed: false, locked: true }
    ]
  }
];

export default function Course() {
  const [activeModule, setActiveModule] = useState(4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-background">
           <div className="aspect-video bg-black w-full relative group cursor-pointer">
              {/* Fake Video Player */}
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-60"
                alt="Video thumbnail"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground shadow-2xl transform transition-transform group-hover:scale-110">
                  <Play className="h-6 w-6 ml-1 fill-current" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                 <div className="h-1 bg-white/30 rounded-full mb-4 overflow-hidden">
                    <div className="h-full w-[35%] bg-primary"></div>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">04:12 / 15:45</div>
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
                    <h1 className="text-2xl font-bold mb-2">Understanding the Basics</h1>
                    <p className="text-muted-foreground">Section 2: The Fundamentals</p>
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
                        In this lesson, we will cover the fundamental building blocks of the framework. You will learn how to structure your application, handle data flow, and manage state effectively.
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
                              Pay special attention to the section on "Unidirectional Data Flow" at 12:30. This is a common stumbling block for beginners.
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
                 {COURSE_CONTENT.map((section, index) => (
                    <div key={index}>
                       <div className="bg-muted/40 px-4 py-3 text-sm font-semibold border-b">
                          {section.title}
                       </div>
                       <div>
                          {section.modules.map((module) => (
                             <button
                                key={module.id}
                                onClick={() => !module.locked && setActiveModule(module.id)}
                                className={cn(
                                   "w-full text-left px-4 py-3 flex items-start gap-3 border-b hover:bg-muted/30 transition-colors",
                                   activeModule === module.id && "bg-primary/5 border-l-4 border-l-primary"
                                )}
                                disabled={module.locked}
                             >
                                <div className="mt-0.5">
                                   {module.completed ? (
                                      <CheckCircle className="h-4 w-4 text-primary" />
                                   ) : module.locked ? (
                                      <Lock className="h-4 w-4 text-muted-foreground" />
                                   ) : (
                                      <div className={cn(
                                         "h-4 w-4 rounded-full border-2",
                                         activeModule === module.id ? "border-primary" : "border-muted-foreground"
                                      )} />
                                   )}
                                </div>
                                <div className="flex-1">
                                   <div className={cn(
                                      "text-sm font-medium mb-1",
                                      activeModule === module.id ? "text-primary" : "text-foreground",
                                      module.locked && "text-muted-foreground"
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
