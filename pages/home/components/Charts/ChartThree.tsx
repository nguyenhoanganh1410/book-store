import { ThreeDots } from '@/icons';
// import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options: any = {
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  stroke: {
    width: [2, 2],
    curve: 'smooth',
  },
  colors: ['#00C3AB'],
  xaxis: {
    type: 'category',
    axisBorder: {
      show: false,
    },
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    // height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 120,
        },
      },
    },
  ],
};

interface ChartThreeState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [
      {
        name: 'Series 1',
        data: [45, 46, 42, 47, 48, 49, 50, 49, 47, 45, 47, 49, 54, 54, 45, 46],
      },
    ],
  });

  return (
    <div className='col-span-12 rounded-xl border border-stroke bg-white p-8 pb-0 xl:col-span-4'>
      <div className='justify-between sm:flex'>
        <div>
          <h2 className='text-2xl font-Inter font-semibold text-blackLight'>
            Commission Earned
          </h2>
          <div className='pt-2'>
            <p className='text-2xl font-Inter font-semibold text-blackLight'>
              $2,250.00
            </p>
            <p className='text-sm font-Inter font-normal text-blackLight'>
              March 2020
            </p>
          </div>
        </div>

        <span className='cursor-pointer'>
          <ThreeDots />
        </span>
      </div>

      <div id='chartTwo' className='-ml-5 -mb-9'>
        {typeof window !== 'undefined' && (
          <ReactApexChart
            options={options}
            series={state.series}
            type='area'
            height={200}
          />
        )}
      </div>
    </div>
  );
};

export default ChartThree;
