import React, { ReactElement } from 'react';
import './SmallBox.css';

interface SmallBoxProps {
  count: number;
  text: string;
  icon: ReactElement;
  iconbg: string;
  iconColor: string;
}

const SmallBox = (props: SmallBoxProps) => {
  return (
    <article className='small-box-container'>
      <div>
        <h1>{props?.count}</h1>
        <p>{props.text}</p>
      </div>

      <span style={{ background: props.iconbg, color: props.iconColor }}>
        {props.icon}
      </span>
    </article>
  );
};

export default SmallBox;
