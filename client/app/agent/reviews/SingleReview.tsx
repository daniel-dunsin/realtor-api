import Image from 'next/image';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { MdCreate, MdStar } from 'react-icons/md';
import ContentBox from '../dashboard/ContentBox';

import './SingleReview.css';

const SingleReview = () => {
  return (
    <article className='single-review'>
      <div className='image-container'>
        <Image src={'/images/home.jpg'} alt='home' width={100} height={100} />
      </div>
      <div className='review-info'>
        <h4>
          Adejare Daniel review on <span>Sunset Studio</span>
        </h4>

        <div className='review-extras'>
          <p>December, 2022</p>

          <span className='ratings'>
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
          </span>
        </div>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
          ducimus porro molestiae sapiente. Vero natus doloremque ipsam magnam
          iste ea, deleniti quae ad temporibus delectus.
        </p>

        <div className='actions'>
          <span>
            <MdCreate />
          </span>
          <span>
            <BiTrash />
          </span>
        </div>
      </div>
    </article>
  );
};

export default SingleReview;
