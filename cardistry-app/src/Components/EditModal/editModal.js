import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

// modal that pops up when a table row is clicked. allows user to edit a move
export const EditModal = ({editedMove, onClose, onFormChange, onFormSubmit, showModal, fieldNums}) => {

    // referenced https://webomnizz.com/create-simple-modal-pop-up-with-react/
    const showHideClassName = showModal ? "modal d-block" : "modal d-none";
    
    // handle pressing the cancel button of the modal
    const handleClose = (event) => {
        event.preventDefault()
        onClose()
    }

    const handleChange = (field, event) => {
        onFormChange(field, event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    return (
        <>
            <div className={showHideClassName}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Edit move</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input type='date' placeholder="Date" required value={editedMove[fieldNums["date"]]} onChange={(e) => handleChange(fieldNums["date"], e)} className="form-control"></input>
                        <input type='text' placeholder="Name" required value={editedMove[fieldNums["name"]]} onChange={(e) => handleChange(fieldNums["name"], e)} className="form-control"></input>
                        <select className="form-select" value={editedMove[fieldNums["difficulty"]]} onChange={(e) => handleChange(fieldNums["difficulty"], e)}>
                            <option disabled>Difficulty</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <select className="form-select" value={editedMove[fieldNums["type"]]} onChange={(e) => handleChange(fieldNums["type"], e)}>
                            <option disabled>Type</option>
                            <option>2-handed cuts</option>
                            <option>1-handed cuts</option>
                            <option>1-card moves</option>
                            <option>displays</option>
                            <option>aerials</option>
                            <option>shuffles</option>
                            <option>isolations</option>
                            <option>fans/spreads</option>
                            <option>misc</option>
                            <option>magic</option>
                        </select>
                        <input type='text' placeholder="Link" value={editedMove[fieldNums["link"]]} onChange={(e) => handleChange(fieldNums["link"], e)} className="form-control"></input>
                        <input type='text' placeholder="Notes" value={editedMove[fieldNums["notes"]]} onChange={(e) => handleChange(fieldNums["notes"], e)} className="form-control"></input>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger">Delete move</Button>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
};