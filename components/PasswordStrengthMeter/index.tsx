import React from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({
  password,
  onChange,
}: {
  password: string;
  onChange?: (state: boolean) => void;
}) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        onChange && onChange(false);
        return 'Very weak';
      case 1:
        onChange && onChange(false);
        return 'Weak';
      case 2:
        onChange && onChange(true);
        return 'Fear';
      case 3:
        onChange && onChange(true);
        return 'Good';
      case 4:
        onChange && onChange(true);
        return 'Strong';
      default:
        return '';
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#70B6C1';
      case 4:
        return '#70B6C1';
      default:
        return 'none';
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '4px',
  });

  return (
    <React.Fragment>
      <div className='w-full bg-gray-200 rounded-md h-1 mt-2'>
        <div style={changePasswordColor()} className='rounded-md'></div>
      </div>
      <div className='flex justify-between items-center mt-1'>
        {(testResult.score == 4 || testResult.score == 3) && (
          <p className='text-xs text-[#898989] font-normal'>
            Your password is great. Nice work!
          </p>
        )}
        <div className='flex justify-end flex-grow'>
          <p
            className='text-sm font-medium text-right'
            style={{ color: funcProgressColor() }}
          >
            {createPassLabel()}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PasswordStrengthMeter;
