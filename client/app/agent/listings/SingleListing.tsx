import { Button } from '@/app/lib/components/ui/Button/Button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiEdit, BiMapPin, BiTrash } from 'react-icons/bi';
import { MdCreate } from 'react-icons/md';

import './SingleListing.css';

const SingleListing = () => {
  return (
    <tr>
      <td>
        <div className='listing-image-container'>
          <div className='listing-image'>
            <Image
              src={'/images/home.jpg'}
              width={150}
              height={100}
              alt='single listing'
            />
            <p>For rent</p>
          </div>
          <div className='listing-details'>
            <h2>Luxury Family House</h2>
            <p>
              <span>
                <BiMapPin />
              </span>
              1421 San Pedro St. Los Angeles
            </p>

            <p className='price'>$ 13000/mo</p>
          </div>
        </div>
      </td>

      <td>30, december, 2022</td>

      <td>
        <p className='status'>Pending</p>
      </td>

      <td>
        <p>2345</p>
      </td>

      <td>
        <div className='actions'>
          <span>
            <Link href={`/agent/listings/1234/edit`}>
              <MdCreate />
            </Link>
          </span>
          <span>
            <BiTrash />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default SingleListing;
