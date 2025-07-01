import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';
import type { User } from '../types/userTypes';
import api from '../services/api';


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (newData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (newData: User) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }
      try {
        // getMe() usará el interceptor para adjuntar el token
        const me = await authService.getMe()
        setUser(me)
      } catch (err) {
        console.error('Token inválido:', err)
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const register = async (userData: any) => {
    const { token } = await authService.register(userData)
    localStorage.setItem('token', token)
    const me = await authService.getMe()
    setUser(me)
  }

  const login = async (email: string, password: string) => {
    const { token } = await authService.login(email, password)
    localStorage.setItem('token', token)
    const me = await authService.getMe()
    setUser(me)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateUser = (newData: User) => {
    setUser(newData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
};