'use client';
import React from 'react';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import Title from '../components/Title/Title';
import Location from './Location';
import CreateListing from './CreateListing';
import PropertyInfo from './PropertyInfo';

import './page.css';
import Media from './Media';
import { Button } from '@/app/lib/components/ui/Button/Button';

const NewListing = () => {
  return (
    <DashboardLayout>
      <Title title='Add New Property' />

      <section className='form-container'>
        <CreateListing />
        <Location />
        <PropertyInfo />
        <Media />

        <Button text='Create Listing' bg='pink' />
      </section>
    </DashboardLayout>
  );
};

export default NewListing;
