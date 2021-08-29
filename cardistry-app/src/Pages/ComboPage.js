import React, {useState, useEffect} from 'react';
import {Table} from '../Components/Table/table';
import {ComboForm} from '../Components/ComboForm/comboForm';

/* Allows the user to generate combos of moves using a Markov Chain and the 
 * parameters target difficulty, combo length, difficulty variation of moves
 * in the combo, and the smoothness of transitions between moves. Markov
 * Chain is implemented in the backend.
 */
export const ComboPage = () => {

    const [currRec, setCurrRec] = useState([])
    const [currFormInput, setCurrFormInput] = useState(["3", "5", "3", "3"])

    const comboFieldNums = {
        "target difficulty": 0,
        "target length": 1,
        "difficulty variation": 2,
        "transition smoothness": 3
    }

    // get the current recommended sequence
    useEffect(() => {
        fetch('/api/getRecommendedSeq')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => setCurrRec(data));
    }, [])

    // handle clicking on a move in the table
    const handleMoveSelect = (move) => {
        console.log("selected " + move.id)
    }

    // modifies state when the combo parameters are changed
    const handleComboFormChange = (field, inputVal) => {
        let newInput = currFormInput.slice(0, field)
        newInput.push(inputVal)
        newInput = newInput.concat(currFormInput.slice(field + 1))
        setCurrFormInput(newInput)
        console.log(currFormInput)
    }

    // makes a call to the backend to generate a new combo with input parameters
    const handleComboGenerate = () => {
        fetch('/api/createRecommendedSeq', {
            method: 'POST',
            body: JSON.stringify({
                target_difficulty:currFormInput[comboFieldNums["target difficulty"]],
                target_length:currFormInput[comboFieldNums["target length"]],
                difficulty_variation:currFormInput[comboFieldNums["difficulty variation"]],
                transition_smoothness:currFormInput[comboFieldNums["transition smoothness"]]
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(msg => {
            console.log(msg)
            setCurrRec(msg)
        })
    }


    return (
        <>
        <div style={{padding: "50px 0px 0px 0px"}}>
            <ComboForm input={currFormInput} 
                onFormChange={handleComboFormChange} 
                onFormSubmit={handleComboGenerate}
                comboFieldNums={comboFieldNums}/>
        </div>
        <h4 style={{padding: "70px 0px 20px 0px"}}>Generated combo: </h4>
        <Table listOfMoves={currRec} onMoveEdit={handleMoveSelect}/>
        </>
    )
}