'use client';

import { RootState } from '@/app/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PriceRange,
  Select,
} from '../../ui/InputElements/InputElements';
import { BiMapPin } from 'react-icons/bi';

import './FilterBox.css';

const FilterBox = () => {
  const search = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  return (
    <div className='filter-box-container'>
      <div className='filter-box'>
        <Input placeholder='Enter keyword' />
        <Select options={[]} selected='' default='Property Type' />
        <Input placeholder='Location' icon={<BiMapPin />} />
        <PriceRange />
      </div>
    </div>
  );
};

export default FilterBox;
