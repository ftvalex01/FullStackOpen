import React from 'react'

export const PersonForm = ({handleSubmit,newName,handleInputName,newPhone,handleInputPhone}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputName} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleInputPhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
