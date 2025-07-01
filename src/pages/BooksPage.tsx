import React, { useState, useEffect } from 'react';
import BookCard from '../components/book/BookCard';
import { getBooks } from '../services/bookService';
import { type Book } from '../types/bookTypes';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    exchange: false,
    minPrice: '',
    maxPrice: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExchange = !filters.exchange || book.exchange;
    
    const minPrice = filters.minPrice ? Number(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
    const matchesPrice = book.price >= minPrice && book.price <= maxPrice;
    
    return matchesSearch && matchesExchange && matchesPrice;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-booknest-light-gray">Explorar Libros</h1>
          <p className="text-booknest-light-gray/80 mt-2">
            Descubre nuevos libros para comprar o intercambiar
          </p>
        </div>
        
        {user && (
          <Link to="/books/new">
            <Button variant="primary">
              Publicar nuevo libro
            </Button>
          </Link>
        )}
      </div>
      
      {/* Search and Filters */}
      <div className="bg-booknest-midnight rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-booknest-light-gray mb-2">
              Buscar libros
            </label>
            <input
              type="text"
              placeholder="Título, autor, género..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-booknest-primary border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-booknest-light-gray mb-2">
              Rango de precios
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Mínimo"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                className="w-1/2 px-4 py-2 rounded-lg bg-booknest-primary border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
              />
              <input
                type="number"
                placeholder="Máximo"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="w-1/2 px-4 py-2 rounded-lg bg-booknest-primary border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.exchange}
                onChange={(e) => setFilters({...filters, exchange: e.target.checked})}
                className="h-4 w-4 text-booknest-accent rounded border-booknest-light-gray focus:ring-booknest-accent"
              />
              <span className="ml-2 text-sm text-booknest-light-gray">
                Mostrar solo intercambios
              </span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-between">
          <div className="text-booknest-light-gray">
            {filteredBooks.length} libros encontrados
          </div>
          <div>
            <select className="px-4 py-2 rounded-lg bg-booknest-primary border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent">
              <option>Ordenar por: Recientes</option>
              <option>Ordenar por: Precio (bajo a alto)</option>
              <option>Ordenar por: Precio (alto a bajo)</option>
              <option>Ordenar por: Mejor calificados</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Books Grid */}
      {loading ? (
        <div className="text-center py-12 text-booknest-light-gray">
          Cargando libros...
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-booknest-light-gray text-lg mb-4">
            No se encontraron libros que coincidan con tu búsqueda
          </div>
          <Button 
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setFilters({ exchange: false, minPrice: '', maxPrice: '' });
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.idBook} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;