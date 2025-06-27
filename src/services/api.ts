import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true   
});

// Interceptor para agregar token JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejo de errores global
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      console.error('Acceso denegado - Token inválido o expirado');
    }
    return Promise.reject(error);
  }
)

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // Agrega esto
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;