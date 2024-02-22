import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Input from '@/components/Input';
import {
  ORDER_STATUS_DATA,
} from '@/utils/data';
import useModelUpdateOrderHook from './hook';
import { formatVND } from '@/utils';
import { LoadingPage } from '@/components';
import { IOrder } from '@/utils/types';

interface IProps {
  open: boolean;
  order?: IOrder;
  onClose: () => void;
}
const ModelUpdateOrder = ({ open, order, onClose }: IProps) => {
  const { loading, handleDeleteOrder, handleUpdateOrder } = useModelUpdateOrderHook(onClose);

  const [status, setStatus] = React.useState<string>(order?.status || '')
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
        <div className='p-6 w-[468px] bg-[#F9F9F9] h-[100vh] relative'>
          <p className='text-3xl font-bold mb-10'>Thông tin đơn hàng</p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <span className='block text-base font-medium text-gray-800 capitalize'>
                Mã đơn hàng
              </span>
              <span className='block text-base font-normal  text-gray-800 capitalize'>
                {order?.id}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='block text-base font-medium  text-gray-800 capitalize'>
                Khách hàng
              </span>
              <span className='block text-base font-normal  text-gray-800 capitalize'>
                {order?.fullName}
              </span>
            </div>

            <div className='flex flex-col'>
              <span className='block text-base font-medium  text-gray-800 capitalize'>
                Địa chỉ
              </span>
              <span className='block text-base font-normal  text-gray-800 capitalize'>
                {order?.address}
              </span>
            </div>

            <div className='flex flex-col'>
              <span className='block text-base font-medium  text-gray-800 capitalize'>
                Số điện thoại
              </span>
              <span className='block text-base font-normal  text-gray-800 capitalize'>
                {order?.phone}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='block text-base font-medium  text-gray-800 capitalize'>
                Ngày đặt
              </span>
              <span className='block text-base font-normal  text-gray-800 capitalize'>
                {order?.createdAt}
              </span>
            </div>

            <div className='flex flex-col'>
              <span className='block text-base font-medium  text-gray-800 capitalize'>
                Email
              </span>
              <span className='block text-base font-normal  text-gray-800 capitalize'>
                {order?.email}
              </span>
            </div>

            <Input
              name='status'
              typeElement='select'
              //   onChange={() => {}}
              //   onBlur={() => {}}
              value={status}
              onChange={((e: any) => setStatus(e.target.value))}
              label='Trạng thái'
              hideMessage={true}
              selectData={ORDER_STATUS_DATA}
            />
          </div>
          <div className='flex flex-col mt-8'>
            <span className='block text-xl font-medium  text-gray-800 capitalize mb-4'>
              Sản phẩm
            </span>
            <table className='table-fixed'>
              <thead>
                <tr>
                  <th className='text-left'> Mã SP</th>
                  <th  className='text-left'>Tên SP</th>
                  <th  className='text-left'>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {order?.products.map((product) => {
                  return (
                    <tr className='text-left'>
                      <td className='truncate'>{product.productId}</td>
                      <td className='truncate'>{product.productName}</td>
                      <td>{product.quality}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='flex justify-between items-center mt-8'>
            <span className='block text-base font-medium  text-gray-800 capitalize'>
              Tổng tiền
            </span>
            <span className='block text-lg font-bold  text-gray-800 capitalize'>
              {formatVND(order?.total || 0)}
            </span>
          </div>

          <div className='flex gap-4 justify-end absolute bottom-6 right-6'>
            <button
              onClick={() => handleUpdateOrder(order?.id || '', status)}
              type='submit'
              className='mt-6 w-[144px] bg-blue-600 rounded-lg h-10 2xl:h-12 hover:opacity-75'
            >
              <p className='text-sm font-semibold text-white'>Lưu</p>
            </button>
            <button
              onClick={() => handleDeleteOrder(order?.id || '')}
              type='button'
              className='mt-6 bg-red-500 w-[144px] rounded-lg h-10 2xl:h-12 hover:opacity-75'
            >
              <p className='text-sm font-semibold text-white'>Xoá</p>
            </button>
          </div>
        </div>
      </Box>
    </Drawer>
  );
};

export default ModelUpdateOrder;
