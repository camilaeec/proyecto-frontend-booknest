import api from './api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    // En una implementación real, verificarías con el backend
    return true; // Simulación
  } catch (error) {
    return false;
  }
};