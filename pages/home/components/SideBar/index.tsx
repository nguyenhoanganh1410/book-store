import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  BarIcon,
  InviteFriend,
  LogoIcon,
  OverviewIcon,
  SettingsIcon,
} from '@/icons';
import { ROUTERS } from '@/constants';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 border border-l-gray-400 flex h-screen w-full max-w-[250px] flex-col overflow-y-hidden bg-white dark:bg-boxdark lg:static ease-in-out duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='flex h-[72px] items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
        <div className='flex items-center'>
          {/* <div onClick={() => setSidebarOpen(false)} className='cursor-pointer'>
            <BarIcon />
          </div> */}
          <div className='cursor-pointer mx-2.5'>
            <LogoIcon />
          </div>
          <span className='font-Inter font-bold text-[21px] text-blackLight'>
            The Hub
          </span>
        </div>
      </div>
      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        <nav className='mt-1 py-4 px-4 lg:px-6'>
          <div>
            <ul className='mb-6 flex flex-col gap-1.5'>
              {/* <li>
                <Link
                  href={ROUTERS.home}
                  className={`relative h-[52px]  rounded-xl font-Inter text-blackLight flex items-center font-medium text-base`}
                >
                  {pathname.includes('home') && (
                    <div className='bg-[#35B0A4] rounded-xl opacity-20 w-full left-0 top-0 h-[52px] gap-2.5 py-2 px-4'></div>
                  )}
                  <div className='absolute flex z-10 left-3 justify-center items-center'>
                    <OverviewIcon active={pathname.includes('home')} />
                    <span className='ml-3'>Tổng quan</span>
                  </div>
                </Link>
              </li> */}
              <li>
                <Link
                  href={ROUTERS.categories}
                  className={`relative h-[52px]  rounded-xl font-Inter text-blackLight flex items-center font-medium text-base`}
                >
                  {pathname.includes(ROUTERS.categories) && (
                    <div className='bg-[#35B0A4] rounded-xl opacity-20 w-full left-0 top-0 h-[52px] gap-2.5 py-2 px-4'></div>
                  )}
                 <div className='absolute flex z-10 left-3 justify-center items-center'>
                    <div className={`${!pathname.includes(ROUTERS.categories) ? 'bg-[#898989]' : 'bg-blueLight'} w-6 h-6 relative flex justify-between items-center rounded-full`}>
                      <SettingsIcon active={pathname.includes(ROUTERS.categories)} />
                    </div>
                    <span className='ml-3'>Danh mục</span>
                  </div>
                  <div className='absolute right-0'>
                    <ArrowLeftIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTERS.product}
                  className={`relative h-[52px]  rounded-xl font-Inter text-blackLight flex items-center font-medium text-base`}
                >
                  {pathname.includes(ROUTERS.product) && (
                    <div className='bg-[#35B0A4] rounded-xl opacity-20 w-full left-0 top-0 h-[52px] gap-2.5 py-2 px-4'></div>
                  )}
                 <div className='absolute flex z-10 left-3 justify-center items-center'>
                    <div className={`${!pathname.includes(ROUTERS.product) ? 'bg-[#898989]' : 'bg-blueLight'} w-6 h-6 relative flex justify-between items-center rounded-full`}>
                      <SettingsIcon active={pathname.includes(ROUTERS.product)} />
                    </div>
                    <span className='ml-3'>Sản phầm</span>
                  </div>
                  <div className='absolute right-0'>
                    <ArrowLeftIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTERS.orders}
                  className={`relative h-[52px]  rounded-xl font-Inter text-blackLight flex items-center font-medium text-base`}
                >
                  {pathname.includes('orders') && (
                    <div className='bg-[#35B0A4] rounded-xl opacity-20 w-full left-0 top-0 h-[52px] gap-2.5 py-2 px-4'></div>
                  )}
                 <div className='absolute flex z-10 left-3 justify-center items-center'>
                    <div className={`${!pathname.includes('orders') ? 'bg-[#898989]' : 'bg-blueLight'} w-6 h-6 relative flex justify-between items-center rounded-full`}>
                      <SettingsIcon active={pathname.includes('orders')} />
                    </div>
                    <span className='ml-3'>Đơn hàng</span>
                  </div>
                  <div className='absolute right-0'>
                    <ArrowLeftIcon />
                  </div>
                </Link>
              </li>
              {/* <li>
                <Link
                  href='settings'
                  className={`relative h-[52px]  rounded-xl font-Inter text-blackLight flex items-center font-medium text-base`}
                >
                  {pathname.includes('settings') && (
                    <div className='bg-[#35B0A4] rounded-xl opacity-20 w-full left-0 top-0 h-[52px] gap-2.5 py-2 px-4'></div>
                  )}
                 <div className='absolute flex z-10 left-3 justify-center items-center'>
                    <div className={`${!pathname.includes('settings') ? 'bg-[#898989]' : 'bg-blueLight'} w-6 h-6 relative flex justify-between items-center rounded-full`}>
                      <SettingsIcon active={pathname.includes('settings')} />
                    </div>
                    <span className='ml-3'>Cài đặt</span>
                  </div>
                  <div className='absolute right-0'>
                    <ArrowLeftIcon />
                  </div>
                </Link>
              </li> */}
            </ul>
          </div>
        </nav>
      </div>
      <div className='flex flex-col absolute px-6 bottom-6'>
        <p className='text-base mb-2 font-medium text-blackLight font-Inter'>Cần hỗ trợ?</p>
        <p className='text-sm font-normal text-[#898989]'>Liên hệ The HUB <br /> <Link href="#" className='font-normal text-sm underline cursor-pointer font-Inter text-orangeLight'>Liên hệ chúng tôi</Link></p>
      </div>
    </aside>
  );
};

export default Sidebar;
