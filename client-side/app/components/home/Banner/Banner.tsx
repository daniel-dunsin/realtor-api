import React from 'react';
import { Button } from '../../ui/Button/Button';
import Navbar from '../../ui/Navbar/Navbar';
import FilterBox from '../FilterBox/FilterBox';
import './Banner.css';

const Banner = () => {
  return (
    <>
      <header className='banner-header'>
        <Navbar />

        <div className='banner-container'>
          <div className='banner-text'>
            <h2>Find your dream home</h2>
            <p>From as low as $10 per day with limited time offer discounts.</p>
          </div>
          <div className='banner-buttons'>
            <Button text='Buy' />
            <Button text='Rent' bg='pink' />
          </div>

          <div className='filter-container'>
            <FilterBox />
          </div>
        </div>
      </header>
    </>
  );
};

export default Banner;
