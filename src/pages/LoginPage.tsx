// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import logo from '../assets/favicon.svg';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas. Por favor intente de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-booknest-light-gray p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-booknest-primary py-8 px-10 text-center">
          <img 
            src={logo} 
            alt="BookNest Logo" 
            className="w-32 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-booknest-white">Iniciar Sesión</h1>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <LoginForm onSubmit={handleSubmit} />
          
          <div className="mt-6 text-center">
            <p className="text-booknest-midnight">
              ¿No tienes cuenta?{' '}
              <a 
                href="/register" 
                className="text-booknest-accent font-medium hover:underline"
              >
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;