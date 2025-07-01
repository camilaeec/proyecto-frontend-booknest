import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para agregar token JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token agregado a la solicitud:', token);
  } else {
  console.warn('No se encontró token en localStorage');
  }
  return config;
}, error => {
  console.error('Error en interceptor de solicitud:', error);
  return Promise.reject(error);
});

// Manejo de errores global
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      toast.error('Acceso denegado. Por favor, inicia sesión nuevamente.');
      localStorage.removeItem('token');
      window.location.href = '/login';
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