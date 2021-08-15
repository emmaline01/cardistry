// lots of credit to the tutorial https://www.youtube.com/watch?v=cb1vy1HpVwk

import ReactDOM from 'react-dom';

import React, {useState, useEffect} from 'react';
import {Table} from '../Components/Table/table';
import {Form} from '../Components/Form/form';
import {TitleBar} from '../Components/TitleBar/titleBar';
import {EditModal} from '../Components/EditModal/editModal';

// the home page of the web app
export const HomePage = ()=> {

    // state info
    const [currMoves, setMoves] = useState([]);
    const [addedMove, setAddMove] = useState(['', '', 'Difficulty', 'Type', '', '']);
    const [editedMove, setEditedMove] = useState(['', '', 'Difficulty', 'Type', '', '', -1]);
    const [showEditModal, setShowEditModal] = useState(false);

    const fieldNums = {
        "date": 0,
        "name": 1,
        "difficulty": 2,
        "type": 3,
        "link": 4,
        "notes": 5,
        "id": 6
    };

    // sets the current list of moves when this page renders
    useEffect(()=> {
        fetch('/api')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => setMoves(data));
        // referenced https://stackoverflow.com/questions/55600870/hooks-setstate-always-one-step-behind
        ReactDOM.render(<EditModal 
                editedMove={editedMove} 
                showModal={showEditModal} 
                onClose={modalClose} 
                onFormChange={modalChange} 
                onFormSubmit={modalSubmit}
                fieldNums={fieldNums}/>, document.getElementById('modal'));
    }, [editedMove, showEditModal])

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

    //close the edit modal
    const modalClose = () => {
        setShowEditModal(false)
    }

    // updates the currently edited move state
    const modalChange = (field, inputVal) => {
        let newEditedMove = editedMove.slice(0, field)
        newEditedMove.push(inputVal)
        newEditedMove = newEditedMove.concat(editedMove.slice(field + 1))
        setEditedMove(newEditedMove)
    }

    //open the edit modal
    const handleMoveSelect = (move) => {
        let diff = move.difficulty
        if (diff === "") {
            diff = "Difficulty"
        }
        let type = move.moveType
        if (type === "") {
            type = "Type"
        }
        setEditedMove([move.date, move.name, diff, type, move.link, move.notes, move.id])
        setShowEditModal(true)
    }

    // send request to edit move in database, updates current states
    const modalSubmit = () => {
        fetch('/api/edit', {
            method: 'POST',
            body: JSON.stringify({
                id:editedMove[fieldNums["id"]],
                date:editedMove[fieldNums["date"]],
                name:editedMove[fieldNums["name"]],
                difficulty:editedMove[fieldNums["difficulty"]],
                type:editedMove[fieldNums["type"]],
                link:editedMove[fieldNums["link"]],
                notes:editedMove[fieldNums["notes"]],
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(msg => {
            console.log(msg)
            modalClose()
            updateMoves()
        })
    }

    return (
        <>
            <TitleBar/>
            <Form inputMove={addedMove} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} fieldNums={fieldNums}/>
            <Table listOfMoves={currMoves} onMoveEdit={handleMoveSelect}/>
            <div id="modal"></div>
        </>
    )
}