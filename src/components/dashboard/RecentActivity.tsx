import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Book } from '../../types/bookTypes'; 

interface RecentActivityProps {
  books: Book[]; 
}

const RecentActivity: FC<RecentActivityProps> = ({ books }) => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {books.map((book) => (
        <div
          key={book.idBook}                                    // 🔑 key única
          className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/books/${book.idBook}`)}    // usar `idBook`
        >
          <h3 className="text-lg font-medium">{book.title}</h3>
          <p className="text-sm text-gray-500">
            {book.authors.join(', ')}
          </p>
        </div>
      ))}
    </div>
  );
};


export default RecentActivity;