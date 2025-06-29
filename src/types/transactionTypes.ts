export interface Transaction {
  id: number;
  bookId: number;
  buyerId: number;
  sellerId: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  proposedPrice?: number;
  proposedBookId?: number;
  createdAt: string;
  updatedAt: string;
  book: {
    title: string;
    bookPhotos: string[];
  };
  buyer: {
    nickname: string;
  };
}