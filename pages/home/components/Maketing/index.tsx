import { DownloadIcon, ThreeDots } from '@/icons';
import { IDashBoardMarketingData } from '@/utils/types/dashboard';
interface IProps {
  data?: IDashBoardMarketingData[];
}

const MaketingComponent = ({ data }: IProps) => {
  return (
    <div className='rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 sm:px-7.5'>
      <div className='mb-3 justify-between gap-4 flex'>
        <div>
          <h2 className='text-2xl font-Inter font-semibold text-blackLight'>
            Marketing Material
          </h2>
          <h5 className='text-sm font-Inter font-normal text-blackLight mt-2'>
            Download & share to close more deals!
          </h5>
        </div>
        <div>
          <span className='cursor-pointer'>
            <ThreeDots />
          </span>
        </div>
      </div>
      <div className='flex flex-col mt-4'>
        {data?.length == 0 && (
          <p className='text-sm text-blackLight font-normal text-center py-2 capitalize'>
            No data found!
          </p>
        )}
        {data?.map((item) => {
          return (
            <div
              className='flex items-center mb-4 cursor-pointer hover:opacity-70'
              key={item.id}
            >
              <DownloadIcon />
              <p className='text-xs font-normal text-blackLight ml-1'>
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaketingComponent;
