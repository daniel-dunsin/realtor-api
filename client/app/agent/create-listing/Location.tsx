import { Input } from '@/app/lib/components/ui/InputElements/InputElements';
import React from 'react';
import ContentBox from '../dashboard/ContentBox';

const Location = () => {
  return (
    <ContentBox headersize={24} header='Location'>
      <div className='inputs-container'>
        <div>
          <label htmlFor='address'>Address</label>
          <Input type={'text'} id='address' />
        </div>

        <div
          className='field-flex'
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          <div>
            <label htmlFor='country'>Country</label>
            <Input type={'text'} id='country' />
          </div>

          <div>
            <label htmlFor='state'>State</label>
            <Input type={'text'} id='state' />
          </div>
        </div>

        <div
          className='field-flex'
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          <div>
            <label htmlFor='city'>City</label>
            <Input type={'text'} id='city' />
          </div>
          <div>
            <label htmlFor='zip'>Zip</label>
            <Input type={'number'} id='zip' />
          </div>
        </div>
      </div>
    </ContentBox>
  );
};

export default Location;
