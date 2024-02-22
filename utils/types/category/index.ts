import { Timestamp } from "firebase/firestore";

export interface ICategory {
  id: string;
  name: string;
  desc?: string;
  images?: string[],
  createdAt?: Timestamp;
  deleted?: boolean;
}

export interface IAddCategory {
  name: string;
  desc?: string;
  images?: string[]
}
