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
import { IAddCategory, IAddProduct, ICategory, IProduct } from '@/utils/types';

export const addCategory = async (product: IAddCategory) => {
  const commentDocument = await addDoc(collection(db, Tables.categories), {
    name: product.name,
    desc: product.desc,
    images: product.images,
    createdAt: Timestamp.now(),
    deleted: false,
  });
  return commentDocument;
};

export const getCategories = async (
  _limit?: number
): Promise<ICategory[]> => {
  const q = query(
    collection(db, Tables.categories),
    where('deleted', '==', false),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  })) as ICategory[];
};

export const deleteCategory = async (productId: string) => {
  const userRef = doc(db, Tables.categories, productId);
  return await updateDoc(userRef, {deleted: true});
};

export const updateCategory = async (productId: string, productParams: any) => {
  const userRef = doc(db, Tables.categories, productId);
  return await updateDoc(userRef, productParams);
};
