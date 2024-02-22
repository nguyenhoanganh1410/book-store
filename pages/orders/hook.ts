import { db } from '@/firebase';
import { IOrder } from '@/utils/types';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

const useOrderHooks = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getOrders = useCallback(() => {
    try {
      const q = query(
        collection(db, 'orders'),
        where('deleted', '==', false),
        orderBy('createdAt', 'desc')
      );
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt:
            moment(doc.data().createdAt?.toDate()).format('MM-DD-YYYY') +
            ' ' +
            moment(doc.data().createdAt?.toDate()).format('LTS'),
        })) as any;
        setOrders(data);
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, []);

  return {
    orders,
  };
};

export default useOrderHooks;
