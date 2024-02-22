import { Container, SignUpForm } from '@/components';
import withAuth from '@/components/AuthHOC';
import { StarCircleIcon } from '@/icons';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SignUpClientPage: NextPage = () => {
  const route = useRouter();

  return (
    <Container headTitle='Sign Up'>
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
            <p className='text-2xl 2xl:text-4xl font-semibold text-[#FFF] absolute bottom-4 max-w-[370px] z-10 xl:mb-20'>
              TheHCM.org Referral Partners
            </p>
            <div className='w-64 h-[67px] bg-whiteColor opacity-90 absolute top-0 left-0 flex justify-center items-center'>
              <p className='text-[25px] font-bold'>REFERRAL HUB</p>
            </div>
          </div>
          <div className='relative w-full lg:w-[70%] h-full flex flex-col justify-between items-center bg-whiteColor p-5 2xl::p-10'>
            <div className='flex justify-between w-full'>
              <div className='flex flex-col sm:flex-row relative justify-center items-center text-xl md:text-2xl text-green font-normal'>
                <div className='flex'>
                  <p className='font-Poppins text-orangeLight font-normal'>
                    Health
                  </p>
                  <p className='font-bold text-[25px] font-Poppins text-orangeLight'>
                    care
                  </p>
                </div>
                <div className='relative'>
                  <p className='font-semibold text-[25px] font-Poppins text-[#4B4039]'>
                    Marketplace
                  </p>
                  <div className='absolute -right-[2px] top-1'>
                    <StarCircleIcon />
                  </div>
                </div>
              </div>
              <div className="text-right text-neutral-800 text-sm font-normal font-Inter max-w-[40%] md:max-w-none">
                Already have an account?{' '}
                <span
                  onClick={() => route.push('/')}
                  className='cursor-pointer text-orangeLight text-sm font-semibold ml-1'
                >
                  Sign In
                </span>
              </div>
            </div>
            <SignUpForm />
            <p className='max-w-[370px] text-xs font-normal'>
              Protected by reCAPTCHA and subject to the Rhombus{' '}
              <span className='cursor-pointer text-orangeLight'>
                Privacy Policy{' '}
              </span>{' '}
              and{' '}
              <span className='text-orangeLight cursor-pointer'>
                {' '}
                Terms of Service
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default withAuth(SignUpClientPage, 'auth');
