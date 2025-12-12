import { Link, useLocation } from "wouter";
import { Home, Compass, BookOpen, User, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export function MobileNav() {
  const [location] = useLocation();
  const { user } = useAuth();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/dashboard", icon: Compass, label: "Explore" }, // Dashboard acts as explore/my courses for now
    { href: "/course/create", icon: PlusCircle, label: "Create" },
    { href: user ? "/dashboard" : "/login", icon: BookOpen, label: "My Learning" }, // Redirects to login if not auth
    { href: user ? "#" : "/login", icon: User, label: user ? "Profile" : "Log In" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.label} href={item.href}>
              <a className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}>
                <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
