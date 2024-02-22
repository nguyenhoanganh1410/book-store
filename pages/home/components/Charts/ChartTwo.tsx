import { ThreeDots } from '@/icons';
// import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options: any = {
  colors: ['#EE8062'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    // height: 235,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartTwo: React.FC = () => {
  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Value',
        data: [44, 55, 41, 67, 22, 43, 65],
      },
    ],
  });

  return (
    <div className='col-span-12 rounded-xl border border-stroke bg-white p-8 xl:col-span-4'>
      <div className='mb-4 justify-between gap-4 sm:flex'>
        <div>
          <h2 className='text-2xl font-Inter font-semibold text-blackLight'>
            Income Amounts
          </h2>
        </div>
        <div>
          <span className='cursor-pointer'>
            <ThreeDots />
          </span>
        </div>
      </div>

      <div>
        <div id='chartTwo' className='-ml-5 -mb-9'>
          {typeof window !== 'undefined' && (
            <ReactApexChart
              options={options}
              series={state.series}
              type='bar'
              height={180}
            />
          )}
        </div>
      </div>
      <div className='flex justify-between items-center mt-6'>
        <div className='flex flex-col'>
          <p className='text-sm font-normal text-blackLight'>Taget</p>
          <p className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2 10.667L8 4.66699L14 10.667H2Z'
                fill='#01ADC7'
              />
            </svg>
            <span className='text-[#01ADC7] text-sm font-medium ml-1'>841</span>
          </p>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm font-normal text-blackLight'>Last Week</p>
          <p className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2 4.66699L8 10.667L14 4.66699H2Z'
                fill='#7785DE'
              />
            </svg>
            <span className='text-[#01ADC7] text-sm font-medium ml-1'>841</span>
          </p>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm font-normal text-blackLight'>Last Month</p>
          <p className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2 10.667L8 4.66699L14 10.667H2Z'
                fill='#01ADC7'
              />
            </svg>
            <span className='text-[#01ADC7] text-sm font-medium ml-1'>841</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
