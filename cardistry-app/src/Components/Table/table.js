import React from 'react';

// displays a single move

export const Table = ({listOfMoves})=> {
    return (
        <>
            <div className="container">
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead style={{backgroundColor:"#6c757d", color:"white"}}>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfMoves.map(move => {
                                return (
                                    <tr>
                                        <td>{move.date}</td>
                                        <td>{move.name}</td>
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