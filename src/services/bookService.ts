export interface TransactionStats {
  totalTransactions: number;
  pendingTransactions: number;
  completedTransactions: number;
  rejectedTransactions: number;
}

import api from './api';
import type { Book, BookFormData } from '../types/bookTypes';

export const getBooks = async (search = ''): Promise<Book[]> => {
  try {
    const response = await api.get('/books', {
      params: { search }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching books');
  }
};

export const getBookById = async (id: number): Promise<Book> => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Book not found');
  }
};

export const createBook = async (bookData: BookFormData): Promise<Book> => {
  try {
    const response = await api.post('/books', bookData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating book');
  }
};

// Actualizar libro existente
export const updateBook = async (id: number, bookData: BookFormData): Promise<Book> => {
  try {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating book');
  }
};

// Eliminar libro
export const deleteBook = async (id: number): Promise<void> => {
  try {
    await api.delete(`/books/${id}`);
  } catch (error) {
    throw new Error('Error deleting book');
  }
};

// Obtener libros recientes (para dashboard)
export const getRecentBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get('/books/recent');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent books', error);
    
    // Manejo específico de error 403
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      (error as any).response?.status === 403
    ) {
      console.log('Acceso denegado para libros recientes');
    }
    
    return [];
  }
};

// Obtener estadísticas de transacciones (para dashboard)
export const getTransactionStats = async (): Promise<TransactionStats> => {
  try {
    const response = await api.get('/transactions/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction stats', error);
    return {
      totalTransactions: 0,
      pendingTransactions: 0,
      completedTransactions: 0,
      rejectedTransactions: 0
    };
  }
};

// Obtener libros de un usuario específico
export const getUserBooks = async (userId: number): Promise<Book[]> => {
  try {
    const response = await api.get(`/users/${userId}/books`);
    return response.data;
  } catch (error) {
    // Fallback: filtrar libros por userId
    const allBooks = await getBooks();
    return allBooks.filter(book => book.userId === userId);
  }
};