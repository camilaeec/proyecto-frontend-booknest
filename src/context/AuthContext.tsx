import { createContext, useContext, useEffect, useState } from 'react';
import { getMe } from '../services/authService';
import * as authService from '../services/authService';
import type { User } from '../types/userTypes';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verifica si el token es válido
          const isValid = await verifyToken(token);
          if (isValid) {
            const userData = await getMe();
            setUser(userData);
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      return true; 
    } catch (error) {
      return false;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await authService.register(userData);
      const token = response.token; // Asume que el backend devuelve un token
      localStorage.setItem('token', token);
      
      const userDataResponse = await authService.getMe();
      setUser(userDataResponse);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    // Obtener datos del usuario y setUser
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
