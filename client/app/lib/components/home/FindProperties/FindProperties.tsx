'use client';
import { RootState } from '@/app/lib/redux/store';
import useWidth from '@/app/lib/utils/useWidth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Title from '../../ui/Title/Title';
import './FindProperties.css';

const locations = [
  {
    text: 'Los Angeles',
    picture: '/home.jpg',
  },

  {
    text: 'Miami',
    picture: '/home.jpg',
  },
  {
    text: 'New York',
    picture: '/home.jpg',
  },
  {
    text: 'Florida',
    picture: '/home.jpg',
  },
];

const FindProperties = () => {
  const width = useWidth();

  return (
    <section className='container light-container'>
      <div>
        <Title title='Find Properties in These Cities' align='center' />

        <div className={`locations-container`}>
          {' '}
          {locations.map((location, index: number) => {
            return (
              <div
                className={`single-location location-${index + 1}`}
                key={index}
              >
                <div className='location-hover-text'>
                  <p>{location.text}</p>
                </div>

                <Image
                  src={location.picture}
                  alt={location.text}
                  width={400}
                  height={300}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FindProperties;
