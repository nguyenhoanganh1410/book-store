import React, { FC } from 'react';
import ErrorMessageForm from '../ErrorMessageForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';

type InputType = 'input' | 'select' | 'textArea';
interface IProps {
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: any;
  onBlur?: any;
  onToggleShowPassword?: any;
  showPassword?: boolean;
  passwordField?: boolean;
  typeElement?: InputType;
  label?: string;
  selectData?: { id: string; label: string }[];
  hideMessage?: boolean
}

const Input: FC<IProps> = ({
  name,
  onBlur,
  onChange,
  type,
  placeholder,
  value,
  onToggleShowPassword,
  showPassword,
  passwordField,
  typeElement = 'input',
  label,
  selectData,
  hideMessage
}) => {
  return (
    <div className='flex flex-col w-full items-start relative'>
      {typeElement === 'select' && (
        <>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            {label}
          </label>
          <select
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
             <option value=''>Hãy chọn 1 mục</option>
            {selectData?.map((item) => (
              <option value={item.id}>{item.label}</option>
            ))}
          </select>
        </>
      )}
      {typeElement === 'textArea' && (
        <>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            {label}
          </label>
          <textarea
            onChange={onChange}
            name={name}
            onBlur={onBlur}
            value={value}
            rows={5}
            placeholder={placeholder}
            // className='resize-x rounded-md w-full'
            className={`w-full resize-x bg-white rounded-lg border border-slate-200 text-[#898989] placeholder:text-slate-500 lg:placeholder:text-accent text-sm font-normal`}
          ></textarea>
        </>
      )}
      {typeElement === 'input' && (
        <>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            {label}
          </label>
          <input
            className={`w-full h-11 2xl:h-12 bg-white rounded-lg border border-slate-200 text-[#898989] placeholder:text-slate-500 lg:placeholder:text-accent text-sm font-normal`}
            name={name}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
          />
        </>
      )}
      {passwordField && (
        <FontAwesomeIcon
          onClick={onToggleShowPassword}
          icon={showPassword ? ['far', 'eye'] : ['far', 'eye-slash']}
          className={`text-gray20  absolute right-4 cursor-pointer top-4`}
        />
      )}
    {!hideMessage && <ErrorMessageForm name={name} />}
    </div>
  );
};

export default Input;
