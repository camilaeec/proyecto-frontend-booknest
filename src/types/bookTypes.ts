export interface Book {
  id: number;
  title: string;
  authors: string[];  
  tags: string[];
  publisher?: string;
  yearOfPublication?: string;
  state: string;
  price: number;
  exchange: boolean;
  bookPhotos: string[];
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export type BookFormData = {
  title: string;
  authors: string[];
  tags: string[];
  publisher?: string;
  yearOfPublication?: string;
  state: string;
  price: number;
  exchange: boolean;
  bookPhotos: string[];
};