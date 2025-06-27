import api from './api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Cambia '/auth/me' por '/users/getMe'
export const getMe = async () => {
  const response = await api.get('/users/getMe');
  return response.data;
};