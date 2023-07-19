'use client';

import { IDefaultProps } from '@/app/lib/interfaces/store.interface';
import React, { useState } from 'react';

import './DashboardLayout.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = (props: IDefaultProps) => {
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

  return (
    <section className='dashboard-container'>
      <div className={`left-container ${sidebarOpened && 'isActive'}`}>
        <Sidebar setSidebarOpened={setSidebarOpened} />
      </div>

      <div className='right-container container light-container'>
        <Navbar setSidebarOpened={setSidebarOpened} />
        {props?.children}
      </div>
    </section>
  );
};

export default DashboardLayout;
