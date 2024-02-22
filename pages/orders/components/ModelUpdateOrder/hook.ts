import { MESSAGE_UNKNOWN_ERROR } from '@/constants';
import { deleteOrder, updateOrder } from '@/queries/orders';
import { toastError, toastSuccess } from '@/utils';
import { useCallback, useState } from 'react';

const useModelUpdateOrderHook = (onClose: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteOrder = useCallback(async (orderId: string) => {
    try {
      setLoading(true);
      await deleteOrder(orderId);
      toastSuccess('Xoá đơn hàng thành công!');
    } catch (error) {
      console.error(error);
      toastError(MESSAGE_UNKNOWN_ERROR);
    } finally {
      onClose && onClose();
      setLoading(false);
    }
  }, []);

  const handleUpdateOrder = useCallback( async (orderId: string, status: string) => {
    try {
      setLoading(true);
      await updateOrder(orderId, { status});
      toastSuccess('Cập nhật đơn hàng thành công!');
    } catch (error) {
      console.error(error);
      toastError(MESSAGE_UNKNOWN_ERROR);
    } finally {
      onClose && onClose();
      setLoading(false);
    }
  }, []);

  return {
    loading,
    handleUpdateOrder,
    handleDeleteOrder,
  };
};

export default useModelUpdateOrderHook;
