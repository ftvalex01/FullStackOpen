import React from 'react'


export const Persons = ({person,handleClickDelete}) => {

  return (
    <>
     <tr>
      <td key={person.name}>
        {person.name}
      </td>
      <td key={person.number}>
        {person.number}
      </td>
      <td key={person.id}>
        <button onClick={()=>handleClickDelete(person.id)}>delete</button>
      </td>
      </tr>
      </>
  )
}
