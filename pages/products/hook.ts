import { db } from '@/firebase';
import { Tables } from '@/utils/enums';
import { IProduct } from '@/utils/types';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

const useProductHook = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showModelAdd, setShowModelAdd] = useState<boolean>(false);

  const onOpenModelAdd = useCallback(() => {
    setShowModelAdd(true);
  }, []);

  const onCloseModelAdd = useCallback(() => {
    setShowModelAdd(false);
  }, []);

  const getProducts = useCallback(() => {
    try {
      const q = query(
        collection(db, Tables.products),
        where('deleted', '==', false),
        orderBy('createdAt', 'desc'),
      );
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IProduct[];
        setProducts(data);
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    //TODO: GET PRODUCTS
    getProducts()
  }, []);

  return { products, showModelAdd, onOpenModelAdd, onCloseModelAdd };
};

export default useProductHook;
