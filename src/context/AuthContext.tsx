
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type UserType = 'customer' | 'provider' | null;

interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, userType: UserType) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for user in localStorage (simulating persistence)
    const storedUser = localStorage.getItem('handyhub_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate an API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      // In a real app, this would be fetched from an API
      const mockUsers = [
        { id: '1', name: 'John Customer', email: 'customer@example.com', userType: 'customer' as UserType, password: 'password' },
        { id: '2', name: 'Jane Provider', email: 'provider@example.com', userType: 'provider' as UserType, password: 'password' }
      ];
      
      const matchedUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (matchedUser) {
        const { password, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword as User);
        localStorage.setItem('handyhub_user', JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      } else {
        toast.error("Invalid email or password.");
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, userType: UserType) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would create a user in the database
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        userType
      };
      
      setUser(newUser);
      localStorage.setItem('handyhub_user', JSON.stringify(newUser));
      toast.success(`Welcome to HandyHub, ${name}!`);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create account.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('handyhub_user');
    toast.info("You've been logged out.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userType: user?.userType || null,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
