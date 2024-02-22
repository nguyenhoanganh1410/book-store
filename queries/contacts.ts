import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { IContactData } from './type';
import { db } from '@/firebase';
import { Tables } from '@/utils/enums';

export const getContactByReferralId = async (
  referralId: string
): Promise<IContactData[]> => {
  let q = query(
    collection(db, Tables.contacts),
    where('referralId', '==', referralId),
    orderBy('createAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => {
    return {
      id: it.id,
      ...it.data(),
    };
  }) as IContactData[];
};
