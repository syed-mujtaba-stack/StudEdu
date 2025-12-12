import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo-animated.svg"
                alt="StudEdu Logo"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold tracking-tight">StudEdu</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering learners worldwide with accessible, high-quality education from top industry experts.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Browse Courses</Link></li>
              <li><Link href="/mentors" className="hover:text-foreground transition-colors">Mentorship</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/business" className="hover:text-foreground transition-colors">For Business</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 StudEdu Inc. All rights reserved.
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
