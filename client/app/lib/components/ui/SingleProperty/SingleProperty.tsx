import Image from 'next/image';
import React from 'react';
import { BiHeart, BiTransfer } from 'react-icons/bi';
import { FiMapPin } from 'react-icons/fi';
import { MdCompare, MdCompareArrows } from 'react-icons/md';
import './SingleProperty.css';

const SingleProperty = () => {
  return (
    <article className='single-property'>
      <div className='property-image-container'>
        <div className='property-image'>
          <Image
            src={'/images/home.jpg'}
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

          <p className='price'>
            $15000<span>/mo</span>
          </p>

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

        <p className='property-location'>
          <span>
            <FiMapPin />
          </span>
          Lagos, Nigeria
        </p>

        <div className='rooms'>
          <p>
            <span>Beds: </span> 1
          </p>

          <p>
            <span>Baths: </span> 3
          </p>
          <p>
            <span>Sqft: </span> 5092
          </p>
        </div>
      </div>

      <div className='property-owner'>
        <div className='user-image'>
          <Image src={'/images/home.jpg'} alt='user' width={100} height={100} />
          <p>Ali turfan</p>
        </div>

        <p>1 year ago</p>
      </div>
    </article>
  );
};

export default SingleProperty;
