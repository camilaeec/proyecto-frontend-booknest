// pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUserBooks } from '../services/bookService';
import { updateUserProfile } from '../services/userService';
import Button from '../components/ui/Button';
import BookCard from '../components/book/BookCard';
import { toast } from 'react-hot-toast';
import { type Book } from '../types/bookTypes';
import Tab from '../components/ui/Tab';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'books'>('profile');
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || ''
  });

  useEffect(() => {
    if (activeTab === 'books' && user) {
      fetchUserBooks();
    }
  }, [activeTab, user]);

  const fetchUserBooks = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const books = await getUserBooks(user.id);
      setUserBooks(books);
    } catch (error) {
      toast.error('Error al cargar tus libros');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const updatedUser = await updateUserProfile(user.id, formData);
      updateUser(updatedUser);
      toast.success('Perfil actualizado correctamente');
      setEditMode(false);
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-booknest-midnight flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-booknest-light-gray" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-booknest-light-gray">
          {user?.nickname}
        </h2>
      </div>

      {editMode ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-booknest-light-gray mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-booknest-light-gray mb-1">
                Apellido
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-booknest-light-gray mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-booknest-light-gray mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-booknest-midnight border border-booknest-light-gray text-booknest-light-gray focus:outline-none focus:ring-2 focus:ring-booknest-accent"
              required
            />
          </div>
          <div className="flex space-x-3 pt-2">
            <Button 
              variant="primary"
              onClick={handleProfileUpdate}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Button>
            <Button 
              variant="secondary"
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-booknest-light-gray/80">Nombre</p>
              <p className="text-booknest-light-gray">
                {user?.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-booknest-light-gray/80">Apellido</p>
              <p className="text-booknest-light-gray">
                {user?.lastname}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-booknest-light-gray/80">Correo electrónico</p>
            <p className="text-booknest-light-gray">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-booknest-light-gray/80">Teléfono</p>
            <p className="text-booknest-light-gray">
              {user?.phoneNumber}
            </p>
          </div>
          <Button 
            variant="secondary"
            onClick={() => {
              setEditMode(true);
              setFormData({
                name: user?.name || '',
                lastname: user?.lastname || '',
                email: user?.email || '',
                phoneNumber: user?.phoneNumber || ''
              });
            }}
          >
            Editar perfil
          </Button>
        </div>
      )}
    </div>
  );

  const renderBooksTab = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-booknest-accent"></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Libros ({userBooks.length})</h2>
          <Button 
            variant="primary"  
            to="/books/new"
            asLink
          >
            Publicar nuevo libro
          </Button>
        </div>
        
        {userBooks.length === 0 ? (
          <div className="text-center py-12 bg-booknest-midnight rounded-xl">
            <p className="text-booknest-light-gray mb-4">
              Aún no has publicado ningún libro
            </p>
            <Button 
              variant="primary" 
              to="/books/new"
              asLink
            >
              Publicar mi primer libro
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book}
                showUserActions
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-booknest-light-gray mb-8">Mi Perfil</h1>
      
      <div className="flex border-b border-booknest-primary mb-6">
        <Tab
          active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        >
          Información Personal
        </Tab>
        <Tab
          active={activeTab === 'books'}
          onClick={() => setActiveTab('books')}
        >
          Mis Libros
        </Tab>
      </div>
      
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'books' && renderBooksTab()}
    </div>
  );
};

export default ProfilePage;