import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {    
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    const getData = () => {
	axios.get('https://restcountries.com/v3.1/all')
	     .then(response => {
		 const data = response.data
		 const countryNames = data.map(country => country.name.common)
		 setCountries(countryNames)
	     })
    }

    useEffect(getData, [])

    const countryNamesDisplay = countries.map(country => <li>{country}</li>)
    
    const filterCountries = search === ''
			  ? ''
			  : countries.filter(country => country.toLowerCase().startsWith(search.toLowerCase()))
				     .map(countryName => <li key={ countryName }>{ countryName }</li>)
    
    const searchCountries = (event) => setSearch(event.target.value)

    console.log(countries.filter(country => country.toLowerCase().startsWith(search.toLowerCase()))
			 .map(countryName => <li key={ countryName }>{ countryName }</li>))

    return (
	<div>
	    <h1>Country Information</h1>
	    <p>find countries</p>
	    <Filter term={search} termChange={searchCountries} />
	    <ul>
		{ filterCountries }
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
