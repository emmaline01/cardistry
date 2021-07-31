import React from 'react';

// displays a single move

export const Card = ({listOfMoves})=> {
    return (
        <>
            {listOfMoves.map(move => {
                return (
                    <ul key={move.id}>
                        <li>{move.name}</li>
                    </ul>
                )
            })}
        </>
    )
}