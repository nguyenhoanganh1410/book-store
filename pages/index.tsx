import { Container, LoginForm } from '@/components';
import withAuth from '@/components/AuthHOC';
import { StarCircleIcon } from '@/icons';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SignInPage: NextPage = () => {
  const route = useRouter();

  return (
    <Container headTitle='Sign In'>
      <div className='relative h-full grow flex flex-row'>
        <div className='w-full flex flex-row z-10'>
          <div className='w-[30%] relative max-x-[500px] flex-col h-full items-center bg-white hidden lg:flex '>
            <div className='w-full h-full aspect-square relative'>
              <Image
                alt='Logo'
                src='/images/book_store.jpeg'
                className='object-cover'
                fill
                priority
              />
            </div>
            <div className='w-64 h-[67px] bg-whiteColor opacity-90 absolute top-0 left-0 flex justify-center items-center'>
              <p className='text-[25px] font-bold'>BOOK HUB</p>
            </div>
          </div>
          <div className='relative w-full lg:w-[70%] h-full flex flex-col justify-center items-center bg-whiteColor p-5 2xl:p-10'>
            <div className='flex justify-between w-full'>
              <div className='flex flex-col sm:flex-row relative justify-center items-center text-xl md:text-2xl text-green font-normal'>
                <div className='flex'>
                  <p className='font-Poppins text-colorFF5276 font-normal'>
                    Good
                  </p>
                  <p className='font-bold text-[25px] font-Poppins text-colorFF5276'>
                    Book
                  </p>
                </div>
                <div className='relative'>
                  <p className='font-semibold text-[25px] font-Poppins text-[#4B4039]'>
                    Hub
                  </p>
                  <div className='absolute -right-[2px] top-1'>
                    <StarCircleIcon />
                  </div>
                </div>
              </div>
            </div>
            <LoginForm />

            <p className='max-w-[370px] text-xs font-normal text-[#898989]'>
              Được bảo vệ bởi reCAPTCHA và tuân theo{' '}
              <span className='cursor-pointer text-[#4B4039]'>
                Chính sách quyền riêng tư{' '}
              </span>{' '}
              và{' '}
              <span className='text-[#4B4039] cursor-pointer'>
                {' '}
                Điều khoản dịch vụ{' '}
              </span>
              của Food Hub.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default withAuth(SignInPage, 'auth');
