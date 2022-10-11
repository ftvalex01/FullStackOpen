import React, { useState } from 'react'
import { CountryInfo } from './CountryInfo'


export const SingleCountry = ({country}) => {

    const [show,setShow] = useState(false)

    const handleClick = ()=>{
        setShow(!show)
    }


  return (
    <div>
        <div>
        <p>{country.name}</p>

        </div>
        <div>
            <button onClick={handleClick}>Show</button>
        </div>
        {
            show && <CountryInfo country={country}/>
        }
    </div>

  )
}
