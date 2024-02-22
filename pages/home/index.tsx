import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import withAuth from '@/components/AuthHOC';
import Button from '@/components/Button';
import useDashBoardHook from './hooks';
import CardItem from './components/CardItem';
import { IcSendIcon, IcTrendingUp, InviteFriend, WedgitIcon } from '@/icons';
import TableOne from './components/TableOne';
import MaketingComponent from './components/Maketing';
import { LoadingPage } from '@/components';
const ChartOne = dynamic(() => import('./components/Charts/ChartOne'), {
  ssr: false,
});
const ChartTwo = dynamic(() => import('./components/Charts/ChartTwo'), {
  ssr: false,
});
const ChartThree = dynamic(() => import('./components/Charts/ChartThree'), {
  ssr: false,
});

const DASHBOARD_CARDS = [
  {
    id: 'card_01',
    value: '9',
    title: 'Tổng sô đơn hàng trong tuần',
    progress: 90,
    progressColor: '#EE8062',
    icon: <InviteFriend active />,
  },
  {
    id: 'card_02',
    value: '2.000.000đ',
    title: 'Tổng doanh thu trong tuần',
    progress: 45,
    progressColor: '#7785DE',
    icon: <WedgitIcon />,
  },
  {
    id: 'card_03',
    value: '10.000.000đ',
    title: 'Tổng doang thu trong tháng',
    progress: 98,
    progressColor: '#01ADC7',
    icon: <IcTrendingUp />,
  },
  {
    id: 'card_04',
    value: '4',
    title: 'Tổng khách hàng mới trong tuần',
    progress: 45,
    progressColor: '#FAC76F',
    icon: <IcSendIcon />,
  },
];

const HomePage: NextPage = () => {
  const {
    link,
    sidebarOpen,
    profile,
    isCopied,
    tableData,
    marketingData,
    loading,
    handleNewLead,
    setSidebarOpen,
    onToggleSideBar,
    handleChangeLink,
    handleSearchLeads,
    handleCopy,
    onChangeTextSearch,
  } = useDashBoardHook();

  return (
    <div className='dark:bg-boxdark-2 dark:text-bodydark'>
      {loading && <LoadingPage />}
      <div className='flex h-screen overflow-hidden'>
        {/* {sidebarOpen && (
          <Sidebar sidebarOpen={true} setSidebarOpen={onToggleSideBar} />
        )} */}
        <Sidebar sidebarOpen={true} setSidebarOpen={onToggleSideBar} />
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          <Header
            onSearchLeads={handleSearchLeads}
            onChangeTextSearch={onChangeTextSearch}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={onToggleSideBar}
          />
          <main className='bg-[#F9F9F9] h-full'>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#F9F9F9]'>
              <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <div className='flex flex-col'>
                  <h1 className='text-2xl 2xl:text-4xl font-semibold font-Inter text-blackLight mb-2 capitalize'>
                    Chào {profile?.firstName + ' ' + profile?.lastName},
                  </h1>
                  <p className='font-Inter text-sm font-normal'>
                    Chào mừng quay trở lại với Food Hub!
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 mt-4 2xl:mt-8 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                {DASHBOARD_CARDS.map((item) => (
                  <CardItem
                    value={item.value}
                    title={item.title}
                    progress={item.progress}
                    key={item.id}
                    progressColor={item.progressColor}
                    chidrenIcon={item.icon}
                  />
                ))}
              </div>
              <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                {typeof window !== 'undefined' && <ChartOne />}
                {typeof window !== 'undefined' && <ChartTwo />}
                {typeof window !== 'undefined' && <ChartThree />}
              </div>
              <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mt-4'>
                <div className='col-span-12 xl:col-span-8'>
                  <TableOne data={tableData} />
                </div>
                <div className='col-span-12 xl:col-span-4'>
                  <MaketingComponent data={marketingData} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default withAuth(HomePage, 'all');
