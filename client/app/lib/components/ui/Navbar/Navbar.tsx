'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import { RoundButton } from '../Button/Button';
import { FiMenu, FiUser } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

import './Navbar.css';

interface ILinks {
  title: string;
  link: string;
}

const links: ILinks[] = [
  { title: 'Home', link: '/' },
  { title: 'Contact Us', link: '/contact' },
  { title: 'About Us', link: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleNav = () => setIsOpen(!isOpen);

  const scrollEvent = () => {
    const height = window.pageYOffset;

    if (height > 50) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => window.removeEventListener('scroll', scrollEvent);
  }, []);

  return (
    <nav className={`navbar ${isActive && 'isActive'}`}>
      <div className='navbar-container'>
        <div className='navbar-brand'>
          <Image
            src={!isActive ? '/logo-white.png' : '/logo-pink.png'}
            width={30}
            height={30}
            alt='logo'
          />
          <h2>
            <Link href={'/'}>Realtor</Link>
          </h2>
        </div>
        <div className={`navbar-links-container ${isOpen && 'nav-open'}`}>
          <ul className='navbar-links'>
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <Link href={link.link} className='navbar-link'>
                    {link.title}
                  </Link>
                </li>
              );
            })}

            <RoundButton bg='pink' text='Login/Register' icon={<FiUser />} />
          </ul>
        </div>
        <i className='navbar-menu' onClick={toggleNav}>
          {isOpen ? <MdClose /> : <FiMenu />}
        </i>
      </div>
    </nav>
  );
};

export default Navbar;
