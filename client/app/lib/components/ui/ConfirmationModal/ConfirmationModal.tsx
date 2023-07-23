import React from 'react';

import './ConfirmationModal.css';

interface IConfirmationModalProps {
  text: string;
  subtitle?: string;
}

const ConfirmationModal = ({ text, subtitle }: IConfirmationModalProps) => {
  return (
    <section className='modal-overlay'>
      <div className='modal confirmation-modal'>
        <header>Kindly Confirm</header>

        <h3>{text}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
};

export default ConfirmationModal;
