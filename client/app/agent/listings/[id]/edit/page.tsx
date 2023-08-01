'use client';

import DashboardLayout from '@/app/agent/components/DashboardLayout/DashboardLayout';
import Title from '@/app/agent/components/Title/Title';
import CreateListing from '@/app/agent/create-listing/CreateListing';
import Location from '@/app/agent/create-listing/Location';
import Media from '@/app/agent/create-listing/Media';
import PropertyInfo from '@/app/agent/create-listing/PropertyInfo';
import { Button } from '@/app/lib/components/ui/Button/Button';
import React from 'react';

import '../../../create-listing/page.css';

const EditListing = () => {
  return (
    <DashboardLayout>
      <Title title='Edit Property' />

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

export default EditListing;
