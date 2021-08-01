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
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row" style={{padding:"50px 0px 50px 0px"}}>
                        <div className="col-sm-4">
                            <input type='text' placeholder="Move name" required value={inputMove} onChange={handleNameChange} className="form-control"></input>
                        </div>
                        <div className="col">
                            <input type='text' className="form-control"></input>
                        </div>
                        <div className="col-sm-1">
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}