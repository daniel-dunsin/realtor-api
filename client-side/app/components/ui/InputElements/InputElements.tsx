import { IAmenities } from '@/app/interfaces/constants.types';
import React, {
  InputHTMLAttributes,
  ReactElement,
  SelectHTMLAttributes,
  useState,
} from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import './InputElements.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
}

export const Input = (props: InputProps) => {
  return (
    <div className='custom-input-container'>
      <input {...props} className='custom-input' />
      {props.icon && <i>{props.icon}</i>}
    </div>
  );
};

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[] | IAmenities[];
  selected: string | IAmenities;
  default?: string;
}

export const Select = (props: SelectProps) => {
  return (
    <div className='select-container'>
      <select className='custom-select' {...props}>
        <>
          {props.default && (
            <option
              value={props.default}
              selected={
                props.selected === props.default || props.selected === ''
              }
              disabled
            >
              {props.default}
            </option>
          )}
        </>

        {props.options.map((option, index: number) => {
          return (
            <option
              value={option}
              selected={props.selected === option}
              key={index}
            >
              {option}
            </option>
          );
        })}
      </select>

      <i>
        <FiChevronDown />
      </i>
    </div>
  );
};

export const PriceRange = (props: InputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSelector = () => setIsOpen(!isOpen);

  return (
    <div className='custom-price'>
      <div className='custom-input price-container' onClick={toggleSelector}>
        <p>{props.value || 'Price'}</p>
        <i>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</i>
      </div>

      <div className={`price-selector ${isOpen && 'isOpen'}`}>
        <div className='selector-container'>
          <header>
            <p>$10000</p>

            <p>$20000</p>
          </header>

          <input type='range' />
        </div>
      </div>
    </div>
  );
};
