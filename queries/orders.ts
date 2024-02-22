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
import { OrderStatus, Tables } from '@/utils/enums';
import { IAddProduct, IOrder, IProduct } from '@/utils/types';
import moment from 'moment';

export const addProduct = async (product: IAddProduct) => {
  const commentDocument = await addDoc(collection(db, Tables.products), {
    name: product.name,
    price: +product.price,
    status: product.status,
    category: product.category,
    desc: product.desc,
    images: product.images,
    createdAt: Timestamp.now(),
    deleted: false,
  });
  return commentDocument;
};

export const getOrders = async (status?: OrderStatus): Promise<IOrder[]> => {
  let q;
  if (status) {
    q = query(
      collection(db, Tables.orders),
      where('deleted', '==', false),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
  } else {
    q = query(
      collection(db, Tables.orders),
      where('deleted', '==', false),
      orderBy('createdAt', 'desc')
    );
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
    createdAt:
      moment(it.data().createdAt?.toDate()).format('MM-DD-YYYY') +
      ' ' +
      moment(it.data().createdAt?.toDate()).format('LTS'),
  })) as IOrder[];
};

export const deleteOrder = async (orderId: string) => {
  const userRef = doc(db, Tables.orders, orderId);
  return await updateDoc(userRef, { deleted: true });
};

export const updateOrder = async (orderId: string, productParams: any) => {
  const userRef = doc(db, Tables.orders, orderId);
  return await updateDoc(userRef, productParams);
};
