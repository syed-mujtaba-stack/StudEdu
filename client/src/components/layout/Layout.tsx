import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col pb-16 md:pb-0">
        {children}
      </main>
      {showFooter && (
        <div className="hidden md:block">
          <Footer />
        </div>
      )}
      <MobileNav />
    </div>
  );
}
