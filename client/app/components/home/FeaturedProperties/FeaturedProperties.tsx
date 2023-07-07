import React from 'react';
import SingleProperty from '../../ui/SingleProperty/SingleProperty';
import Title from '../../ui/Title/Title';

import './FeaturedProperties.css';

const FeaturedProperties = () => {
  return (
    <section className='container'>
      <div>
        <Title
          title='Featured Properties'
          subtitle='Handpicked properties by our team'
          align='center'
        />

        <div className='grid-container'>
          <SingleProperty />
          <SingleProperty />
          <SingleProperty />
          <SingleProperty />
          <SingleProperty />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
