import { IDefaultProps } from '@/app/lib/interfaces/store.interface';
import React, { CSSProperties, HTMLAttributes } from 'react';

import './ContentBox.css';

export interface ContentBoxProps extends HTMLAttributes<HTMLDivElement> {
  header: string;
  headersize?: number;
}

const ContentBox = (props: ContentBoxProps) => {
  return (
    <article {...props} className={`content-box-container ${props?.className}`}>
      <header>
        <h3 style={{ fontSize: props?.headersize || 16 }}>{props.header}</h3>
      </header>

      <>{props.children}</>
    </article>
  );
};

export default ContentBox;
