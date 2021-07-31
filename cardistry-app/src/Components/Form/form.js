import React from 'react';

// handles adding a new move through a form

export const Form = ({inputMove, onFormChange, onFormSubmit})=> {
    const handleNameChange = (event) => {
        onFormChange(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' required value={inputMove} onChange={handleNameChange}></input>
                <input type='submit'></input>
            </form>
        </>
    )
}