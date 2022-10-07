import React from 'react'

export const Persons = ({persons}) => {
  return (
    <ul>
        {persons.map((element) => {
          return <li key={element.id}>{element.name} {element.phone}</li>;
        })}
      </ul>
  )
}
