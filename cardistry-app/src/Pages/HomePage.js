// lots of credit to the tutorial https://www.youtube.com/watch?v=cb1vy1HpVwk

import React, {useState, useEffect} from 'react';
import {Table} from '../Components/Table/table';
import {Form} from '../Components/Form/form';
import {TitleBar} from '../Components/TitleBar/titleBar'

// the home page of the web app
export const HomePage = ()=> {

    // state info: current list of moves, move being added
    const [currMoves, setMoves] = useState([])
    const [addedMove, setAddMove] = useState('')

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
    const handleFormChange = (inputVal) => {
        setAddMove(inputVal)
    }

    // sends an inputted move to the database, updates current states
    const handleFormSubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                content:addedMove
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(msg => {
            console.log(msg)
            setAddMove('')
            updateMoves()
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

    return (
        <>
            <TitleBar/>
            <Form inputMove={addedMove} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>
            <Table listOfMoves={currMoves}/>
        </>
    )
}