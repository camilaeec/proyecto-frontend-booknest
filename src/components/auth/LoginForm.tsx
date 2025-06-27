import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-booknest-midnight mb-1">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-booknest-light-gray rounded-lg focus:ring-booknest-accent focus:border-booknest-accent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-booknest-midnight mb-1">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-booknest-light-gray rounded-lg focus:ring-booknest-accent focus:border-booknest-accent"
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-booknest-accent text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;