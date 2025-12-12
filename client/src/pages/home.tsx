import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/course-card";
import { CheckCircle2, PlayCircle, Users, Award, Clock } from "lucide-react";
import heroImage from "@assets/generated_images/modern_university_students_studying_in_a_library.png";

const FEATURED_COURSES = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2025",
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    instructor: "Dr. Angela Yu",
    rating: 4.8,
    students: 12500,
    duration: "42h 15m",
    price: "$89.99"
  },
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
    title: "Digital Marketing Strategy: From Zero to Hero",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    instructor: "Seth Godin",
    rating: 4.7,
    students: 5600,
    duration: "12h 45m",
    price: "$69.99"
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
    price: "$79.99"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="space-y-8 animate-in slide-in-from-left-4 fade-in duration-700">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                New courses added weekly
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Unlock Your Potential with <span className="text-primary">Global Experts</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                Access world-class education from anywhere. Master new skills in coding, design, business, and more with our interactive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 h-14">
                  Start Learning Now
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  View Demo
                </Button>
              </div>
              
              <div className="pt-8 flex items-center gap-8 text-muted-foreground">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-foreground">10,000+</div>
                  <div className="text-sm">Active Students</div>
                </div>
              </div>
            </div>
            
            <div className="relative mx-auto lg:ml-auto w-full max-w-[600px] aspect-[4/3] lg:aspect-square animate-in slide-in-from-right-4 fade-in duration-1000 delay-200">
               {/* Decorative elements */}
               <div className="absolute -top-12 -right-12 h-64 w-64 bg-accent/20 rounded-full blur-3xl" />
               <div className="absolute -bottom-12 -left-12 h-64 w-64 bg-primary/20 rounded-full blur-3xl" />
               
               <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-background rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src={heroImage} 
                    alt="Students learning" 
                    className="object-cover w-full h-full"
                  />
                  
                  <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur p-4 rounded-xl shadow-lg border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Award className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground">Certified Excellence</div>
                        <div className="text-sm text-muted-foreground">Industry recognized certificates</div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-12 border-y">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-primary">250+</h3>
              <p className="text-sm font-medium text-muted-foreground">Expert Instructors</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-primary">15k+</h3>
              <p className="text-sm font-medium text-muted-foreground">Total Students</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-primary">120+</h3>
              <p className="text-sm font-medium text-muted-foreground">Online Courses</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-primary">4.8/5</h3>
              <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-accent/10 text-accent uppercase tracking-wide">
                Top Rated
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explore Featured Courses</h2>
              <p className="text-muted-foreground text-lg">
                Hand-picked courses to help you advance your career and learn new skills.
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex">View All Courses</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_COURSES.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          
          <div className="mt-8 md:hidden">
            <Button variant="outline" className="w-full">View All Courses</Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                   <div className="bg-background p-6 rounded-2xl shadow-sm border h-64 flex flex-col justify-center items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold mb-2">Community</h3>
                      <p className="text-sm text-muted-foreground">Connect with learners worldwide</p>
                   </div>
                   <div className="bg-background p-6 rounded-2xl shadow-sm border h-64 flex flex-col justify-center items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                        <Clock className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold mb-2">Flexible</h3>
                      <p className="text-sm text-muted-foreground">Learn at your own pace</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="bg-background p-6 rounded-2xl shadow-sm border h-64 flex flex-col justify-center items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                        <Award className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold mb-2">Certificates</h3>
                      <p className="text-sm text-muted-foreground">Earn recognized credentials</p>
                   </div>
                   <div className="bg-background p-6 rounded-2xl shadow-sm border h-64 flex flex-col justify-center items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold mb-2">Expert-led</h3>
                      <p className="text-sm text-muted-foreground">Learn from the best</p>
                   </div>
                </div>
             </div>
             
             <div className="order-1 lg:order-2 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose StudEdu?</h2>
                <p className="text-lg text-muted-foreground">
                  We provide a comprehensive learning ecosystem designed to help you achieve your goals faster. Our platform combines expert instruction with interactive practice.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Unlimited access to 100+ top courses",
                    "Expert instructors from leading companies",
                    "Interactive quizzes and hands-on projects",
                    "Offline viewing on mobile devices",
                    "Dedicated support and community forum"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button size="lg">Explore Membership</Button>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
