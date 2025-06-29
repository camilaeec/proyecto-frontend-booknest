// services/userService.ts
import api from './api';
import type { User, UserUpdateData } from '../types/userTypes';
import type { Book } from '../types/bookTypes'; // Importación agregada

export const updateUserProfile = async (userId: number, userData: UserUpdateData): Promise<User> => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating user profile');
  }
};

export const getUserBooks = async (userId: number): Promise<Book[]> => {
  try {
    const response = await api.get(`/users/${userId}/books`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user books');
  }
};