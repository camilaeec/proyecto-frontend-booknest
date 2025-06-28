import { useNavigate } from 'react-router-dom';
import BookForm from '../components/book/BookForm';
import { createBook } from '../services/bookService';
import type { BookFormData } from '../types/bookTypes';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const CreateBookPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (bookData: BookFormData) => {
    try {
      setLoading(true);
      await createBook(bookData);
      toast.success('Libro creado exitosamente');
      navigate('/books');
    } catch (error) {
      toast.error('Error al crear el libro');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-booknest-midnight rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-booknest-light-gray mb-6">
          Publicar Nuevo Libro
        </h1>
        
        <BookForm 
          onSubmit={handleSubmit} 
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default CreateBookPage;