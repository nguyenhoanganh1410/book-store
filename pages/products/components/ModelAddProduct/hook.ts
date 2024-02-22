import {
  CREATED_PRODUCT,
  FIELD_REQUIRED,
  MESSAGE_DELETED,
  MESSAGE_UNKNOWN_ERROR,
  MESSAGE_UPDATED,
  STRING_EMPTY,
} from '@/constants';
import { db } from '@/firebase';
import { addProduct, deleteProduct, updatedProduct } from '@/queries/products';
import { toastError, toastSuccess } from '@/utils';
import { PRODUCT_CATEGORY, PRODUCT_STATUS } from '@/utils/data';
import { Tables } from '@/utils/enums';
import { IAddProduct, ICategory, IProduct } from '@/utils/types';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().required(FIELD_REQUIRED),
  // price: Yup.string().required(FIELD_REQUIRED),
  price: Yup
  .number()
  .typeError('Vui lòng nhập một số') // Custom error message for non-numeric values
  .positive('Số tiền phải là một số dương') // Optional: Check if the number is positive
  .required('Vui lòng nhập số tiền'), // Required field
  status: Yup.string().required(FIELD_REQUIRED),
  category: Yup.string().required(FIELD_REQUIRED),
  quality: Yup
  .number()
  .typeError('Vui lòng nhập một số') // Custom error message for non-numeric values
  .positive('Số lượng phải là một số dương') // Optional: Check if the number is positive
  .required('Vui lòng nhập số lượng'), // Required field
});

const useModelAddProductHook = ({
  onClose,
  product,
}: {
  product?: IProduct;
  onClose: () => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagesInProduct, setImagesInProduct] = useState<string[]>(
    product && product.images ? product?.images : []
  );
  const [categories, setCategories] = useState<any[]>([]);

  const initialValues: IAddProduct = {
    name: product?.name || STRING_EMPTY,
    price: product?.price || 0,
    desc: product?.desc || STRING_EMPTY,
    status: product?.status || PRODUCT_STATUS[0].id,
    category: product?.category || STRING_EMPTY,
    quality: product?.quality || 1
  };

  const imageUrls = useMemo(() => {
    const images = files.map((file) => URL.createObjectURL(file));
    return [...imagesInProduct, ...images];
  }, [files, imagesInProduct]);

  const onSubmitForm = useCallback(
    async (values: IAddProduct) => {
      //TODO: ADD
      if (!product) {
        if (files.length === 0) {
          toastError('Hãy chọn ảnh cho sản phẩm!');
          return;
        }
        setLoading(true);
        try {
          const filesPromise = files.map((file) => onUploadFile(file));
          const uploadedUrls = await Promise.allSettled(filesPromise);
          const activeUrls = uploadedUrls
            .map((item) => {
              if (item.status === 'fulfilled') return item.value;
              return STRING_EMPTY;
            })
            .filter((item) => item !== STRING_EMPTY);

          const productParams: IAddProduct = {
            ...values,
            images: [...activeUrls],
          };

          await addProduct(productParams);
          toastSuccess(CREATED_PRODUCT);
          onClose && onClose();
        } catch (error) {
          console.error(error);
          toastError(MESSAGE_UNKNOWN_ERROR);
        } finally {
          setLoading(false);
        }
      } else {
        //TODO: UPDATED
        setLoading(true);
        try {
          const productParams = {
            ...values,
            price: +values.price
          };
          await updatedProduct(product.id, productParams);
          toastSuccess(MESSAGE_UPDATED);
          onClose && onClose();
        } catch (error) {
          console.error(error);
          toastError(MESSAGE_UNKNOWN_ERROR);
        } finally {
          setLoading(false);
        }
      }
    },
    [files, product]
  );

  const onUploadFile = useCallback(async (file: any) => {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${file.name}`);
    const responsive = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(responsive.ref);
    return downloadURL;
  }, []);

  const handleClickUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDeleteFile = useCallback(
    (fileIndex: number) => {
      const data = files.filter((val, index) => index !== fileIndex);
      setFiles(data);
    },
    [files]
  );

  const handleDeleteProduct = useCallback(async (productId: string) => {
    try {
      setLoading(true);
      await deleteProduct(productId);
      toastSuccess(MESSAGE_DELETED);
    } catch (error) {
      console.error(error);
      toastError(MESSAGE_UNKNOWN_ERROR);
    } finally {
      onClose && onClose();
      setLoading(false);
    }
  }, []);

  const handleOnchangeFiles = useCallback((e: any) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles([...fileList]);
    }
  }, []);

  const getProducts = useCallback(() => {
    try {
      const q = query(
        collection(db, Tables.categories),
        where('deleted', '==', false),
        orderBy('createdAt', 'desc'),
      );
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ICategory[];
        setCategories(data.map(val => {
          return {
            id: val.id,
            label: val.name
          }
        }));
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  return {
    imageUrls,
    loading,
    initialValues,
    fileInputRef,
    categories,
    handleDeleteProduct,
    handleDeleteFile,
    handleClickUpload,
    onSubmitForm,
    handleOnchangeFiles,
  };
};

export default useModelAddProductHook;
