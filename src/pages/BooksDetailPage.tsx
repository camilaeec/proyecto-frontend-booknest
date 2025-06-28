import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, deleteBook, getBooks } from '../services/bookService';
import type { Book } from '../types/bookTypes';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import BookCard from '../components/book/BookCard';

const BooksDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

    useEffect(() => {
    const fetchBookData = async () => {
      try {
        if (!id) return;
        
        const bookData = await getBookById(parseInt(id));
        setBook(bookData);
        
        // Obtener libros relacionados (simulado)
        const allBooks = await getBooks();
        setRelatedBooks(
          allBooks
            .filter(b => b.id !== bookData.id)
            .slice(0, 3)
        );
        
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);
  

  const handleDelete = async () => {
    if (!book || !user) return;
    
    try {
      await deleteBook(book.id);
      navigate('/books');
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12 text-booknest-light-gray">
          Cargando libro...
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12 text-booknest-light-gray">
          Libro no encontrado
        </div>
      </div>
    );
  }

  const isOwner = user?.id === book.userId;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-booknest-midnight rounded-xl shadow-lg p-6">
        <div className="md:flex gap-8">
          {/* Book Cover */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="bg-booknest-primary/30 rounded-xl h-96 flex items-center justify-center">
              <span className="text-booknest-light-gray/50">Portada del libro</span>
            </div>
          </div>
          
          {/* Book Details */}
          <div className="md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-booknest-light-gray">
                  {book.title}
                </h1>
                <p className="text-xl text-booknest-accent mt-2">
                  {book.authors.join(', ')}
                </p>
              </div>
              
              <div className="text-2xl font-bold text-booknest-accent">
                S/. {book.price.toFixed(2)}
              </div>
            </div>
            
            <div className="mt-6 space-y-4 text-booknest-light-gray">
              <div>
                <span className="font-medium">Editorial:</span> {book.publisher || 'No especificado'}
              </div>
              <div>
                <span className="font-medium">Año de publicación:</span> {book.yearOfPublication || 'No especificado'}
              </div>
              <div>
                <span className="font-medium">Estado:</span> {book.state}
              </div>
              <div>
                <span className="font-medium">Disponible para intercambio:</span> {book.exchange ? 'Sí' : 'No'}
              </div>
              
              <div className="flex items-center">
                <span className="font-medium mr-2">Calificación:</span>
                <Rating value={4.5} />
                <span className="ml-2 text-booknest-light-gray/80">(24 reseñas)</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-booknest-light-gray">Etiquetas</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {book.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-booknest-primary/20 text-booknest-light-gray rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              {isOwner ? (
                <div className="flex space-x-3">
                  <Link to={`/books/edit/${book.id}`}>
                    <Button variant="secondary">Editar libro</Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    onClick={handleDelete}
                  >
                    Eliminar libro
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="primary">
                    Comprar ahora
                  </Button>
                  {book.exchange && (
                    <Button variant="outline">
                      Proponer intercambio
                    </Button>
                  )}
                  <Button variant="secondary">
                    Agregar a favoritos
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Seller Information */}
        <div className="mt-10 pt-6 border-t border-booknest-primary">
          <h3 className="text-xl font-bold text-booknest-light-gray mb-4">Vendedor</h3>
          <div className="flex items-center">
            <div className="bg-booknest-primary/30 rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-booknest-light-gray/50">U</span>
            </div>
            <div className="ml-4">
              <div className="text-lg font-medium text-booknest-light-gray">Usuario Ejemplo</div>
              <div className="flex items-center mt-1">
                <Rating value={4.8} size="sm" />
                <span className="ml-2 text-booknest-light-gray/80">(42 reseñas)</span>
              </div>
              <div className="mt-2">
                <Button variant="outline" size="sm">
                  Ver perfil
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-booknest-light-gray mb-4">Libros relacionados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBooks.map(relatedBook => (
                <BookCard 
                  key={relatedBook.id} 
                  book={relatedBook} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksDetailPage;