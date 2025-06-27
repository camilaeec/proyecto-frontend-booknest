import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
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
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Redirigir a login si no está autenticado
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      const errorMessage = error.response.data?.message || 
                           error.message || 
                           'Error en la solicitud';
      
      console.error(`Error ${status}: ${errorMessage}`);
      throw new Error(errorMessage);
    }
    
    console.error('Error de red:', error.message);
    throw new Error('Error de conexión con el servidor');
  }
);

export default api;