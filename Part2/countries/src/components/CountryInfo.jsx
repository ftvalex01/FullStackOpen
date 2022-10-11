import React from 'react'
import Weather from './Weather'

export const CountryInfo = ({country}) => {
  return (
    <div>
        <h1>{country.name}</h1>
        <br/>
        <p>capital - {country.capital}</p>
        <p>population - {country.population}</p>
        <h3>Languages</h3>
        <ul>
        {
            country.languages.map(language => <li key={language.name}>{language.name}</li>)
        }

        </ul>
        <img src={country.flag} alt="Country flag"></img>
        <br/>
        <h3>Weather</h3>
        <Weather country={country}/>
    </div>
  )
}
