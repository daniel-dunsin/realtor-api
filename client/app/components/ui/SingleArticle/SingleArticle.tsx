import Image from 'next/image';
import React from 'react';

import './SingleArticle.css';

const SingleArticle = () => {
  return (
    <article className='single-article'>
      <div className='article-image-container'>
        <div className='article-image'>
          <Image
            src={'/home.jpg'}
            alt='single-article'
            width={400}
            height={400}
          />
        </div>
      </div>

      <div className='article-details'>
        <p className='article-type'>Apartment</p>

        <h3>Luxury Family Home</h3>
      </div>

      <div className='article-owner'>
        <div className='user-image'>
          <Image src={'/home.jpg'} alt='user' width={100} height={100} />
          <p>Ali turfan</p>
        </div>

        <p>7 August 2023</p>
      </div>
    </article>
  );
};

export default SingleArticle;
