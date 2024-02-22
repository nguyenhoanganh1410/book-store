import {
  CREATED_CATEGORY,
  CREATED_PRODUCT,
  FIELD_REQUIRED,
  MESSAGE_DELETED,
  MESSAGE_UNKNOWN_ERROR,
  MESSAGE_UPDATED,
  STRING_EMPTY,
} from '@/constants';
import { addCategory, deleteCategory, updateCategory } from '@/queries/categories';
import { addProduct, deleteProduct, updatedProduct } from '@/queries/products';
import { toastError, toastSuccess } from '@/utils';
import { PRODUCT_CATEGORY, PRODUCT_STATUS } from '@/utils/data';
import { IAddCategory, IAddProduct, ICategory, IProduct } from '@/utils/types';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useCallback, useMemo, useRef, useState } from 'react';
import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().required(FIELD_REQUIRED),
});

const useModelAddProductHook = ({
  onClose,
  product,
}: {
  product?: ICategory;
  onClose: () => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagesInProduct, setImagesInProduct] = useState<string[]>(
    product && product.images ? product?.images : []
  );

  const initialValues: IAddCategory = {
    name: product?.name || STRING_EMPTY,
    desc: product?.desc || STRING_EMPTY,
  };

  const imageUrls = useMemo(() => {
    const images = files.map((file) => URL.createObjectURL(file));
    return [...imagesInProduct, ...images];
  }, [files, imagesInProduct]);

  const onSubmitForm = useCallback(
    async (values: IAddCategory) => {
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

          const productParams: IAddCategory = {
            ...values,
            images: [...activeUrls],
          };

          await addCategory(productParams);
          toastSuccess(CREATED_CATEGORY);
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
          };
          await updateCategory(product.id, productParams);
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
      await deleteCategory(productId);
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

  return {
    imageUrls,
    loading,
    initialValues,
    fileInputRef,
    handleDeleteProduct,
    handleDeleteFile,
    handleClickUpload,
    onSubmitForm,
    handleOnchangeFiles,
  };
};

export default useModelAddProductHook;
