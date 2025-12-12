import { Link, useLocation } from "wouter";
import { Search, Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const isDashboard = location.startsWith("/dashboard") || location.startsWith("/course");

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">StudEdu</span>
              </a>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {!isDashboard && (
              <>
                <Link href="/"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</a></Link>
                <Link href="/dashboard"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Courses</a></Link>
                <Link href="#"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Mentors</a></Link>
                <Link href="#"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a></Link>
              </>
            )}
            
            {isDashboard && (
               <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="w-full bg-background pl-8 h-9 md:w-[300px] lg:w-[300px]" 
                />
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {location === "/" ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">Log In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </>
            ) : (
               <div className="flex items-center gap-4">
                 <Button variant="ghost" size="sm" asChild>
                    <Link href="/">Sign Out</Link>
                 </Button>
                  <div className="h-8 w-8 rounded-full bg-secondary overflow-hidden border">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                  </div>
               </div>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
           <div className="space-y-2">
            <Link href="/"><a className="block text-sm font-medium py-2" onClick={() => setIsOpen(false)}>Home</a></Link>
            <Link href="/dashboard"><a className="block text-sm font-medium py-2" onClick={() => setIsOpen(false)}>Courses</a></Link>
            <Link href="#"><a className="block text-sm font-medium py-2" onClick={() => setIsOpen(false)}>Mentors</a></Link>
           </div>
           <div className="pt-4 border-t space-y-2">
             <Button className="w-full" asChild>
                <Link href="/dashboard">Get Started</Link>
             </Button>
           </div>
        </div>
      )}
    </nav>
  );
}
