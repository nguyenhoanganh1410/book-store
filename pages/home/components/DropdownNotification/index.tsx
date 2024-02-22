import Link from 'next/link';
import useNotificationHook from './hook';

const DropdownNotification = () => {
  const { dropdown, dropdownOpen, trigger, notifications, setDropdownOpen } = useNotificationHook();
  return (
    <li className='relative'>
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='relative flex h-6 w-6 items-center cursor-pointer justify-center rounded-full hover:text-primary'
      >
        <span className='absolute right-[2px] top-[2px] flex h-2 w-2'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-2 w-2 bg-sky-500'></span>
        </span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='25'
          viewBox='0 0 25 25'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.5 23C13.6 23 14.5 22.1 14.5 21H10.5C10.5 22.1 11.4 23 12.5 23ZM19 17V11.5C19 8.43 16.87 5.86 14 5.18V4.5C14 3.67 13.33 3 12.5 3C11.67 3 11 3.67 11 4.5V5.18C8.13 5.86 6 8.43 6 11.5V17L4 19V20H21V19L19 17Z'
            fill='#898989'
          />
        </svg>
      </div>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute mt-2.5 flex h-90 w-60 flex-col rounded-md border border-stroke bg-white shadow-xl -right-4 md:right-0 md:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className='px-4.5 py-3'>
          <h5 className='text-sm font-bold text-bodydark2 px-3 font-Inter'>
            Notification
          </h5>
        </div>

        <ul className='flex h-auto flex-col overflow-y-auto'>
          <li>
            <Link
              className='flex flex-col gap-2.5 border-t border-stroke px-4.5 py-5 px-3 font-Inter'
              href='#'
            >
              <p className='text-xs font-Inter text-center'>You have no notifications.</p>
              <p className='font-Inter text-center text-xs'>
                Notifications will appear here when you get 'em.
              </p>
            </Link>
          </li>
          {notifications.map((value) => {
            return (
              <li>
                <Link
                  className='flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 px-3 font-Inter'
                  href='#'
                >
                  <p className='text-sm font-Inter'>
                    <span className='text-black dark:text-white'>
                      Edit your information in a swipe
                    </span>
                    Sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim.
                  </p>

                  <p className='text-xs font-Inter'>12 May, 2025</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
