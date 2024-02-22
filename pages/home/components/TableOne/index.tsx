import { ThreeDots } from '@/icons';
import { IDashBoardTableData } from '@/utils/types/dashboard';

interface IProps {
  data: IDashBoardTableData[];
}

const TableOne = ({ data }: IProps) => {
  return (
    <div className='rounded-xl border border-stroke bg-white px-5 py-3 2xl:pt-6 pb-2.5 xl:pb-1'>
      <div className='mb-3 justify-between gap-4 flex'>
        <div>
          <h2 className='text-2xl font-Inter font-semibold text-blackLight'>
            Danh sách khách hàng thân thiết
          </h2>
          {/* <h5 className='text-sm font-Inter font-normal text-blackLight mt-2'>
            This month
          </h5> */}
        </div>
        <div>
          <span className='cursor-pointer'>
            <ThreeDots />
          </span>
        </div>
      </div>
      <div className='flex flex-col overflow-auto'>
        <div className='grid rounded-sm bg-gray-2 grid-cols-12 overflow-auto'>
          <div className='p-2.5 2xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>No</h5>
          </div>
          <div className='p-2.5 text-center 2xl:p-5 col-span-3'>
            <h5 className='text-sm font-medium uppercase text-left xsm:text-base'>
              Tên Khách hàng
            </h5>
          </div>
          <div className='p-2.5 text-center 2xl:p-5 col-span-2 pl-0'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>
              Số điện thoại
            </h5>
          </div>

          <div className=' p-2.5 text-center sm:block col-span-2 2xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>
              Email
            </h5>
          </div>
          <div className=' p-2.5 text-center sm:block 2xl:p-5 col-span-3'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>
              Tổng số đơn
            </h5>
          </div>
        </div>
        {data?.length == 0 && (
          <p className='text-sm text-blackLight font-normal text-center py-2 capitalize'>
            Không tìm thấy dữ liệu!
          </p>
        )}
        <div className='max-h-40 overflow-auto'>
          {data?.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`grid overflow-auto cursor-pointer border-b border-stroke dark:border-strokedark grid-cols-12 ${
                  index === data.length - 1 ? 'border-none' : ''
                }`}
              >
                <div className='flex items-center justify-center col-span-1'>
                  <p className='text-blackLight text-xs font-normal font-Inter text-left'>
                    {index + 1}.
                  </p>
                </div>
                <div className='flex items-center gap-3 p-2.5 col-span-3 2xl:p-5'>
                  <div className='hidden sm:flex w-10 h-10 relative'>
                    <div className='uppercase w-full h-full bg-orangeLight rounded-full flex justify-center items-center'>
                      <span className='text-white uppercase'>
                        {item.clientName.length > 0 ? item.clientName[0] : 'A'}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col items-start'>
                    <p className=' text-sm font-medium font-Inter text-blackLight sm:block capitalize md:max-w-[75px] 2xl:max-w-[100px] truncate'>
                      {item.clientName}
                    </p>
                    <p className=' text-sm font-medium font-Inter text-[#35B0A4] sm:block'>
                      {item.price}
                    </p>
                  </div>
                </div>

                <div className='flex items-center justify-center p-2.5 2xl:p-5 col-span-2'>
                  <p className='text-blackLight text-xs font-normal font-Inter text-center'>
                    {item.status}
                  </p>
                </div>

                <div className=' items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-2'>
                  <p className='text-blackLight text-xs font-normal font-Inter'>
                    {(item.payout as string) || '...'}
                  </p>
                </div>

                <div className=' items-center justify-center p-2.5 sm:flex 2xl:p-5 col-span-3'>
                  <p className='text-meta-5 cursor-pointer hover:opacity-60 text-blackLight text-xs font-normal font-Inter'>
                  {(item.phone as string) || '...'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableOne;
