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

    //col-md-# doesn't work for text input??? but col does?
    return (
        <>
            <div class="container">
                <form onSubmit={handleSubmit}>
                    <div class="row">
                        <input type='text' placeholder="Move name" required value={inputMove} onChange={handleNameChange} class="form-control col"></input>
                        <input type='text' class="form-control col"></input>
                        <button type="submit" class="btn btn-secondary col-md-1">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}