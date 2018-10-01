import React from 'react'

const Person = ({ person, buttonHandler }) => {
    return (
        <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={buttonHandler}>Poista</button></td>
        </tr>
    )
}

export default Person