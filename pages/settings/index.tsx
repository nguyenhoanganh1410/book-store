import { Container, LoadingPage } from '@/components';
import withAuth from '@/components/AuthHOC';
import { NextPage } from 'next';
import Sidebar from '../home/components/SideBar';
import useSettings from './hook';
import Header from '../home/components/Header';
import ModelChangePassword from './components/PopupChangePassword';
import ModelConfim from '@/components/ModelConfirm';

const Settings: NextPage = () => {
  const {
    profile,
    fullName,
    loading,
    showModelComfirm,
    showModelEmail,
    onCloseModelEmail,
    onChangeEmail,
    onUpdateEmail,
    onShowModelEmail,
    onCloseModelConfirm,
    onShowModelConfirm,
    onChangeFullName,
    handleUpdateInfo,
  } = useSettings();

  return (
    <Container headTitle='Settings Page'>
      {loading && <LoadingPage />}
      <div className='dark:bg-boxdark-2 dark:text-bodydark no-input'>
        <div className='flex h-screen overflow-hidden'>
          <Sidebar sidebarOpen={true} setSidebarOpen={() => {}} />
          <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            <Header sidebarOpen={true} setSidebarOpen={() => {}} />
            <main className='bg-[#F9F9F9] h-full p-8 2xl:p-16'>
              <div className='text-gray-800 text-xl 2xl:text-3xl font-bold font-Inter'>
                Your Account
              </div>
              <div className='flex flex-col'>
                <div className='w-full sm:w-[45%] 2xl:w-[686p] mt-12 h-[108px] flex-col justify-start items-start gap-[30px] inline-flex'>
                  <div className='w-full h-6 flex justify-between'>
                    <div className='text-gray-800 text-md 2xl:text-xl font-semibold font-Inter'>
                      Name
                    </div>
                    <div onClick={() => onShowModelConfirm()} className='text-right text-teal-500 text-md 2xl:text-xl font-semibold font-Inter cursor-pointer hover:opacity-80'>
                      UPDATE INFO
                    </div>
                  </div>
                  <div className='text-gray-800 pb-6 2xl:pb-8 text-md 2xl:text-xl font-normal font-Inter border-b border-stone-300 border-opacity-80 w-full'>
                    {/* {profile?.firstName + ' ' + profile?.lastName} */}
                    <input
                      type='text'
                      id='fullName'
                      className='  text-gray-900 text-sm rounded-lg border-none bg-transparent focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-0'
                      placeholder='John'
                      defaultValue={fullName}
                      onChange={(e) => onChangeFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className='w-full sm:w-[45%] 2xl:w-[686p] mt-12 h-[108px] flex-col justify-start items-start gap-[30px] inline-flex'>
                  <div className='w-full h-6 flex justify-between'>
                    <div className='text-gray-800 text-md 2xl:text-xl font-semibold font-Inter'>
                      Email
                    </div>
                    <div className='text-right text-teal-500 text-md 2xl:text-xl font-semibold font-Inter cursor-pointer hover:opacity-80'>
                      CHANGE EMAIL
                    </div>
                  </div>
                  <div className='text-gray-800 pb-6 2xl:pb-8 text-md 2xl:text-xl font-normal font-Inter border-b border-stone-300 border-opacity-80 w-full'>
                    <input
                      type='email'
                      id='email'
                      className='  text-gray-900 text-sm rounded-lg border-none bg-transparent focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-0'
                      placeholder='John@gmail.com'
                      defaultValue={profile?.email}
                      onChange={(e) => onChangeEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className='w-full sm:w-[45%] mt-12 h-[108px] flex-col justify-start items-start gap-[30px] inline-flex'>
                  <div className='w-full 2xl:w-[686px] h-6 flex justify-between'>
                    <div className='text-gray-800 text-md 2xl:text-xl font-semibold font-Inter'>
                      Password
                    </div>
                    <ModelChangePassword />
                    {/* <div className='text-right text-teal-500 text-md 2xl:text-xl font-semibold font-Inter cursor-pointer hover:opacity-80'>
                      CHANGE PASSWORD
                    </div> */}
                  </div>
                  <div className='text-gray-800 pb-6 2xl:pb-8 text-md 2xl:text-xl font-normal font-Inter border-b border-stone-300 border-opacity-80 w-full'>
                    <input
                      type='password'
                      id='password'
                      className='  text-gray-900 text-sm rounded-lg border-none bg-transparent focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-0'
                      placeholder='Password'
                      defaultValue='password'
                      required
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <ModelConfim
        isOpen={showModelComfirm}
        onCloseModel={onCloseModelConfirm}
        onOpenModel={onShowModelConfirm}
        onClickYes={handleUpdateInfo}
        title='Update Infomation'
        content='Do you want to update the information?'
      />
       <ModelConfim
        isOpen={showModelEmail}
        onCloseModel={onCloseModelEmail}
        onOpenModel={onShowModelEmail}
        onClickYes={onUpdateEmail}
        title='Update email'
        content='Do you want to update the Email?'
      />
    </Container>
  );
};

export default withAuth(Settings, 'all');
