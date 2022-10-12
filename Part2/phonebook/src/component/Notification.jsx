import React from 'react'




export const Notification = ({msg}) => {

if(msg === null){
    return null
}


  return (
    <div>
    {console.log(msg)}
    {
        msg.startsWith("Add") || msg.startsWith('Up') ? <div className='good'>{msg}</div>
        : <div className='bad'>{msg}</div>
      }
    </div>
  )
}
