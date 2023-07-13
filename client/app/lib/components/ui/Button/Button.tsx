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
  isLoading?: boolean;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={props.isLoading}
      className={`custom-button bg-${props.bg} ${props.className} ${
        props.isLoading && 'loading'
      }`}
    >
      {props.isLoading ? (
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

export const RoundButton = (props: ButtonProps) => {
  return (
    <button
      className={`round-button bg-${props?.bg} ${props.isLoading && 'loading'}`}
      disabled={props.isLoading}
      {...props}
    >
      {props?.isLoading ? (
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
