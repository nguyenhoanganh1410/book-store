import React, { FC } from 'react';

interface IButton {
  text: string;
  type?: any;
  customStyle?: string;
  onClick?: (event?: any) => void;
}

const Button: FC<IButton> = ({ text, type, onClick, customStyle }) => {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={`w-full bg-orangeLight hover:opacity-80 rounded-lg px-2 h-10 2xl:h-12 ${customStyle || ''}`}
    >
      <p className='text-sm font-semibold text-white'>{text}</p>
    </button>
  );
};

export default Button;
