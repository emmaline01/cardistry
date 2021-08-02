import React from 'react';

// displays a single move

export const Table = ({listOfMoves})=> {
    return (
        <>
            <div className="container">
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead style={{backgroundColor:"#6c757d", color:"white"}}>
                            <tr key={-1}>
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
                                    <tr key={move.id}>
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