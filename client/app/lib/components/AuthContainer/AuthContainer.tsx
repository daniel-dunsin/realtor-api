import Image from 'next/image';
import React from 'react';
import { IDefaultProps } from '../../interfaces/store.interface';
import Footer from '../ui/Footer/Footer';
import Navbar from '../ui/Navbar/Navbar';

import './AuthContainer.css';

interface IAuthContainerProps extends IDefaultProps {
  bgText: string;
}

const AuthContainer = (props: IAuthContainerProps) => {
  return (
    <>
      <section className='container overlay'>
        <div className='auth-container'>
          {/* Left side */}
          <div className='image-container'>
            <Image
              src={'/images/auth.jpg'}
              width={300}
              height={500}
              alt='auth-image'
            />
            <div className='hover-text'>
              <p>{props.bgText}</p>
            </div>
          </div>

          <div className='children-container'>{props.children}</div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AuthContainer;
