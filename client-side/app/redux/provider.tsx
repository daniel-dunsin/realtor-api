'use client';
import { store } from './store';
import { Provider } from 'react-redux';
import { ReactElement } from 'react';

interface Props {
  children: ReactElement | ReactElement[];
}

export const ReduxProvider = (props: Props) => {
  return <Provider store={store}>{props.children}</Provider>;
};
