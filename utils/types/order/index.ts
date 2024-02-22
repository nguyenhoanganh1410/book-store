import { Timestamp } from "firebase/firestore";

export interface IOrder {
  address: string;
  email: string;
  fullName: string;
  payment: boolean;
  owner: string;
  phone: string;
  status: string;
  total: number;
  products: IProduct[];
  createdAt?: string;
  id: string;
}

interface IProduct {
  userId: string;
  productName: string;
  productPrice: string;
  quality: number;
  productImages: string[];
  productId: string;
}
