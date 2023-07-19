import { IDefaultProps } from '@/app/lib/interfaces/store.interface';
import React, { CSSProperties } from 'react';

import './ContentBox.css';

export interface ContentBoxProps extends IDefaultProps {
  header: string;
  style?: CSSProperties;
}

const ContentBox = (props: ContentBoxProps) => {
  return (
    <article className='content-box-container' style={props.style}>
      <header>
        <h3>{props.header}</h3>
      </header>

      <>{props.children}</>
    </article>
  );
};

export default ContentBox;
