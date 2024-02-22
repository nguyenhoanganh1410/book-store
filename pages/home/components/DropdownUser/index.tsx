import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAuthState } from '@/contexts/auth';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuthState();
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const { user, profile } = useAuthState();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='relative'>
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-2 cursor-pointer'
      >
        <div className='w-8 h-8 aspect-square relative rounded-full'>
          {user?.photoURL ? (
            <Image
              alt='Logo'
              src={user.photoURL}
              fill
              priority
              className='rounded-full'
            />
          ) : (
            <div className='uppercase w-full h-full bg-orangeLight rounded-full flex justify-center items-center'>
              <span className='text-white uppercase'>
                {profile?.firstName[0]}
              </span>
            </div>
          )}
        </div>
        <span className='hidden text-left lg:block'>
          <span className='block text-sm font-medium text-blackLight capitalize truncate w-24'>
            {user?.displayName || profile?.firstName + ' ' + profile?.lastName}
          </span>
          <span className='block text-xs font-normal text-grayLight capitalize'>
            Admin
          </span>
        </span>
      </div>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 shadow-xl flex-col rounded-sm border border-stroke bg-white ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <button
          onClick={() => logout()}
          className='flex items-center py-4 px-4 text-sm font-normal duration-300 ease-in-out hover:text-primary'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2'
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            ></path>
          </svg>
          <span className='ml-2'>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
