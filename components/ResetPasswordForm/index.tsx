import { Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import Input from '../Input';
import { useResetPasswordHooks } from './hooks';
import { FIELD_REQUIRED } from '@/constants';

interface IProps {}

const ResetPasswordForm: FC<IProps> = ({}) => {
  const {
    inititalValues,
    showPassword,
    onSubmitForm,
    onToggleShowPassword,
    onGotoSignUp,
  } = useResetPasswordHooks();
  return (
    <div className='flex flex-col justify-center items-center lg:max-w-sm w-full h-full'>
      <div className='w-[90%] lg:w-auto flex flex-col justify-center items-center'>
        <div className='d-flex flex-col items-start w-full md:w-[370px]'>
          <p className={`text-2xl text-left font-medium text-gray20`}>
            New Password
          </p>
          <p className='text-sm font-normal mt-2'>
            Please create a new password that you don’t use on any other site.
          </p>
        </div>
        <Formik
          validationSchema={ResetPasswordSchema}
          initialValues={inititalValues}
          validateOnMount={false}
          onSubmit={onSubmitForm}
        >
          {(props) => (
            <form
              onSubmit={props.handleSubmit}
              className='mt-2 2xl:mt-6 w-full md:w-[370px]'
            >
              <div className='flex mt-2 flex-row justify-center items-center relative'>
                <Input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  placeholder='Create new password'
                  onToggleShowPassword={onToggleShowPassword}
                  passwordField
                  showPassword={showPassword}
                />
              </div>
              <div className='flex mt-4 flex-row justify-center items-center relative'>
                <Input
                  name='confirmPassword'
                  type={showPassword ? 'text' : 'password'}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.confirmPassword}
                  placeholder='Confirm new password'
                  onToggleShowPassword={onToggleShowPassword}
                  passwordField
                  showPassword={showPassword}
                />
              </div>
              <button
                type='submit'
                className='mt-6 w-full bg-orangeLight rounded-lg h-12'
              >
                <p className='text-base font-medium text-white font-Poppins'>
                  Gửi
                </p>
              </button>
              <p className='text-sm font-normal text-gray20 text-center mt-4 cursor-pointer'>
                Just remember?{' '}
                <span
                  onClick={onGotoSignUp}
                  className='text-orangeLight font-semibold cursor-pointer'
                >
                  Đăng nhập
                </span>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required(FIELD_REQUIRED)
    .min(8, 'Password at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

export default ResetPasswordForm;
