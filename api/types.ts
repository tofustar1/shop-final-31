export interface Product {
  id: string;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
}

export type ProductWithoutId = Omit<Product, 'id'>;

export interface Category {
  title: string;
  description: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleId?: string;
}