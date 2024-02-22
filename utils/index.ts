import { ERROR_CODE_FIREBASE } from '@/constants';
import { FirebaseError } from 'firebase/app';
import { toast, ToastOptions } from 'react-toastify';

//Toast Notification
export const toastConfig: ToastOptions = {
  position: 'bottom-left',
  autoClose: 3000,
  theme: 'light',
  hideProgressBar: true,
};

export const toastError = (message: string) => {
  toast.error(message);
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};

export const toastInfo = (message: string) => {
  toast.info(message);
};

export const toastWarning = (message: string) => {
  toast.warning(message);
};

//Local Storage
export const getItemLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key);
  return value;
};

export const setItemLocalStorage = (key: string, value: string) => {
  if (key && value) {
    window.localStorage.setItem(key, value);
  }
};

export const removeItemLocalStorage = (key: string) => {
  if (key) {
    window.localStorage.removeItem(key);
  }
};

export const removeAllLocalStorage = () => {
  window.localStorage.clear();
};

export const formatNumberWithCommas = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const showErrorMessageFirebase = (error: FirebaseError) => {
  const code = error.code as keyof typeof ERROR_CODE_FIREBASE;
  const errorMessage = ERROR_CODE_FIREBASE[code];
  toastError(errorMessage || 'Something went wrong please try again later!');
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber
    .replace(/\D+/g, '')
    .replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
};

export const formatVND = (money: number) => {
  const data = money
    .toString()
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ',') + prev;
    });

  return data + ' ' + 'đ';
};
