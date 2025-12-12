import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
               </div>
               <span className="text-xl font-bold tracking-tight">StudEdu</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering learners worldwide with accessible, high-quality education from top industry experts.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#"><a className="hover:text-foreground transition-colors">Browse Courses</a></Link></li>
              <li><Link href="#"><a className="hover:text-foreground transition-colors">Mentorship</a></Link></li>
              <li><Link href="#"><a className="hover:text-foreground transition-colors">Pricing</a></Link></li>
              <li><Link href="#"><a className="hover:text-foreground transition-colors">For Business</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#"><a className="hover:text-foreground transition-colors">About Us</a></Link></li>
              <li><Link href="#"><a className="hover:text-foreground transition-colors">Careers</a></Link></li>
              <li><Link href="#"><a className="hover:text-foreground transition-colors">Blog</a></Link></li>
              <li><Link href="#"><a className="hover:text-foreground transition-colors">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#"><a className="hover:text-foreground transition-colors">Terms of Service</a></Link></li>
              <li><Link href="#"><a className="hover:text-foreground transition-colors">Privacy Policy</a></Link></li>
              <li><Link href="#"><a className="hover:text-foreground transition-colors">Cookie Policy</a></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 StudEdu Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <ButtonIcon icon={Facebook} />
            <ButtonIcon icon={Twitter} />
            <ButtonIcon icon={Instagram} />
            <ButtonIcon icon={Linkedin} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function ButtonIcon({ icon: Icon }: { icon: any }) {
  return (
    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
      <Icon className="h-5 w-5" />
    </a>
  );
}
