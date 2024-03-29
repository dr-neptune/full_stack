import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import telecom from './services/numbers'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [message, setMessage] = useState(null)

    const getData = () => {
	telecom.getAll()
	       .then(numbers => setPersons(numbers))
    }

    useEffect(getData, [])
    
    const notificationMessage = (message, notifType) => {
	if (message === null) {
	    setMessage(null)
	} else {
	    setMessage(<Notification message={message} notifType={notifType} />)
	}
    }
    
    const addName = (event) => {
	event.preventDefault()

	if (persons.some(name => name.name === newName)) {
	    if (window.confirm(`${newName} is already added to the phonebook.` + 
			       '\nReplace the number with a new one?')) {

		const personId = persons.filter(n => n.name === newName)[0].id

		const newPerson = {name: newName, number: newNumber, id: personId}
		
		telecom.update(personId, newPerson)
		       .then(response => {
			   notificationMessage(`Person: '${newName}' was updated with number: ${newNumber}`,
					       'notice info')
			   setTimeout(() => {
			       setMessage(null)
			   }, 5000)
			   getData()
		       })
		       .catch(error => {
			   notificationMessage(error.response.data.error,
					   'notice error')
			   setTimeout(() => {
			       setMessage(null)
			   }, 5000)
		       })
	    }
	} else {
	    const nameObject = {
		name: newName,
		number: newNumber
	    }
	    
	    telecom.create(nameObject)
		   .then(returnedName => {
		       setPersons(persons.concat(nameObject))
		       setNewName('')
		       setNewNumber('')
		       notificationMessage(`Person: '${newName}' was added with number: ${newNumber}`,
					   'notice success')
		       setTimeout(() => {
			   setMessage(null)
		       }, 5000)
		   })
		   .catch(error => {
		       console.log(error.response.data.error)
		       notificationMessage(error.response.data.error,
					   'notice error')
		       setTimeout(() => {
			   setMessage(null)
		       }, 5000)
		   })
	}
    }

    const deleteName = (name) => () => {
	if (window.confirm(`Delete ${name}?`)) {
	    console.log('boom!')
	    const toBeDeleted = persons.filter(person => person.name === name)[0].id
	    
	    telecom.deleteItem(toBeDeleted)
		   .then(response => {
		       setPersons(persons.filter(person => person.id !== toBeDeleted))
		       notificationMessage(`Person '${name}' was removed`,
					   'notice warning')
		       setTimeout(() => {
			   setMessage(null)
		       }, 5000)
		   })
	}
    }
    
    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const searchNames = (event) => setSearchTerm(event.target.value)
    
    return (
	<div>
	    <h2>Phonebook</h2>
	    {message}
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
