'use client';
import React from 'react';
import { BiHeart, BiHome } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import ContentBox from './ContentBox';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
} from 'recharts';

import './Dashboard.css';
import SmallBox from './SmallBox';

const areaChartData = [
  {
    day: 'Jan',
    amt: 72,
  },
  {
    day: 'Feb',
    amt: 156,
  },
  {
    day: 'Mar',
    amt: 104,
  },
  {
    day: 'Apr',
    amt: 20,
  },
  {
    day: 'May',
    amt: 250,
  },
  {
    day: 'June',
    amt: 130,
  },
  {
    day: 'July',
    amt: 80,
  },
  {
    day: 'Aug',
    amt: 400,
  },
  {
    day: 'Sept',
    amt: 229,
  },
  {
    day: 'Oct',
    amt: 217,
  },
  {
    day: 'Nov',
    amt: 192,
  },
  {
    day: 'Dec',
    amt: '19',
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div>
        <header className='username'>
          <h2>Howdy, Daniel Adejare</h2>
          <p>{"We're"} glad to see you again</p>
        </header>

        <div className='features-container'>
          <SmallBox
            text='All Properties'
            count={37}
            icon={<BiHome />}
            iconbg={'#0000003b'}
            iconColor={'#333'}
          />

          <SmallBox
            text='Property views'
            count={24}
            icon={<FiEye />}
            iconbg={'#0e6dea63'}
            iconColor={'#0e6dea'}
          />

          <SmallBox
            text='Favourites'
            count={18}
            icon={<BiHeart />}
            iconbg={'#ea0e0e5c'}
            iconColor={'#ea0e0e'}
          />
        </div>

        <div className='stats'>
          <ContentBox header='View Statistics' style={{ minHeight: '300px' }}>
            <div className='stats-chart'>
              <AreaChart
                width={600}
                style={{ minWidth: '100%', maxWidth: '100%' }}
                height={300}
                data={areaChartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray='3' />
                <XAxis dataKey='day' />
                <YAxis />
                <Tooltip />
                <Area
                  type='monotone'
                  dataKey='amt'
                  stroke='#636363'
                  fill='#636363'
                />
              </AreaChart>
            </div>
          </ContentBox>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
