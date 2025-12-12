import { BookOpen, Code, Database, Layout, Brain, BarChart, Server } from "lucide-react";

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  tags: string[];
  lessons: {
    title: string;
    items: Lesson[];
  }[];
}

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development with React & Node.js",
    description: "Master modern web development by building real-world projects. Learn React, Node.js, Express, and PostgreSQL from scratch.",
    category: "Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    instructor: "Sarah Chen",
    rating: 4.9,
    students: 15420,
    duration: "45h 30m",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    lessons: [
      {
        title: "Introduction to Full Stack",
        items: [
          { id: 101, title: "Course Overview & Roadmap", duration: "5:20", type: "video" },
          { id: 102, title: "Setting Up Development Environment", duration: "15:40", type: "video" },
          { id: 103, title: "Web Architecture Basics", duration: "10 mins", type: "text" }
        ]
      },
      {
        title: "Frontend Mastery with React",
        items: [
          { id: 104, title: "React Components & Props", duration: "22:15", type: "video" },
          { id: 105, title: "State Management & Hooks", duration: "28:30", type: "video" },
          { id: 106, title: "React Quiz", duration: "15 mins", type: "quiz" }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "AI Engineering: Build LLM Apps",
    description: "Learn to build AI-powered applications using OpenAI, LangChain, and Vector Databases. The future is AI.",
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    instructor: "Dr. Alex Rivera",
    rating: 4.8,
    students: 8300,
    duration: "28h 15m",
    tags: ["Python", "LLMs", "LangChain", "OpenAI"],
    lessons: [
      {
        title: "Understanding LLMs",
        items: [
          { id: 201, title: "How Transformers Work", duration: "18:45", type: "video" },
          { id: 202, title: "Prompt Engineering Basics", duration: "12:30", type: "video" },
          { id: 203, title: "LLM Safety & Ethics", duration: "15 mins", type: "text" }
        ]
      },
      {
        title: "Building with LangChain",
        items: [
          { id: 204, title: "Chains & Agents", duration: "25:10", type: "video" },
          { id: 205, title: "RAG (Retrieval Augmented Generation)", duration: "30:20", type: "video" }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Data Structures & Algorithms in Python",
    description: "Ace your coding interviews. Comprehensive guide to DSA with visual explanations and 100+ practice problems.",
    category: "Computer Science",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    instructor: "James Wilson",
    rating: 4.7,
    students: 12100,
    duration: "35h 00m",
    tags: ["Python", "DSA", "Interviews"],
    lessons: [
      {
        title: "Arrays & Strings",
        items: [
          { id: 301, title: "Big O Notation", duration: "14:20", type: "video" },
          { id: 302, title: "Two Pointer Technique", duration: "20:15", type: "video" }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "UI/UX Design Masterclass",
    description: "Design beautiful, user-centered interfaces. Learn Figma, prototyping, and design systems from industry experts.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    instructor: "Emily Zhang",
    rating: 4.9,
    students: 9500,
    duration: "24h 45m",
    tags: ["Figma", "Design Systems", "Prototyping"],
    lessons: [
      {
        title: "Design Fundamentals",
        items: [
          { id: 401, title: "Color Theory & Typography", duration: "16:30", type: "video" },
          { id: 402, title: "Grid Systems", duration: "14:00", type: "video" }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "DevOps & Cloud Infrastructure",
    description: "Deploy scalable applications. Learn Docker, Kubernetes, AWS, and CI/CD pipelines.",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?auto=format&fit=crop&q=80&w=800",
    instructor: "Michael Chang",
    rating: 4.8,
    students: 6200,
    duration: "40h 20m",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    lessons: [
      {
        title: "Containerization",
        items: [
          { id: 501, title: "Docker Basics", duration: "22:10", type: "video" },
          { id: 502, title: "Writing Dockerfiles", duration: "18:40", type: "video" }
        ]
      }
    ]
  },
  {
    id: "6",
    title: "Financial Literacy & Investing",
    description: "Take control of your finances. Learn about stocks, bonds, ETFs, and personal finance strategies.",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?auto=format&fit=crop&q=80&w=800",
    instructor: "Robert Fox",
    rating: 4.9,
    students: 18000,
    duration: "15h 30m",
    tags: ["Investing", "Personal Finance", "Stocks"],
    lessons: [
      {
        title: "Money Mindset",
        items: [
          { id: 601, title: "Power of Compounding", duration: "12:15", type: "video" },
          { id: 602, title: "Asset Allocation", duration: "16:45", type: "video" }
        ]
      }
    ]
  }
];
