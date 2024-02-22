import { Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { useLoginFormHooks } from './hooks';
import Image from 'next/image';
import Input from '../Input';
import { FIELD_REQUIRED } from '@/constants';

interface IProps {}

const LoginForm: FC<IProps> = ({}) => {
  const {
    initialValues,
    initialResetPasswordValues,
    showPassword,
    isRequestingResetPassword,
    onSubmitForm,
    onToggleShowPassword,
    onForgotPassword,
    onSubmitResetPasswordForm,
    onCloseResetPasswordForm,
    onGotoSignUp,
  } = useLoginFormHooks();

  return (
    <div className='flex flex-col justify-center items-center lg:max-w-sm w-full h-full'>
      {!isRequestingResetPassword && (
        <p className='text-[#000] font-Inter text-[25px] italic font-semibold pb-10'>
          BOOK HUB
        </p>
      )}
      <div className='w-[90%] lg:w-auto flex flex-col justify-center items-center'>
        <div className='d-flex flex-col items-start w-full sm:max-w-[370px]'>
          <p
            className={`text-2xl text- w-full font-semibold font-Inter text-gray20`}
          >
            {isRequestingResetPassword ? 'Quên mật khẩu?' : 'Đăng nhập'}
          </p>
          {isRequestingResetPassword && (
            <p className='text-sm font-normal mt-2'>
              Đừng lo lắng! Hãy nhập email để lấy lại mật khẩu
            </p>
          )}
        </div>
        {isRequestingResetPassword ? (
          <Formik
            validationSchema={ResetPasswordSchema}
            initialValues={initialResetPasswordValues}
            validateOnMount={false}
            onSubmit={onSubmitResetPasswordForm}
          >
            {(props) => (
              <form
                onSubmit={props.handleSubmit}
                className='mt-4 2xl:mt-8 w-full md:w-[370px]'
              >
                <div className='flex mt-2 flex-row justify-center items-center relative'>
                  <Input
                    name='email'
                    type='email'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    placeholder='Email address'
                  />
                </div>
                <button
                  type='submit'
                  className='mt-6 w-full bg-colorFF5276 rounded-lg h-10 2xl:h-12 hover:opacity-75'
                >
                  <p className='text-xs xl:text-sm capitalize text-white font-Inter font-semibold'>
                    Gửi yêu cầu
                  </p>
                </button>
                <p className='text-xs 2xl:text-sm font-normal text-gray20 text-center mt-4 cursor-pointer'>
                  Just remember?{' '}
                  <span
                    onClick={onGotoSignUp}
                    className='text-colorFF5276 font-semibold cursor-pointer hover:opacity-75'
                  >
                    Đăng nhập
                  </span>
                </p>
              </form>
            )}
          </Formik>
        ) : (
          <div className='mt-4 2xl:mt-8 w-full md:w-[370px]'>
            <Formik
              validationSchema={SignInSchema}
              initialValues={initialValues}
              validateOnMount={false}
              onSubmit={onSubmitForm}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className='flex mt-4 2xl:mt-8 flex-row justify-center items-center relative'>
                    <Input
                      name='email'
                      type='email'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      placeholder='Email address'
                    />
                  </div>
                  <div className='flex mt-6 flex-row justify-center items-center relative'>
                    <Input
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                      placeholder='Password'
                      onToggleShowPassword={onToggleShowPassword}
                      passwordField
                      showPassword={showPassword}
                    />
                  </div>
                  <div
                    onClick={onForgotPassword}
                    className='text-neutral-800 text-sm font-normal font-Inter cursor-pointer hover:text-orangeLight mt-6'
                  >
                    Quên mật khẩu?
                  </div>
                  <button
                    type='submit'
                    className='mt-6 w-full bg-colorFF5276 rounded-lg h-10 2xl:h-12 hover:opacity-75'
                  >
                    <p className='text-sm font-semibold text-white'>Đăng nhập</p>
                  </button>
                  {/* <div className='flex justify-between items-center py-6'>
                    <div className='h-[1px] flex-grow max-w-[166px] bg-[#DCDCDC]'></div>
                    <span className='text-sm text-[#898989] font-normal py-3'>
                      or
                    </span>
                    <div className='h-[1px] flex-grow max-w-[166px]  bg-[#DCDCDC]'></div>
                  </div> */}
                  {/* <div className='grid grid-cols-2 gap-6'>
                    <button
                      type='button'
                      onClick={onLoginWithGoogle}
                      className='hover:shadow-lg w-full h-12 border-2 border-slate-200 rounded-lg mb-4 bg-transparent flex flex-row justify-center items-center'
                    >
                      <div className='w-[16px] h-[16px] aspect-square relative mr-1 mb-[1px]'>
                        <Image
                          alt='Logo'
                          src='/images/google-icon.png'
                          fill
                          priority
                        />
                      </div>
                      <span className='text-sm font-semibold text-[#202020]'>
                        Google
                      </span>
                    </button>
                    <button
                      type='button'
                      onClick={onLoginWithFaceBook}
                      className='hover:shadow-lg w-full h-12 border-2 border-slate-200 rounded-lg mb-4 bg-transparent flex flex-row justify-center items-center'
                    >
                      <div className='w-[20px] h-[20px] aspect-square relative mr-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          height='16'
                          width='16'
                          viewBox='0 0 512 512'
                          className='fill-blue-600 mt-[1px]'
                        >
                          <path d='M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z' />
                        </svg>
                      </div>
                      <span className='text-sm font-semibold text-[#202020]'>
                        Facebok
                      </span>
                    </button>
                  </div> */}
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required(FIELD_REQUIRED),
  password: Yup.string()
    .required(FIELD_REQUIRED)
    .min(8, 'Password at least 8 characters'),
});

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required(FIELD_REQUIRED),
});

export default LoginForm;
