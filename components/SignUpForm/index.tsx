import { Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { ErrorMessageForm, PasswordStrengthMeter } from '..';
import { useSignUpFormHooks } from './hooks';
import Input from '../Input';
import { FIELD_REQUIRED } from '@/constants';

interface IProps {}

const SignUpForm: FC<IProps> = () => {
  const { inititalValues, showPassword, onSubmitForm, onToggleShowPassword, setValidPassword } =
    useSignUpFormHooks();

  return (
    <div className='flex flex-col justify-center items-center max-w-sm w-full pb-8'>
      <div>
        <p className={`text-2xl text-left font-semibold text-gray20`}>Sign Up</p>
        <div className='mt-4 2xl:mt-8 w-[320px] 2xl:w-[370px]'>
          <Formik
            validationSchema={SignInSchema}
            initialValues={inititalValues}
            validateOnMount={false}
            onSubmit={onSubmitForm}
          >
            {(props) => {
              return (
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

                  <div className='grid grid-cols-2 gap-6 mt-4 2xl:mt-8 justify-center items-center relative'>
                    <div>
                      <Input
                        name='firstName'
                        type='text'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.firstName}
                        placeholder='First name'
                      />
                    </div>
                    <div>
                      <Input
                        name='lastName'
                        type='text'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lastName}
                        placeholder='Last name'
                      />
                    </div>
                  </div>
                  <div className='flex mt-4 2xl:mt-6 flex-row justify-center items-center relative'>
                    <Input
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                      placeholder='Password'
                      passwordField
                      onToggleShowPassword={onToggleShowPassword}
                      showPassword={showPassword}
                    />
                  </div>

                  {!props.errors.password &&
                    props.values.password.length > 0 && (
                      <PasswordStrengthMeter onChange={setValidPassword} password={props.values.password} />
                    )}
                  <button
                    type='submit'
                    className='mt-6 w-full bg-orangeLight rounded-lg h-10 2xl:h-12'
                  >
                    <p className='text-xs 2xl:text-sm font-semibold text-white'>Sign Up</p>
                  </button>
                  
                  {/* <div className='flex justify-between items-center py-6'>
                    <div className='h-[1px] flex-grow max-w-[166px] bg-[#DCDCDC]'></div>
                    <span className='text-sm text-[#898989] font-normal py-3'>
                      or
                    </span>
                    <div className='h-[1px] flex-grow max-w-[166px]  bg-[#DCDCDC]'></div>
                  </div>
                  <div className='grid grid-cols-2 gap-6'>
                    <button
                      type='button'
                      // onClick={onLoginWithGoogle}
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
                      //onClick={onLoginWithGoogle}
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
                  <div className='flex mt-6 flex-col'>
                    <div>
                      <input
                        id='policy'
                        name='policy'
                        type='checkbox'
                        onChange={props.handleChange}
                        checked={props.values.policy}
                        className='h-4 w-4 rounded border-gray-300 text-indigo-orangeLight focus:ring-orangeLight'
                        style={{ color: '#EE8062' }}
                      />
                      <label
                        htmlFor='policy'
                        className='font-normal text-xs text-[#898989] ml-2'
                      >
                        By clicking Create account, I agree that I have read and
                        accepted the Terms of Use and Privacy Policy.
                      </label>
                    </div>
                    <ErrorMessageForm name='policy' />
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const SignInSchema = Yup.object().shape({
  firstName: Yup.string().required(FIELD_REQUIRED),
  lastName: Yup.string().required(FIELD_REQUIRED),
  email: Yup.string().email('Invalid email').required(FIELD_REQUIRED),
  password: Yup.string().required(FIELD_REQUIRED),
  policy: Yup.bool().oneOf(
    [true],
    'You need to accept the terms and conditions'
  ),
});

export default SignUpForm;
