import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, GripVertical, Video, FileText, LayoutList, Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { Redirect } from "wouter";

export default function CreateCourse() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction", type: "video", duration: "5:00" }
  ]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  // In a real app, we would check user.role === 'admin' or 'teacher' here
  // For prototype, we'll allow access but show a banner if not authorized conceptualy

  const handleAddLesson = () => {
    const newId = lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1;
    setLessons([...lessons, { id: newId, title: "", type: "video", duration: "" }]);
  };

  const handleRemoveLesson = (id: number) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  const handleLessonChange = (id: number, field: string, value: string) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Course Created Successfully",
      description: "Your course has been submitted for review and will be published shortly.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container px-4 md:px-6 py-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
             <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
             <p className="text-muted-foreground">Share your knowledge with the world.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish Course
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
               <CardHeader>
                 <CardTitle>Course Details</CardTitle>
                 <CardDescription>Basic information about your course.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="title">Course Title</Label>
                   <Input id="title" placeholder="e.g. Advanced React Patterns" />
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="description">Description</Label>
                   <Textarea id="description" placeholder="What will students learn in this course?" className="min-h-[150px]" />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="category">Category</Label>
                     <Select>
                       <SelectTrigger>
                         <SelectValue placeholder="Select category" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="development">Development</SelectItem>
                         <SelectItem value="design">Design</SelectItem>
                         <SelectItem value="business">Business</SelectItem>
                         <SelectItem value="marketing">Marketing</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="difficulty">Difficulty</Label>
                     <Select>
                       <SelectTrigger>
                         <SelectValue placeholder="Select difficulty" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="beginner">Beginner</SelectItem>
                         <SelectItem value="intermediate">Intermediate</SelectItem>
                         <SelectItem value="advanced">Advanced</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                 </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                 <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Curriculum</CardTitle>
                      <CardDescription>Organize your lessons and content.</CardDescription>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleAddLesson}>
                      <Plus className="h-4 w-4 mr-2" /> Add Lesson
                    </Button>
                 </div>
               </CardHeader>
               <CardContent className="space-y-4">
                 {lessons.map((lesson, index) => (
                   <div key={lesson.id} className="flex items-start gap-4 p-4 border rounded-lg bg-muted/20 group hover:border-primary/50 transition-colors">
                      <div className="mt-3 text-muted-foreground cursor-move">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-4">
                         <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                               <Label className="text-xs text-muted-foreground">Lesson Title</Label>
                               <Input 
                                 value={lesson.title} 
                                 onChange={(e) => handleLessonChange(lesson.id, "title", e.target.value)}
                                 placeholder={`Lesson ${index + 1}`} 
                               />
                            </div>
                            <div className="w-32 space-y-2">
                               <Label className="text-xs text-muted-foreground">Duration</Label>
                               <Input 
                                 value={lesson.duration} 
                                 onChange={(e) => handleLessonChange(lesson.id, "duration", e.target.value)}
                                 placeholder="10:00" 
                               />
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                               <Button 
                                 type="button" 
                                 variant={lesson.type === 'video' ? 'secondary' : 'ghost'} 
                                 size="sm"
                                 onClick={() => handleLessonChange(lesson.id, "type", "video")}
                               >
                                 <Video className="h-4 w-4 mr-2" /> Video
                               </Button>
                               <Button 
                                 type="button" 
                                 variant={lesson.type === 'text' ? 'secondary' : 'ghost'} 
                                 size="sm"
                                 onClick={() => handleLessonChange(lesson.id, "type", "text")}
                               >
                                 <FileText className="h-4 w-4 mr-2" /> Article
                               </Button>
                               <Button 
                                 type="button" 
                                 variant={lesson.type === 'quiz' ? 'secondary' : 'ghost'} 
                                 size="sm"
                                 onClick={() => handleLessonChange(lesson.id, "type", "quiz")}
                               >
                                 <LayoutList className="h-4 w-4 mr-2" /> Quiz
                               </Button>
                            </div>
                         </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveLesson(lesson.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                   </div>
                 ))}
                 
                 {lessons.length === 0 && (
                   <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                     No lessons added yet. Click "Add Lesson" to start.
                   </div>
                 )}
               </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
             <Card>
               <CardHeader>
                 <CardTitle>Thumbnail</CardTitle>
                 <CardDescription>Upload a cover image.</CardDescription>
               </CardHeader>
               <CardContent>
                 <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="text-center space-y-2">
                       <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background border shadow-sm">
                         <Plus className="h-5 w-5 text-muted-foreground" />
                       </div>
                       <div className="text-sm font-medium text-muted-foreground">Click to upload</div>
                    </div>
                 </div>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                 <CardTitle>Settings</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Course</Label>
                      <p className="text-xs text-muted-foreground">Visible to everyone</p>
                    </div>
                    {/* Simplified switch since we don't have the component imported yet */}
                    <input type="checkbox" className="toggle" defaultChecked />
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Comments</Label>
                      <p className="text-xs text-muted-foreground">Allow student discussions</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
