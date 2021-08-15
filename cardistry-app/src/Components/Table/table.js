import React from 'react';

// displays a table of moves

export const Table = ({listOfMoves, onMoveEdit})=> {

    const handleClick = (id) => {
        // TODO: show a modal popup that allows editing of row and save the edits to db
        onMoveEdit(id)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <table className="table table-bordered table-striped table-hover">
                        <thead style={{backgroundColor:"#6c757d", color:"white"}}>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Difficulty</th>
                                <th scope="col">Type</th>
                                <th scope="col">Link</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfMoves.map(move => {
                                return (
                                    <tr key={move.id} onClick={(e)=> handleClick(move.id)}>
                                        <td>{move.date}</td>
                                        <td>{move.name}</td>
                                        <td>{move.difficulty}</td>
                                        <td>{move.moveType}</td>
                                        <td>{move.link}</td>
                                        <td>{move.notes}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}