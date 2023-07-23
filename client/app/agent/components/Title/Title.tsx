import React from 'react';

import './Title.css';

interface TitleProps {
  title: string;
  subtitle?: string;
}

const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <header className='title'>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
};

export default Title;
