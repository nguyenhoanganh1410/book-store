import { Timestamp } from "firebase/firestore";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  status: string;
  category: string;
  quality: number;
  desc?: string;
  images?: string[],
  createdAt?: Timestamp;
  deleted?: boolean;
  sold?: number;
}

export interface IAddProduct {
  name: string;
  price: number;
  status: string;
  category: string;
  quality: number;
  desc?: string;
  images?: string[];
  sold?: number;
}
