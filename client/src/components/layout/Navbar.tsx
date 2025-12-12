import { Link, useLocation } from "wouter";
import { Search, Menu, X, BookOpen, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, signOut } = useAuth();

  const isDashboard = location.startsWith("/dashboard") || location.startsWith("/course");

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo-animated.svg"
                alt="StudEdu Logo"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold tracking-tight text-foreground">StudEdu</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {!isDashboard && (
              <>
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Courses</Link>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Mentors</Link>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
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
            {!user ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/course/create">Create Course</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            <Link href="/" className="block text-sm font-medium py-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/dashboard" className="block text-sm font-medium py-2" onClick={() => setIsOpen(false)}>Courses</Link>
            <Link href="#" className="block text-sm font-medium py-2" onClick={() => setIsOpen(false)}>Mentors</Link>
          </div>
          <div className="pt-4 border-t space-y-2">
            {!user ? (
              <>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              <Button variant="destructive" className="w-full" onClick={() => signOut()}>
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
