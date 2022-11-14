import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import telecom from './services/numbers'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const getData = () => {
	telecom.getAll()
	       .then(numbers => setPersons(numbers))
    }

    useEffect(getData, [])
    
    const addName = (event) => {
	event.preventDefault()

	if (persons.some(name => name.name === newName)) {
	    if (window.confirm(`${newName} is already added to the phonebook.` + 
			       '\nReplace the number with a new one?')) {

		const newPerson = {name: newName, number: newNumber, id: newName}
		
		telecom.update(newName, newPerson)
		       .then(response => getData())
	    }
	} else {
	    const nameObject = {
		id: newName,
		name: newName,
		number: newNumber
	    }
	    
	    telecom.create(nameObject)
		   .then(returnedName => {
		       setPersons(persons.concat(nameObject))
		       setNewName('')
		       setNewNumber('')
		   })
	}
    }

    const deleteName = (name) => () => {
	if (window.confirm(`Delete ${name}?`)) {
	    console.log('boom!')
	    telecom.deleteItem(name)
		   .then(response => {
		       setPersons(persons.filter(person => person.name !== name))
		   })
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
	    <Persons persons={persons} searchTerm={searchTerm} deletePerson={deleteName} />
	</div>
    )
}

export default App;
