import { ERROR_SOMTHING_WENT_WRONG, FIELD_REQUIRED, MESSAGE, ROUTERS } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { addLead } from '@/queries/leads';
import { toastError, toastSuccess } from '@/utils';
import { ILead } from '@/utils/types';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

export const inititalValues: ILead = {
  name: '',
  phone: '',
};

export const leadSchema = Yup.object().shape({
  name: Yup.string().required(FIELD_REQUIRED),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number can only contain digits')
    .min(10, 'Phone number must have at least 10 digits')
    .max(15, 'Phone number cannot have more than 15 digits')
    .required('Phone number is required'),
});

const useNewLeadHook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { profile } = useAuthState();

  const onSubmitForm = useCallback(async (values: ILead) => {
    if (loading && !profile) return;
    try {
      setLoading(true);
      await addLead({...values, userId: profile?.uid});
      toastSuccess(MESSAGE.addedNewLead);
      router.push(ROUTERS.home);
    } catch (error) {
      console.error(error);
      toastError(ERROR_SOMTHING_WENT_WRONG);
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    loading,
    onSubmitForm,
  };
};

export default useNewLeadHook;
