import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          BookNest
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>Hola, {user.nickname}</span>
              <button 
                onClick={logout}
                className="bg-accent hover:bg-blue-600 px-4 py-1 rounded transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">
                Iniciar sesión
              </Link>
              <Link 
                to="/register" 
                className="bg-accent hover:bg-blue-600 px-4 py-1 rounded transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;