'use client';

import { RootState } from '@/app/lib/redux/store';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PriceRange,
  Select,
} from '../../ui/InputElements/InputElements';
import { BiDotsVertical, BiMapPin } from 'react-icons/bi';

import './FilterBox.css';
import { Button } from '../../ui/Button/Button';
import Amenities from '../Amenities/Amenities';
import { editSearch } from '@/app/lib/redux/slices/searchSlice';
import { propertyTypes } from '@/app/lib/data';

const FilterBox = () => {
  const search = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const [amenitiesOpen, setAmenitiesOpen] = useState<boolean>(false);

  const toggleAmenities = () => setAmenitiesOpen(!amenitiesOpen);

  const edit = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(editSearch({ key: e.target.name, value: e.target.value }));
  };

  return (
    <div className='filter-box-container'>
      <div className='filter-box'>
        <Input
          placeholder='Enter keyword'
          value={search.keyword}
          name='keyword'
          onChange={edit}
        />

        <Select
          options={propertyTypes}
          selected={search.propertyType || ''}
          value={search.propertyType || 'Property Type'}
          default='Property Type'
          onChange={edit}
          name='propertyType'
        />

        <Input
          placeholder='Location'
          value={search.location}
          name='location'
          onChange={edit}
          icon={<BiMapPin />}
        />

        <PriceRange />

        <div className='advanced-container'>
          <i onClick={toggleAmenities}>
            <BiDotsVertical />
          </i>

          <Button
            bg='pink'
            text='Select Amenities'
            className='select-amenities'
            onClick={toggleAmenities}
          />

          {amenitiesOpen && <Amenities />}
        </div>

        <Button bg='pink' text='Search' />
      </div>
    </div>
  );
};

export default FilterBox;
