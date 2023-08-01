import React from 'react';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import Title from '../components/Title/Title';
import ContentBox from '../dashboard/ContentBox';

import './page.css';
import SingleReview from './SingleReview';

const MyReviews = () => {
  return (
    <DashboardLayout>
      <Title title="Visitor's reviews" />

      <ContentBox header='Reviews'>
        <div className='reviews-container'>
          <SingleReview />
          <hr />
          <SingleReview />
        </div>
      </ContentBox>
    </DashboardLayout>
  );
};

export default MyReviews;
