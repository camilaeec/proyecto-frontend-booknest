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

  // Función para verificar y establecer el token
  const setAuthToken = async (token: string) => {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    const userData = await authService.getMe();
    setUser(userData);
  } catch (err) {
    console.error('Error al obtener usuario desde setAuthToken', err);
  }
};
  const initAuth = async () => {
  const token = localStorage.getItem('token');
  console.log('Token encontrado en initAuth:', token);

  if (!token) {
    console.log('No hay token, marcando como no autenticado');
    setLoading(false);
    return;
  }

  try {
    await setAuthToken(token); // este reemplaza todo el bloque anterior
  } catch (error) {
    console.error('La verificación del token falló', error);
    localStorage.removeItem('token');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    initAuth();
  }, []);

  const register = async (userData: any) => {
  try {
    const response = await authService.register(userData);
    const token = response.token;

    if (!token) {
      throw new Error("Token no recibido del servidor");
    }

    await setAuthToken(token);
  } catch (error: any) {
    console.error("Error en registro:", error);
    throw error;
  }
};

  const login = async (email: string, password: string) => {
  try {
    const { token } = await authService.login(email, password);
    await setAuthToken(token); 
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