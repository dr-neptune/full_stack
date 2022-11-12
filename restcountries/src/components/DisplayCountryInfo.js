import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountryInfo = (props) => {
    
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
	<span style={{fontSize: 300}}>{ props.flag }</span>
	</div>
    )
}

export default DisplayCountryInfo;
