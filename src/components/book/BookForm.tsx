import React, { useState } from 'react';
import Button from '../ui/Button';
import { type BookFormData } from '../../types/bookTypes'; 

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => void;
  isLoading: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ 
  initialData, 
  onSubmit, 
  isLoading 
}) => {
  const [formData, setFormData] = useState<BookFormData>(initialData || {
    title: '',
    authors: [],
    tags: [],
    publisher: '',
    yearOfPublication: '',
    state: '',
    price: 0,
    exchange: false,
    bookPhotos: []
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddAuthor = () => {
    if (currentAuthor.trim() && !formData.authors.includes(currentAuthor.trim())) {
      setFormData({
        ...formData,
        authors: [...formData.authors, currentAuthor.trim()]
      });
      setCurrentAuthor('');
    }
  };

  const handleRemoveAuthor = (authorToRemove: string) => {
    setFormData({
      ...formData,
      authors: formData.authors.filter(author => author !== authorToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-booknest-light-gray mb-1">
          Título *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
          className="w-full px-4 py-2 rounded-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-booknest-light-gray mb-1">
          Autores *
        </label>
        <div className="flex">
          <input
            type="text"
            value={currentAuthor}
            onChange={(e) => setCurrentAuthor(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none"
            placeholder="Añadir autor"
          />
          <button
            type="button"
            onClick={handleAddAuthor}
            className="px-4 bg-booknest-accent text-booknest-primary rounded-r-lg hover:bg-booknest-accent/90"
          >
            +
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.authors.map(author => (
            <span 
              key={author} 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-booknest-accent/20 text-booknest-accent"
            >
              {author}
              <button
                type="button"
                onClick={() => handleRemoveAuthor(author)}
                className="ml-2 text-booknest-accent hover:text-booknest-accent/70"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-booknest-light-gray mb-1">
            Editorial
          </label>
          <input
            type="text"
            value={formData.publisher}
            onChange={(e) => setFormData({...formData, publisher: e.target.value})}
            className="w-full px-4 py-2 rounded-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-booknest-light-gray mb-1">
            Año de publicación
          </label>
          <input
            type="text"
            value={formData.yearOfPublication}
            onChange={(e) => setFormData({...formData, yearOfPublication: e.target.value})}
            className="w-full px-4 py-2 rounded-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-booknest-light-gray mb-1">
            Estado *
          </label>
          <select
            value={formData.state}
            onChange={(e) => setFormData({...formData, state: e.target.value})}
            required
            className="w-full px-4 py-2 rounded-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
          >
            <option value="">Seleccionar estado</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Como nuevo">Como nuevo</option>
            <option value="Buen estado">Buen estado</option>
            <option value="Aceptable">Aceptable</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-booknest-light-gray mb-1">
            Precio (S/.) *
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2 rounded-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.exchange}
          onChange={(e) => setFormData({...formData, exchange: e.target.checked})}
          className="h-4 w-4 text-booknest-accent rounded border-booknest-light-gray focus:ring-booknest-accent"
        />
        <label className="ml-2 block text-sm text-booknest-light-gray">
          Disponible para intercambio
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-booknest-light-gray mb-1">
          Etiquetas
        </label>
        <div className="flex">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none"
            placeholder="Añadir etiqueta"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 bg-booknest-accent text-booknest-primary rounded-r-lg hover:bg-booknest-accent/90"
          >
            +
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-booknest-primary/20 text-booknest-light-gray"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-booknest-light-gray hover:text-booknest-accent"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          variant="primary"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Guardando...' : 'Guardar Libro'}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;