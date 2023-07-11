import React from 'react';
import './Title.css';

interface TitleProps {
  title: string;
  subtitle?: string;
  align: 'center' | 'left' | 'right';
}

const Title = (props: TitleProps) => {
  return (
    <header className='title-container' style={{ textAlign: props.align }}>
      <h1 className='title'>{props.title}</h1>
      {props.subtitle && <p className='subtitle'>{props.subtitle}</p>}
    </header>
  );
};

export default Title;
