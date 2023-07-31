import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import { BiLoader } from 'react-icons/bi';

import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  bg?: string;
  icon?: ReactElement;
  isloading?: boolean;
}

export const Button = ({ isloading, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isloading}
      className={`custom-button bg-${props.bg} ${props.className} ${
        isloading && 'loading'
      }`}
    >
      {isloading ? (
        <>
          <BiLoader />
        </>
      ) : (
        <>
          {props?.icon && <i className='button-icon'>{props?.icon}</i>}

          {props.text}
        </>
      )}
    </button>
  );
};

export const RoundButton = ({ isloading, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`round-button bg-${props?.bg} ${isloading && 'loading'} ${
        props.className
      }`}
      disabled={isloading}
    >
      {isloading ? (
        <>
          <BiLoader />
        </>
      ) : (
        <>
          {' '}
          {props?.icon && <i className='button-icon'>{props?.icon}</i>}
          {props.text}
        </>
      )}
    </button>
  );
};
