import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardHeaderfrom from '../components/dashboard/DashboardHeader'; 
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import { getRecentBooks, getTransactionStats } from '../services/bookService';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ books: 0, transactions: 0, reviews: 0 });
  const [recentBooks, setRecentBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getTransactionStats();
        const booksData = await getRecentBooks();
        
        setStats(statsData);
        setRecentBooks(booksData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader username={user?.name} />
      
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
        <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
        <RecentActivity books={recentBooks} />
      </div>
    </div>
  );
};

export default DashboardPage;