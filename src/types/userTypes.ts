export interface User {
  id: number;
  nickname: string;
  email: string;
  role: string;
  name?: string;
  lastname?: string;
  phoneNumber?: string;
  rating?: number;
}

export interface UserUpdateData {
  name?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}