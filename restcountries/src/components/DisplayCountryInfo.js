import { useState, useEffect } from 'react'
import TwoCol from './TwoCol'
import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY

const DisplayCountryInfo = (props) => {
    const [capitalWeather, setCapitalWeather] = useState('')
    const getWeatherData = (cityName) => {
	axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${apiKey}&units=imperial`)
	       .then(response => {
		 setCapitalWeather(response.data)
	     })
	console.log(capitalWeather)
    }

    useEffect(() => getWeatherData(props.capital), [])
    
    const weather = {
	temperature: capitalWeather.list[0].main.temp,
	description: capitalWeather.list[0].weather.description,
	icon: <img src={`https://openweathermap.org/img/wn/${capitalWeather.list[0].weather[0].icon}@2x.png`} />
    }

    return (
	<div style={{columnCount: 2}}>
	    <h3>{ props.name }</h3>
	    <ul>
		<li>Population: { props.population }</li>
		<li>Capital: { props.capital }</li>
		<li>Area: { props.area }</li>
		<li>Languages:
		    <ul>
			{ props.languages
			       .map(lang => <li key={lang}>{ lang }</li>) }
		    </ul>
		</li>
	    </ul>
	    <h3>Weather in {props.capital}</h3>
	    <TwoCol lhs={weather.temperature} rhs={weather.icon} />
	    <span style={{fontSize: 300}}>{ props.flag }</span>
	</div>
    )
}

export default DisplayCountryInfo;
