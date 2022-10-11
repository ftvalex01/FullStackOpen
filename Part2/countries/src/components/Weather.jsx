import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Weather = ({country}) => {

const api_key = process.env.REACT_APP_API_KEY
const base_url='http://api.weatherstack.com/'
const [weather,setWeather] = useState([])



useEffect(() => {
    axios.get(`${base_url}current?access_key=${api_key}&query=${country.name}`).then((response)=>{
        console.log(response)
        setWeather(response.data.current)
    })
  
}, [])



  return (
    <div>
            <h4>Weater in {country.name}</h4>
            <p><strong>Temperature</strong>: {weather.temperature} celcius</p>
            <img src={weather.weather_icons} alt="weather" style={{width:'80px',height:'80px'}}/>
            <p><strong>wind</strong>: {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

export default Weather