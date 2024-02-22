import { LOCAL_STORAGE_KEYS, ROUTERS } from '@/constants';
import { useAuthState } from '@/contexts/auth';
import { IResetPasswordFormValues, ISignInFormValues } from '@/queries/type';
import { setItemLocalStorage } from '@/utils';
import { FormikProps } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

interface IProps {}

export const useLoginFormHooks = () => {
  const router = useRouter();
  const {
    sendForgotPassword,
    loginWithEmail,
    loginWithGoogle,
    loginFacebook,
    loading,
  } = useAuthState();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRequestingResetPassword, setRequestingResetPassword] =
    useState<boolean>(false);
  const initialValues: ISignInFormValues = {
    email: '',
    password: '',
    rememberMe: false,
  };
  const initialResetPasswordValues: IResetPasswordFormValues = {
    email: '',
  };

  const onClickSignUp = useCallback(() => {
    router.replace(ROUTERS.signup);
  }, [router]);

  const onSubmitForm = useCallback(async (values: ISignInFormValues) => {
    try {
      values.rememberMe &&
        setItemLocalStorage(
          LOCAL_STORAGE_KEYS.rememberMe,
          values.rememberMe + ''
        );
      loginWithEmail(values.email, values.password);
    } catch (error) {
      //@ts-ignore
      toastError(error.message);
    }
  }, []);

  const onSubmitResetPasswordForm = useCallback(
    async (values: IResetPasswordFormValues) => {
      try {
        await sendForgotPassword(values.email);
      } catch (error) {
        //@ts-ignore
        toastError(error.message);
      } finally {
        onCloseResetPasswordForm();
      }
    },
    []
  );

  const onResetValueEmail = useCallback(
    (props: FormikProps<ISignInFormValues>) => () => {
      props.setFieldValue('email', '');
    },
    []
  );

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onForgotPassword = useCallback(() => {
    try {
      setRequestingResetPassword(true);
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  const onCloseResetPasswordForm = useCallback(() => {
    setRequestingResetPassword(false);
  }, []);

  const onGotoSignUp = useCallback(() => {
    onCloseResetPasswordForm();
  }, []);

  const onLoginWithGoogle = useCallback(() => {
    loginWithGoogle();
  }, []);

  const onLoginWithFaceBook = useCallback(() => {
    loginFacebook();
  }, []);

  return {
    router,
    initialValues,
    initialResetPasswordValues,
    loading,
    showPassword,
    isRequestingResetPassword,
    onClickSignUp,
    onSubmitForm,
    onResetValueEmail,
    onToggleShowPassword,
    onForgotPassword,
    onSubmitResetPasswordForm,
    onCloseResetPasswordForm,
    onLoginWithGoogle,
    onGotoSignUp,
    onLoginWithFaceBook,
  };
};
