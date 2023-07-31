'use client';
import { closeConfirmationModal } from '@/app/lib/redux/slices/handlersSlice';
import { RootState } from '@/app/lib/redux/store';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Button/Button';

import './ConfirmationModal.css';

const ConfirmationModal = () => {
  const handlers = useSelector((state: RootState) => state.handlers);
  const dispatch = useDispatch();

  if (!handlers.confirmationModal.isOpen) {
    return <></>;
  }

  return (
    <section className='modal-overlay'>
      <div className='modal confirmation-modal'>
        <header>
          <h2>Kindly Confirm</h2>
          <i
            onClick={() => {
              dispatch(closeConfirmationModal());
            }}
          >
            <MdClose />
          </i>
        </header>
        <h3>
          {handlers?.confirmationModal?.text || 'Do you want to add me? '}
        </h3>
        {/* {handlers?.confirmationModal?.subtitle && (
          <p>{handlers?.confirmationModal?.subtitle}</p>
        )} */}
        <p>Hello there</p>
        <div className='buttons-container'>
          <Button
            className='confirm-button'
            text='Confirm'
            onClick={handlers.confirmationModal.confirm}
          />
          <Button
            className='cancel-button'
            text='Cancel'
            onClick={() => {
              dispatch(closeConfirmationModal());
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ConfirmationModal;
