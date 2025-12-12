import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

// Mock User Type
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: 'student' | 'teacher' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Simulate checking for an existing session on mount
    const checkSession = async () => {
      await new Promise(resolve => setTimeout(resolve, 800)); // Fake network delay
      const storedUser = localStorage.getItem('studedu_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const signIn = async (email: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      id: '123',
      email,
      name: email.split('@')[0] || 'User',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role: 'student'
    };

    setUser(mockUser);
    localStorage.setItem('studedu_user', JSON.stringify(mockUser));
    setIsLoading(false);
    setLocation('/dashboard');
  };

  const signUp = async (email: string, _password: string, name: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: '124',
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      role: 'student'
    };

    setUser(mockUser);
    localStorage.setItem('studedu_user', JSON.stringify(mockUser));
    setIsLoading(false);
    setLocation('/dashboard');
  };

  const signOut = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('studedu_user');
    setIsLoading(false);
    setLocation('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
