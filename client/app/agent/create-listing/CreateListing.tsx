'use client';
import React from 'react';
import { propertyStatus, propertyTypes } from '@/app/lib/data';
import ContentBox from '../dashboard/ContentBox';
import {
  Input,
  Select,
  Textarea,
} from '@/app/lib/components/ui/InputElements/InputElements';

const CreateListing = () => {
  return (
    <ContentBox header='Create Listing' headersize={24}>
      <div className='inputs-container'>
        <div>
          <label htmlFor='title'>Property Title</label>
          <Input className='' id='title' />
        </div>

        <div>
          <label htmlFor='description'>Description</label>
          <Textarea />
        </div>
        <div
          className='field-flex'
          style={{ gridTemplateColumns: `repeat(3, 1fr)` }}
        >
          <div>
            <label htmlFor='type'>Type</label>
            <Select selected={''} options={propertyTypes} id='type' />
          </div>
          <div>
            <label htmlFor='status'>Status</label>
            <Select selected={''} options={propertyStatus} id='status' />
          </div>
          <div>
            <label htmlFor='price'>Price</label>
            <Input type={'number'} id='price' />
          </div>
        </div>
      </div>
    </ContentBox>
  );
};

export default CreateListing;
