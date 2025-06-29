import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader = ({ username }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-booknest-light-gray">Bienvenido, {username}</h1>
        <p className="text-booknest-light-gray/80 mt-2">Aquí está tu resumen de actividades</p>
      </div>
      <Link 
        to="/profile" 
        className="flex items-center justify-center w-10 h-10 rounded-full bg-booknest-midnight text-booknest-light-gray hover:bg-booknest-accent hover:text-booknest-primary transition-colors"
        title="Mi perfil"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </Link>
    </div>
  );
};

export default DashboardHeader;