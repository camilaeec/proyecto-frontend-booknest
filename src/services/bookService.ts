import api from './api'

export const getBooks = async (search = '') => {
  try {
    const response = await api.get('/books', {
      params: { search }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching books');
  }
};

export const getBookById = async (id: number) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Book not found');
  }
};

export const createBook = async (bookData: any) => {
  try {
    const response = await api.post('/books', bookData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating book');
  }
};