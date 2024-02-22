import { Container, LoadingPage } from '@/components';
import withAuth from '@/components/AuthHOC';
import { NextPage } from 'next';
import Sidebar from '../home/components/SideBar';
import Header from '../home/components/Header';
import TableOrders from './components/TableOrders';
import useOrderHooks from './hook';

const ProductsPage: NextPage = () => {
  const { orders } = useOrderHooks();
  return (
    <Container headTitle='Settings Page'>
      {/* {loading && <LoadingPage />} */}
      <div className='no-input'>
        <div className='flex h-screen overflow-hidden'>
          <Sidebar sidebarOpen={true} setSidebarOpen={() => {}} />
          <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            <Header sidebarOpen={true} setSidebarOpen={() => {}} />
            <main className='bg-[#F9F9F9] h-full p-8 2xl:p-16'>
              <div className='flex justify-between w-full'>
                <div className='text-gray-800 text-xl 2xl:text-3xl font-bold font-Inter'>
                  Đơn hàng
                </div>
                {/* <Button variant='contained'>Thêm Sản Phẩm</Button> */}
              </div>
              <div className='flex flex-col mt-8'>
                <TableOrders orders={orders} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default withAuth(ProductsPage, 'all');
