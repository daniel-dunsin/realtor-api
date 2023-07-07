import Image from 'next/image';
import React from 'react';
import { BiHeart, BiTransfer } from 'react-icons/bi';
import { MdCompare, MdCompareArrows } from 'react-icons/md';
import './SingleProperty.css';

const SingleProperty = () => {
  return (
    <article className='single-property'>
      <div className='property-image-container'>
        <div className='property-image'>
          <Image
            src={'/home.jpg'}
            alt='single-property'
            width={400}
            height={400}
          />
        </div>

        <div className='property-hover-text'>
          <div className='buttons-container'>
            <p className='featured'>Featured</p>
            <p className='offer'>For Rent</p>
          </div>

          <p className='price'>$15000/mo</p>

          <div className='actions'>
            <span>
              <BiTransfer />
            </span>

            <span>
              <BiHeart />
            </span>
          </div>
        </div>
      </div>

      <div className='property-details'>
        <p className='property-type'>Apartment</p>

        <h3>Luxury Family Home</h3>
      </div>
    </article>
  );
};

export default SingleProperty;
