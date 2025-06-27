import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/favicon.svg';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nickname: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await register(formData);
    navigate('/dashboard');
  } catch (err: any) {
    let errorMessage = 'Error al registrar el usuario. Por favor intente de nuevo.';
    
    if (err.response) {
      errorMessage = err.response.data.message || errorMessage;
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    setError(errorMessage);
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
          <h1 className="text-2xl font-bold text-booknest-white">Crear Cuenta</h1>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-booknest-midnight mb-1">
                Nickname
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-booknest-light-gray rounded-lg focus:ring-booknest-accent focus:border-booknest-accent text-booknest-midnight"
                required
              />
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-booknest-midnight mb-1">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-booknest-light-gray rounded-lg focus:ring-booknest-accent focus:border-booknest-accent text-booknest-midnight"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-booknest-midnight mb-1">
                Apellido
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-booknest-light-gray rounded-lg focus:ring-booknest-accent focus:border-booknest-accent text-booknest-midnight"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-booknest-midnight mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-booknest-light-gray rounded-lg focus:ring-booknest-accent focus:border-booknest-accent text-booknest-midnight"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-booknest-midnight mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-booknest-light-gray rounded-lg focus:ring-booknest-accent focus:border-booknest-accent text-booknest-midnight"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-booknest-midnight mb-1">
                Teléfono
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-booknest-light-gray rounded-lg focus:ring-booknest-accent focus:border-booknest-accent text-booknest-midnight"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-booknest-accent text-booknest-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors mt-4"
            >
              Registrarse
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-booknest-midnight">
              ¿Ya tienes cuenta?{' '}
              <a 
                href="/login" 
                className="text-booknest-accent font-medium hover:underline"
              >
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;