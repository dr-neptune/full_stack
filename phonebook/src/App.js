import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const getData = () => {
	axios.get('http://localhost:3001/persons')
	     .then(response => setPersons(response.data))
    }

    useEffect(getData, [])
    
    const addName = (event) => {
	event.preventDefault()

	if (persons.some(name => name.name === newName)) {
	    alert(`${newName} is already added to the phonebook`)
	} else {
	    const nameObject = {
		name: newName,
		number: newNumber
	    }

	    setPersons(persons.concat(nameObject))
	    setNewName('')
	    setNewNumber('')
	}
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const searchNames = (event) => setSearchTerm(event.target.value)
    
    return (
	<div>
	    <h2>Phonebook</h2>
	    <PersonForm name={newName}
		nameChange={handleNameChange}
		number={newNumber}
		numberChange={handleNumberChange}
		buttonClick={addName} />
	    <h2>Numbers</h2>
	    <Filter term={searchTerm} termChange={searchNames} />
	    <Persons persons={persons} searchTerm={searchTerm} />
	</div>
    )
}

export default App;
