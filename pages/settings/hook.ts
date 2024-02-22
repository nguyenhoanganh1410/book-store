import { useAuthState } from '@/contexts/auth';
import { updateUser } from '@/queries/users';
import { toastError, toastSuccess } from '@/utils';
import { useCallback, useEffect, useState } from 'react';

const useSettings = () => {
  const { profile, handleUpdateEmail } = useAuthState();
  const [showModelComfirm, setShowModelConfirm] = useState<boolean>(false);
  const [showModelEmail, setShowModelEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(
    profile?.firstName + ' ' + profile?.lastName
  );
  const [email, setEmail] = useState<string>('');

  const onShowModelConfirm = useCallback(() => {
    setShowModelConfirm(true);
  }, []);

  const onCloseModelConfirm = useCallback(() => {
    setShowModelConfirm(false);
  }, []);

  const onShowModelEmail = useCallback(() => {
    setShowModelEmail(true);
  }, []);

  const onCloseModelEmail = useCallback(() => {
    setShowModelEmail(false);
  }, []);

  const onChangeFullName = useCallback(
    (value: string) => {
      setFullName(value);
    },
    [fullName]
  );

  const onChangeEmail = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handleUpdateInfo = useCallback(async () => {
    if (!profile || loading) return;
    try {
      setLoading(true);
      const dataParams = {
        firstName: fullName,
        lastName: '',
      };
      await updateUser(profile?.uid, dataParams);
      toastSuccess('Updated name successfully!');
    } catch (error) {
      console.error(error);
      toastError('Something with wrong, please try again!');
    } finally {
      onCloseModelConfirm();
      setLoading(false);
    }
  }, [fullName]);

  const onUpdateEmail = useCallback(() => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      toastError('Valid email address!');
      return;
    }

    handleUpdateEmail(email)

  }, [email]);

  useEffect(() => {
    if (profile) setEmail(profile.email);
  }, [profile]);

  return {
    profile,
    fullName,
    loading,
    email,
    showModelComfirm,
    onChangeEmail,
    showModelEmail,
    onUpdateEmail,
    onShowModelEmail,
    onCloseModelEmail,
    handleUpdateInfo,
    onShowModelConfirm,
    onCloseModelConfirm,
    onChangeFullName,
  };
};
export default useSettings;
