import SingleProperty from '@/app/lib/components/ui/SingleProperty/SingleProperty';
import React from 'react';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import Title from '../components/Title/Title';

import './page.css';

const Properties = () => {
  return (
    <DashboardLayout>
      <Title title='My Properties' />

      <div className='properties-container'>
        <SingleProperty />
        <SingleProperty />
        <SingleProperty />
        <SingleProperty />
        <SingleProperty />
        <SingleProperty />
        <SingleProperty />
      </div>
    </DashboardLayout>
  );
};

export default Properties;
