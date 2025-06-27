import { Link } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image?: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-booknest-light-gray transition-transform hover:scale-[1.02]">
      {book.image ? (
        <img 
          src={book.image} 
          alt={book.title} 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-booknest-light-gray flex items-center justify-center">
          <span className="text-booknest-midnight">Sin imagen</span>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{book.title}</h3>
        <p className="text-booknest-midnight text-sm mt-1">{book.author}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-booknest-accent">${book.price.toFixed(2)}</span>
          <Link 
            to={`/books/${book.id}`}
            className="text-sm bg-booknest-accent text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;