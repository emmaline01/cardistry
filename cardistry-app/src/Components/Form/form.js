import React from 'react';

// handles adding a new move through a form

export const Form = ({inputMove, onFormChange, onFormSubmit, fieldNums})=> {


    const handleChange = (field, event) => {
        onFormChange(field, event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row" style={{padding:"50px 0px 0px 0px"}}>
                        <div className="col-sm-2">
                            <input type='text' placeholder="Date" required value={inputMove[fieldNums["date"]]} onChange={(e) => handleChange(fieldNums["date"], e)} className="form-control"></input>
                        </div>
                        <div className="col-sm-4">
                            <input type='text' placeholder="Name" required value={inputMove[fieldNums["name"]]} onChange={(e) => handleChange(fieldNums["name"], e)} className="form-control"></input>
                        </div>
                        <div className="col">
                            <select className="form-select" value={inputMove[fieldNums["difficulty"]]} onChange={(e) => handleChange(fieldNums["difficulty"], e)}>
                                <option disabled>Difficulty</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select" value={inputMove[fieldNums["type"]]} onChange={(e) => handleChange(fieldNums["type"], e)}>
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
                        </div>
                    </div>
                    <div className="row" style={{padding:"10px 0px 50px 0px"}}>
                        <div className="col-sm-4">
                            <input type='text' placeholder="Link" value={inputMove[fieldNums["link"]]} onChange={(e) => handleChange(fieldNums["link"], e)} className="form-control"></input>
                        </div>
                        <div className="col">
                            <input type='text' placeholder="Notes" value={inputMove[fieldNums["notes"]]} onChange={(e) => handleChange(fieldNums["notes"], e)} className="form-control"></input>
                        </div>
                        <div className="col-sm-2">
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}