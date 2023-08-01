import React from 'react';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import Title from '../components/Title/Title';

import './page.css';
import SingleListing from './SingleListing';

const Listings = () => {
  return (
    <DashboardLayout>
      <Title title='My Listings' />

      <div className='listings-container'>
        <table className='table'>
          <thead>
            <th>Listing Title</th>
            <th>Date Published</th>
            <th>Status</th>
            <th>View</th>
            <th>Action</th>
          </thead>

          <SingleListing />
          <SingleListing />
          <SingleListing />
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Listings;
