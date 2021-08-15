import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

// modal that pops up when a table row is clicked. allows user to edit a move
export const EditModal = ({ onClose, showModal}) => {

    // referenced https://webomnizz.com/create-simple-modal-pop-up-with-react/
    const showHideClassName = showModal ? "modal d-block" : "modal d-none";
    
    // handle pressing the cancel button of the modal
    const handleClose = (event) => {
        event.preventDefault()
        onClose()
    }

    return (
        <>
            <div className={showHideClassName}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Edit move</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Modal body text goes here.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
};