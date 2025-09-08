"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isLoggedIn: boolean;
  isSubscribed: boolean;
  login: () => void;
  logout: () => void;
  toggleSubscription: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
    toast({
      title: "Logged In",
      description: "Welcome back to SwipeStream!",
    });
  }, [toast]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsSubscribed(false);
     toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }, [toast]);

  const toggleSubscription = useCallback(() => {
    if (!isLoggedIn) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "You must be logged in to manage your subscription.",
      });
      return;
    }
    setIsSubscribed(prev => {
      const newStatus = !prev;
      toast({
        title: "Subscription Updated",
        description: newStatus ? "You are now subscribed to premium content!" : "Your premium subscription has been cancelled.",
      });
      return newStatus;
    });
  }, [isLoggedIn, toast]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isSubscribed, login, logout, toggleSubscription }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
