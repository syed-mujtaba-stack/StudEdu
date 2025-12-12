import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-primary/5 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[150px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20 select-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Page not found
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
        >
          <Link href="/">
            <Button size="lg" className="min-w-[160px] gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[160px] gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </motion.div>

        {/* Helpful Links/Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-12 text-sm text-muted-foreground"
        >
          <p>Looking for something specific?</p>
          <div className="flex gap-6 justify-center mt-4">
            <Link href="/courses">
              <a className="hover:text-primary transition-colors">Browse Courses</a>
            </Link>
            <Link href="/blog">
              <a className="hover:text-primary transition-colors">Read Blog</a>
            </Link>
            <Link href="/contact">
              <a className="hover:text-primary transition-colors">Contact Support</a>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
