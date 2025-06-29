import { Link } from 'react-router-dom';
import { type Book } from '../../types/bookTypes';
import Button from '../ui/Button';

interface BookCardProps {
  book: Book;
  showUserActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book,
  showUserActions = false,
  onEdit,
  onDelete
}) => {
  const bookImage = book.bookPhotos?.length > 0 ? book.bookPhotos[0] : null;
  return (
    <div className="bg-booknest-midnight rounded-xl shadow-lg overflow-hidden border border-booknest-primary">
      {bookImage ? (
        <img 
          src={bookImage} 
          alt={book.title} 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-booknest-light-gray flex items-center justify-center">
          <span className="text-booknest-midnight">Sin imagen</span>
        </div>
      )}
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg truncate text-booknest-light-gray">
          {book.title}
        </h3>
        <p className="text-booknest-light-gray/80 text-sm mt-1">
          {book.authors.join(', ')}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-booknest-accent">
            S/. {book.price.toFixed(2)}
          </span>
          <Link 
            to={`/books/${book.id}`}
            className="text-sm bg-booknest-accent text-booknest-primary px-3 py-1 rounded hover:bg-booknest-accent/80 transition-colors"
          >
            Ver Detalles
          </Link>
        </div>
        {showUserActions && (
          <div className="mt-4 pt-4 border-t border-booknest-primary/30 flex space-x-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={onEdit}
              className="flex-1"
            >
              Editar
            </Button>
            <Button 
              variant="danger" 
              size="sm"
              onClick={onDelete}
              className="flex-1"
            >
              Eliminar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;