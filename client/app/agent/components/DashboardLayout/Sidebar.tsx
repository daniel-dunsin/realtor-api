import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { BiComment, BiLogOut, BiMessage, BiSearch } from 'react-icons/bi';
import { FiPlus, FiSettings } from 'react-icons/fi';
import { MdCancel, MdClose, MdDashboard, MdHouse } from 'react-icons/md';

import './Sidebar.css';

interface ILink {
  href: string;
  text: string;
  icon: ReactElement;
}

interface ILinkCat {
  category: string;
  links: ILink[];
}

const links: ILinkCat[] = [
  {
    category: 'Main',
    links: [
      { href: '/agent/dashboard', text: 'Dashboard', icon: <MdDashboard /> },
      {
        href: '/agent/create-listing',
        text: 'Create Listing',
        icon: <FiPlus />,
      },
      { href: '/agent/message', text: 'Message', icon: <BiMessage /> },
    ],
  },

  {
    category: 'Manage Listings',
    links: [
      { href: '/agent/properties', text: 'My Properties', icon: <MdHouse /> },
      { href: '/agent/reviews', text: 'My Reviews', icon: <BiComment /> },
      { href: '/agent/favourites', text: 'My Favourites', icon: <BiSearch /> },
    ],
  },
];

interface SidebarProps {
  setSidebarOpened: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className='sidebar'>
      <header className='sidebar-header'>
        <div className='brand'>
          <Image
            src={'/images/logo-pink.png'}
            width={30}
            height={30}
            alt='logo'
          />
          <h3>Realtor</h3>
        </div>

        <i
          className='close'
          onClick={() => {
            props.setSidebarOpened(false);
          }}
        >
          <MdClose />
        </i>
      </header>

      <div className='links-container'>
        {links?.map((linkCategory, index) => {
          return (
            <div className='links' key={index}>
              <h4>{linkCategory?.category}</h4>
              <ul>
                {linkCategory?.links?.map((link, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        window.location.pathname === link?.href && 'isActive'
                      }`}
                    >
                      <Link href={link?.href}>
                        <i>{link?.icon}</i>
                        <p>{link?.text}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <div className='extras'>
          <p>
            <i>
              <BiLogOut />
            </i>
            Log out
          </p>

          <p>
            <i>
              <FiSettings />
            </i>
            Settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
