import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';
import type { User } from '../types/userTypes';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: User) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      console.log('Token encontrado en initAuth:', token); // Para depuración
      
      if (!token) {
        console.log('No hay token, marcando como no autenticado');
        setLoading(false);
        return;
      }

      try {
        // Agrega el token a los headers de axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const userData = await authService.getMe();
        console.log('Datos de usuario obtenidos:', userData); // Para depuración
        
        setUser(userData);
      } catch (error) {
        console.error('La verificación del token falló', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const register = async (userData: any) => {
    try {
      const response = await authService.register(userData);
      const token = response.token;
      
      if (!token) {
        throw new Error("Token no recibido del servidor");
      }
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const userDataResponse = await authService.getMe();
      setUser(userDataResponse);
    } catch (error: any) {
      // Manejo de errores...
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { token } = await authService.login(email, password);
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const userData = await authService.getMe();
      setUser(userData);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};