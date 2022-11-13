import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import DisplayCountryInfo from './components/DisplayCountryInfo'
import Button from './components/Button'
import TwoCol from './components/TwoCol'


const App = () => {    
    const [countries, setCountries] = useState([])
    const [countryNames, setCountryNames] = useState([])
    const [search, setSearch] = useState('')
    const [countryDisplay, setCountryDisplay] = useState('')

    const getAllData = () => {
	axios.get('https://restcountries.com/v3.1/all')
	     .then(response => {
		 setCountries(response.data)
		 setCountryNames(response.data.map(country => country.name.common))
	     })
    }
    
    useEffect(getAllData, [])

    const getCountryInfo = (selectedCountry) => {
	const countryInfo = countries.filter(country => country.name.common === selectedCountry)[0]
	
	const info = {
	    name: countryInfo.name.official,
	    population: countryInfo.population,
	    capital: countryInfo.capital,
	    area: countryInfo.area,
	    languages: Object.values(countryInfo.languages),
	    flag: countryInfo.flag
	}
	return <DisplayCountryInfo name={info.name}
	                           population={info.population}
				   capital={info.capital}
				   area={info.area}
				   languages={info.languages}
				   flag={info.flag} />
    }
    
    const countryNamesDisplay = countryNames.sort().map(country => <li key={country}>{country}</li>)
    
    const filterCountries = search === ''
			  ? []
			  : countryNames.filter(country => country.toLowerCase().startsWith(search.toLowerCase()))

    const showClick = (name) => () => setCountryDisplay(getCountryInfo(name.countryName))
    
    const chooseDisplay = filterCountries.length === 1
			? getCountryInfo(filterCountries[0])
			: countryDisplay

    const displayInfo = search === ''
		      ? ''
		      : chooseDisplay
    
    const searchCountries = (event) => setSearch(event.target.value)
    
    return (
	<div>
	    <h1>Country Information</h1>
	    <div>
		<Filter title='find countries: ' term={search} termChange={searchCountries} />
	    </div>
	    <ul>
		{ filterCountries.map(countryName => <TwoCol key={countryName} lhs={ <li key={ countryName }>{ countryName }</li> }
							     rhs={ <Button handleClick={showClick({ countryName })} text="show" /> } />) }
		{ displayInfo }
	    </ul>
	    <hr />
	    <h3>All Countries</h3>
	    <ul>
		{ countryNamesDisplay }
	    </ul>
	</div>
    )
}

export default App;
