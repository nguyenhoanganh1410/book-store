import { db } from '@/firebase';
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Tables } from '@/utils/enums';
import { IAddProduct, IProduct } from '@/utils/types';

export const addProduct = async (product: IAddProduct) => {
  const commentDocument = await addDoc(collection(db, Tables.products), {
    name: product.name,
    price: +product.price,
    status: product.status,
    category: product.category,
    desc: product.desc,
    quality: product.quality,
    sold: 0,
    images: product.images,
    createdAt: Timestamp.now(),
    deleted: false,
  });
  return commentDocument;
};

export const getProducts = async (
  _limit?: number
): Promise<IProduct[]> => {
  const q = query(
    collection(db, Tables.products),
    where('deleted', '==', false),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  })) as IProduct[];
};

export const deleteProduct = async (productId: string) => {
  const userRef = doc(db, Tables.products, productId);
  return await updateDoc(userRef, {deleted: true});
};

export const updatedProduct = async (productId: string, productParams: any) => {
  const userRef = doc(db, Tables.products, productId);
  return await updateDoc(userRef, productParams);
};
