import React from 'react';
import Button from 'react-bootstrap/Button';

export const ComboForm = ({input, onFormChange, onFormSubmit, comboFieldNums})=> {

    const handleGenerate = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    const handleChange = (field, event) => {
        console.log(event.target.value)
        onFormChange(field, event.target.value)
    }

    return (
        <>
        <div className="container">
            <form>
                <div className="row">
                    <h4 style={{padding:"0px 0px 20px 0px"}}>Combo parameters:</h4>
                    <div className="col-sm">
                        <label>Target Difficulty</label>
                        <div className="d-flex">
                            <p>1&nbsp;</p>
                            <input type='range' 
                                size="sm" 
                                value={input[comboFieldNums["target difficulty"]]} 
                                className="form-range" min="1" max="5"
                                onChange={(e) => handleChange(comboFieldNums["target difficulty"], e)}></input>
                            <p>&nbsp;5</p>
                        </div>
                        <label>Target Combo Length</label>
                        <div className="d-flex">
                            <p>1&nbsp;</p>
                            <input type='range' 
                                size="sm" 
                                value={input[comboFieldNums["target length"]]} 
                                className="form-range" min="1" max="10"
                                onChange={(e) => handleChange(comboFieldNums["target length"], e)}></input>
                            <p>&nbsp;10</p>
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm">
                        <label>Difficulty Variation</label>
                        <div className="d-flex">
                            <p>unvaried&nbsp;</p>
                            <input type='range' 
                                size="sm" 
                                value={input[comboFieldNums["difficulty variation"]]} 
                                className="form-range" min="1" max="5"
                                onChange={(e) => handleChange(comboFieldNums["difficulty variation"], e)}></input>
                            <p>&nbsp;varied</p>
                        </div>
                        <label>Transition Smoothness</label>
                        <div className="d-flex" style={{padding:"0px 0px 10px 0px"}}>
                            <p>rough&nbsp;</p>
                            <input type='range' 
                                size="sm" 
                                value={input[comboFieldNums["transition smooothness"]]} 
                                className="form-range" min="1" max="5"
                                onChange={(e) => handleChange(comboFieldNums["transition smoothness"], e)}></input>
                            <p>&nbsp;smooth</p>
                        </div>
                    </div>
                    <Button variant="primary" onClick={handleGenerate}>Generate!</Button>
                </div>
            </form>
        </div>
        </>
    )
}