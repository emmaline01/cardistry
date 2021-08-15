// lots of credit to the tutorial https://www.youtube.com/watch?v=cb1vy1HpVwk

import ReactDOM from 'react-dom';

import React, {useState, useEffect} from 'react';
import {Table} from '../Components/Table/table';
import {Form} from '../Components/Form/form';
import {TitleBar} from '../Components/TitleBar/titleBar';
import {EditModal} from '../Components/EditModal/editModal';

// the home page of the web app
export const HomePage = ()=> {

    // state info: current list of moves, move being added
    const [currMoves, setMoves] = useState([]);
    const [addedMove, setAddMove] = useState(['', '', 'Difficulty', 'Type', '', '']);

    const fieldNums = {
        "date": 0,
        "name": 1,
        "difficulty": 2,
        "type": 3,
        "link": 4,
        "notes": 5
    };

    // sets the current list of moves when this page renders
    useEffect(()=> {
        fetch('/api')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => setMoves(data))
            .then(data => console.log(data))
    }, [])

    // updates the currently added move state
    const handleFormChange = (field, inputVal) => {
        let newAddedMove = addedMove.slice(0, field)
        newAddedMove.push(inputVal)
        newAddedMove = newAddedMove.concat(addedMove.slice(field+1))
        setAddMove(newAddedMove)
    }

    // sends an inputted move to the database, updates current states
    const handleFormSubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                date:addedMove[fieldNums["date"]],
                name:addedMove[fieldNums["name"]],
                difficulty:addedMove[fieldNums["difficulty"]],
                type:addedMove[fieldNums["type"]],
                link:addedMove[fieldNums["link"]],
                notes:addedMove[fieldNums["notes"]],
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(msg => {
            console.log(msg)
            setAddMove(['', '', 'Difficulty', 'Type', '', ''])
            updateMoves()
            recommendSeq()
        })
    }

    // updates the current move list state
    const updateMoves = () => {
        fetch('/api')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => setMoves(data))
            .then(data => console.log(data))
    }

    const recommendSeq = () => {
        fetch('/api/recommendSeq')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => console.log(data))
    }

    const handleMoveEdit = (moveID) => {
        //ReactDOM.render(<EditModal/>, document.getElementById('root'))
        console.log(moveID)
        //return ReactDOM.createPortal(<EditModal/>, document.getElementById("modal"));
    }

    const modalClose = (e) => {
        console.log("close")
    }

    return (
        <>
            <TitleBar/>
            <Form inputMove={addedMove} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} fieldNums={fieldNums}/>
            <Table listOfMoves={currMoves} onMoveEdit={handleMoveEdit}/>
            <EditModal show={true} handleClose={e => this.modalClose(e)}>
                <h2>Hello Modal</h2>
                <div className="form-group">
                    <label>Enter Name:</label>
                    <input
                    type="text"
                    value={"input name"}
                    name="modalInputName"
                    onChange={e => this.handleChange(e)}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button onClick={e => this.handleSubmit(e)} type="button">
                    Save
                    </button>
                </div>
            </EditModal>
        </>
    )
}