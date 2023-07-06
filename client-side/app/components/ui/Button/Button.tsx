import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
} from 'react';

import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  bg?: string;
  icon?: ReactElement;
}

export const Button = (props: ButtonProps) => {
  return (
    <button className={`custom-button bg-${props.bg}`} {...props}>
      {props?.icon && <i className='button-icon'>{props?.icon}</i>}

      {props.text}
    </button>
  );
};

export const RoundButton = (props: ButtonProps) => {
  return (
    <button className={`round-button bg-${props?.bg}`} {...props}>
      {props?.icon && <i className='button-icon'>{props?.icon}</i>}
      {props.text}
    </button>
  );
};
