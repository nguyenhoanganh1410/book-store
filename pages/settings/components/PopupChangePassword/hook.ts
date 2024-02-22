import { FIELD_REQUIRED } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { toastError, toastSuccess } from '@/utils';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

interface IPassword {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}
export const initialValues: IPassword = {
  password: '',
  confirmPassword: '',
  currentPassword: '',
};

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required(FIELD_REQUIRED)
    .min(8, 'Password at least 8 characters'),
  currentPassword: Yup.string()
    .required(FIELD_REQUIRED)
    .min(8, 'Password at least 8 characters'),
  confirmPassword: Yup.string()
    .required(FIELD_REQUIRED)
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

const useChangePassword = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { onUpdatePassword } = useAuthState();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onSubmit = useCallback(async (values: IPassword) => {
    try {
      setLoading(true);
      await onUpdatePassword(values.currentPassword, values.password);
      toastSuccess('Upadted password successfully!');
      closeModal();
    } catch (error) {
      console.log(error);
      toastError('The current password is incorrect!');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    isOpen,
    showPassword,
    loading,
    setIsOpen,
    closeModal,
    openModal,
    onSubmit,
    onToggleShowPassword,
  };
};

export default useChangePassword;
