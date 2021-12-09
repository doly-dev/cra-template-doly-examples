import * as React from 'react';
import classname from 'classnames';

interface Props {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ label, disabled = false, ...otherProps }) => {
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={classname(
        'px-4 py-2 leading-5 font-medium hover:bg-orange-500 text-gray-50 bg-gray-600 select-none focus:outline-none focus:shadow-outline',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {label}
    </button>
  );
};

export default Button;
