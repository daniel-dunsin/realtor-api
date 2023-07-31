'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmationModal from './components/ui/ConfirmationModal/ConfirmationModal';
import { IDefaultProps, IUserSlice } from './interfaces/store.interface';
import { updateUser } from './redux/slices/userSlice';
import { getUserStorage } from './utils/localStorage';

const AppContainer = (props: IDefaultProps) => {
  const user = getUserStorage() as IUserSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(updateUser(user));
    }
  }, [user]);

  return (
    <>
      <ConfirmationModal />
      {props.children}
    </>
  );
};

export default AppContainer;
