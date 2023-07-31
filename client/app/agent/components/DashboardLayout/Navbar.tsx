'use client';

import { RoundButton } from '@/app/lib/components/ui/Button/Button';
import { IUserSlice } from '@/app/lib/interfaces/store.interface';
import { getUserStorage } from '@/app/lib/utils/localStorage';
import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { BiMenu, BiPlus } from 'react-icons/bi';

import './Navbar.css';

interface NavbarProps {
  setSidebarOpened: Dispatch<SetStateAction<boolean>>;
}

const Navbar = (props: NavbarProps) => {
  const user = getUserStorage() as IUserSlice;

  return (
    <nav className='navbar'>
      <div className='user-img'>
        <Image src={'/images/home.jpg'} width={1000} height={1000} alt='user' />
        <h3>{user?.username}</h3>
      </div>

      <Link href={'/agent/create-listing'}>
        <RoundButton
          text='Create Listing'
          className='listing-button'
          icon={<BiPlus />}
          bg='pink'
        />
      </Link>

      <div className='menu' onClick={() => props.setSidebarOpened(true)}>
        <BiMenu />
      </div>
    </nav>
  );
};

export default Navbar;
