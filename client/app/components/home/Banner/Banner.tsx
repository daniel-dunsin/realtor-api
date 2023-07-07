'use client';

import { IOffer } from '@/app/interfaces/constants.types';
import { editSearch } from '@/app/redux/slices/searchSlice';
import { RootState } from '@/app/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../ui/Button/Button';
import Navbar from '../../ui/Navbar/Navbar';
import FilterBox from '../FilterBox/FilterBox';
import './Banner.css';

const Banner = () => {
  const { offer } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const setOffer = (offer: IOffer) => {
    dispatch(editSearch({ key: 'offer', value: offer }));
  };

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
            <Button
              text='Buy'
              bg={offer === 'Sale' ? 'pink' : ''}
              onClick={() => setOffer('Sale')}
            />

            <Button
              text='Rent'
              bg={offer === 'Rent' ? 'pink' : ''}
              onClick={() => setOffer('Rent')}
            />
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
