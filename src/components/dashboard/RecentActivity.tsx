import { type Book } from '../../types/bookTypes'; 

interface RecentActivityProps {
  books: Book[]; 
}

const RecentActivity = ({ books }: RecentActivityProps) => {
  return (
    <div className="space-y-4">
      {books.map(book => (
        <div key={book.id} className="flex items-center border-b border-booknest-light-gray pb-3">
          <div className="bg-booknest-accent rounded-full p-2 mr-4">
            <span className="text-booknest-white text-sm">📚</span>
          </div>
          <div>
            <h4 className="font-medium text-booknest-light-gray">{book.title}</h4>
            <p className="text-sm text-booknest-midnight">
              {book.authors.join(', ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;