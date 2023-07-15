import { RoundButton } from '@/app/lib/components/ui/Button/Button';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import { BiMenu, BiPlus } from 'react-icons/bi';

import './Navbar.css';

interface NavbarProps {
  setSidebarOpened: Dispatch<SetStateAction<boolean>>;
}

const Navbar = (props: NavbarProps) => {
  return (
    <nav className='navbar'>
      <div className='user-img'>
        <Image src={'/images/home.jpg'} width={1000} height={1000} alt='user' />
        <h3>Adejare Daniel</h3>
      </div>

      <RoundButton text='Create Listing' icon={<BiPlus />} bg='pink' />

      <div className='menu' onClick={() => props.setSidebarOpened(true)}>
        <BiMenu />
      </div>
    </nav>
  );
};

export default Navbar;
