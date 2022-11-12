const SearchOption = (props) => {
    console.log(props)
    const options = props.names.filter(country => country.toLowerCase().startsWith(props.searchTerm.toLowerCase()))
    const displayed = options.map(countryName => <li key={ countryName }>{ countryName }</li>) 
    return <div>{ displayed }</div>
}

export default SearchOption;
