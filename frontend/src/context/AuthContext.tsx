import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
	baseURL: "http://127.0.0.1:8000/api",
});


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Save token for protected requests
        localStorage.setItem('token', response.data.token);

        // Update state with user data from backend
        setUser(response.data.profile);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };  `1`

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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
