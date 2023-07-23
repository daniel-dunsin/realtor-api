import { IAmenities } from '@/app/lib/interfaces/constants.types';
import { editSearch } from '@/app/lib/redux/slices/searchSlice';
import { RootState } from '@/app/lib/redux/store';
import React, {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  SelectHTMLAttributes,
  useState,
} from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import './InputElements.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
}

export const Input = (props: InputProps) => {
  return (
    <div className={`custom-input-container`}>
      <input {...props} className='custom-input' />
      {props.icon && <i>{props.icon}</i>}
    </div>
  );
};

export interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  height?: number;
}

export const Textarea = (props: TextareaProps) => {
  return (
    <div className={`custom-input-container`}>
      <textarea
        {...props}
        style={{ height: props.height || '150px' }}
        className='custom-input'
      />
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
            <option value={props.default} disabled>
              {props.default}
            </option>
          )}
        </>

        {props.options.map((option, index: number) => {
          return (
            <option value={option} key={index}>
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

  const { price } = useSelector((state: RootState) => state.search);

  const dispatch = useDispatch();

  const editPrice = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(editSearch({ key: 'price', value: e.target.value }));

  return (
    <div className='custom-price'>
      <div className='custom-input price-container' onClick={toggleSelector}>
        <p>{props.value || 'Price'}</p>
        <i>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</i>
      </div>

      <div className={`price-selector ${isOpen && 'isOpen'}`}>
        <div className='selector-container'>
          <header>
            <p>$100</p>

            <p>$20000</p>
          </header>

          <p>{price}</p>

          <input
            type='range'
            value={price}
            onChange={editPrice}
            min={100}
            max={20000}
            step={10}
          />
        </div>
      </div>
    </div>
  );
};
