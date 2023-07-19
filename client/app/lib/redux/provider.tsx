'use client';
import { store } from './store';
import { Provider } from 'react-redux';
import { ReactElement } from 'react';
import { IDefaultProps } from '../interfaces/store.interface';

export const ReduxProvider = (props: IDefaultProps) => {
  return (
    <Provider store={store}>
      <div>{props.children}</div>
    </Provider>
  );
};
