import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import { getRecentBooks, getTransactionStats } from '../services/bookService';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ 
    books: 0, 
    transactions: 0, 
    reviews: 0 
  });
  
  const [recentBooks, setRecentBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const [statsData, booksData] = await Promise.all([
        getTransactionStats(),
        getRecentBooks()
      ]);
      
      setStats(statsData);
      setRecentBooks(booksData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader username={user?.name || "Usuario"} />
        <div className="text-center py-12 text-booknest-light-gray">
          Cargando dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader username={user?.name || "Usuario"} />
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-8">
          <div className="text-center">
            <div className="text-red-500 text-lg font-medium mb-4">
              {error}
            </div>
            <Button 
              variant="primary"
              onClick={fetchData}
              className="w-full"
            >
              Intentar nuevamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader username={user?.name || "Usuario"} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <StatsCard 
          title="Libros Publicados" 
          value={stats.books} 
          icon="📚" 
          color="bg-blue-100 text-blue-600"
        />
        <StatsCard 
          title="Transacciones" 
          value={stats.transactions} 
          icon="🔄" 
          color="bg-green-100 text-green-600"
        />
        <StatsCard 
          title="Reseñas Recibidas" 
          value={stats.reviews} 
          icon="⭐" 
          color="bg-yellow-100 text-yellow-600"
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Libros Recientes</h2>
        {recentBooks.length === 0 ? (
          <div className="bg-booknest-midnight rounded-xl p-6 text-center">
            <p className="text-booknest-light-gray">
              Aún no hay libros recientes
            </p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => navigate('/books/new')}
            >
              Publicar mi primer libro
            </Button>
          </div>
        ) : (
          <RecentActivity books={recentBooks} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;