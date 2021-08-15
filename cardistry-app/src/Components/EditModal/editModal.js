import React from 'react';
import Modal from 'react-bootstrap/Modal';

// https://webomnizz.com/create-simple-modal-pop-up-with-react/

export const EditModal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal d-block" : "modal d-none";
  
    return (
      <div className={showHideClassName}>
        <div className="modal-container">
          {children}
          <a href="javascript:;" className="modal-close" onClick={handleClose}>
            close
          </a>
        </div>
      </div>
    );
};