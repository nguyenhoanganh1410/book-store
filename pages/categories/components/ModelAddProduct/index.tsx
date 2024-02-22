import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Formik } from 'formik';
import useModelAddProductHook, { productSchema } from './hook';
import Input from '@/components/Input';
import { PRODUCT_CATEGORY, PRODUCT_STATUS } from '@/utils/data';
import Image from 'next/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingPage } from '@/components';
import { ICategory, IProduct } from '@/utils/types';
interface IProps {
  open: boolean;
  product?: ICategory;
  onClose: () => void;
}
const ModelAddProduct = ({ open, product, onClose }: IProps) => {
  const {
    imageUrls,
    loading,
    fileInputRef,
    initialValues,
    handleDeleteProduct,
    handleDeleteFile,
    handleClickUpload,
    onSubmitForm,
    handleOnchangeFiles,
  } = useModelAddProductHook({ product, onClose });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      onClose && onClose();
    };

  return (
    <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
      {loading && <LoadingPage />}
      <Box
        role='presentation'
        // onClick={toggleDrawer(false)}
        // onKeyDown={toggleDrawer(false)}
      >
        <Formik
          validationSchema={productSchema}
          initialValues={initialValues}
          validateOnMount={false}
          onSubmit={onSubmitForm}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className='p-10 min-w-[588px]'>
              <p className='text-base font-semibold'>Thêm Danh Mục</p>
              <div className='grid grid-cols-2 gap-4 mt-6'>
                <div className='flex flex-row justify-center items-start relative'>
                  <Input
                    name='name'
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    placeholder='Đồ dùng học tập'
                    label='Tên danh mục'
                  />
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='flex flex-wrap gap-4 w-full overflow-auto max-w-md my-4'>
                  {imageUrls &&
                    imageUrls.map((url, index) => {
                      return (
                        <div
                          title='Ấn để xoá'
                          key={url}
                          onClick={() => handleDeleteFile(index)}
                          className='relative cursor-pointer overflow-hidden w-32 h-32 rounded-xl border border-gray-600'
                        >
                          <div className='cursor-pointer w-full h-full flex-col relative justify-end items-start flex rounded-xl transition ease-in-out delay-75 hover:scale-105 overflow-auto hover:shadow-3xl duration-300'>
                            <Image
                              alt='Logo'
                              src={url}
                              fill
                              className='object-cover w-full rounded-xl h-full'
                              priority
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
                <input
                  onChange={handleOnchangeFiles}
                  hidden
                  accept='image/*'
                  type='file'
                  id='files'
                  name='files'
                  multiple
                  ref={fileInputRef}
                />
                <button
                  onClick={handleClickUpload}
                  type='button'
                  className='w-40 border-2 border-gray-700 rounded-lg h-10 2xl:h-12 hover:opacity-75 flex items-center gap-2 justify-center'
                >
                  <CloudUploadIcon />
                  <p className='text-sm font-semibold text-gray-800'>
                    Thêm ảnh
                  </p>
                </button>
              </div>

              <div className='flex flex-row justify-center items-start relative w-full mt-6'>
                <Input
                  name='desc'
                  typeElement='textArea'
                  type='text'
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.desc}
                  label='Miêu tả'
                  placeholder='Nhập miêu tả...'
                />
              </div>
              {product ? (
                <div className='flex gap-4 justify-end'>
                  <button
                    type='submit'
                    className='mt-6 w-full max-w-[144px] bg-blue-600 rounded-lg h-10 2xl:h-12 hover:opacity-75'
                  >
                    <p className='text-sm font-semibold text-white'>Lưu</p>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    type='button'
                    className='mt-6 w-full bg-red-500  max-w-[144px] rounded-lg h-10 2xl:h-12 hover:opacity-75'
                  >
                    <p className='text-sm font-semibold text-white'>Xoá</p>
                  </button>
                </div>
              ) : (
                <button
                  type='submit'
                  className='mt-6 w-full bg-colorFF5276 rounded-lg h-10 2xl:h-12 hover:opacity-75'
                >
                  <p className='text-sm font-semibold text-white'>Lưu</p>
                </button>
              )}
            </form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};

export default ModelAddProduct;
