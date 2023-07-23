import {
  Input,
  Select,
} from '@/app/lib/components/ui/InputElements/InputElements';
import { amenitiesList, sizeSuffix } from '@/app/lib/data';
import React from 'react';
import ContentBox from '../dashboard/ContentBox';

const getYears = (): string[] => {
  const year = [];

  const current_year = new Date().getFullYear();

  for (let i = current_year - 12; i <= current_year; i++) {
    year.push(i.toString());
  }

  return year;
};

const PropertyInfo = () => {
  const years = getYears();

  return (
    <ContentBox header='Detailed Information' headersize={24}>
      <div className='inputs-container'>
        <div
          className='field-flex'
          style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
        >
          <div>
            <label htmlFor='area-size'>Area Size</label>
            <Input type={'number'} id='area-size' />
          </div>
          <div>
            <label htmlFor='dize-suffix'>Size Suffix</label>
            <Select options={sizeSuffix} selected='' id='size-suffix' />
          </div>
          <div>
            <label htmlFor='bedrooms'>Bedrooms</label>
            <Select
              selected=''
              options={['1', '2', '3', '4', '5', '6', '7', '8']}
              id='bedrooms'
            />
          </div>
          <div>
            <label htmlFor='bathrooms'>Bathrooms</label>
            <Select
              selected=''
              options={['1', '2', '3', '4', '5', '6', '7', '8']}
              id='bathrooms'
            />
          </div>

          <div>
            <label htmlFor='garages'>Garages</label>
            <Select
              selected=''
              options={['1', '2', '3', '4', '5', '6', '7', '8']}
              id='garages'
            />
          </div>

          <div>
            <label htmlFor='garages-size'>Garages Size</label>
            <Input type={'number'} id='garages-size' />
          </div>

          <div>
            <label htmlFor='year-built'>Year Built</label>
            <Select selected='' options={years} id='year-built' />
          </div>
        </div>

        <div>
          <label htmlFor=''>Amenities</label>
          <div className='amenities-container'>
            {amenitiesList?.map((amenity, index: number) => {
              return (
                <div className='' key={index}>
                  <input type='checkbox' id={amenity} value={amenity} />
                  <label htmlFor={amenity}>{amenity}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ContentBox>
  );
};

export default PropertyInfo;
