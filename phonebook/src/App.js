import { useState } from 'react'

const Name = (props) => {
    return <p>{ props.text }</p>
}

const App = () => {
    const [persons, setPersons] = useState([
	{ name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addName = (event) => {
	event.preventDefault()

	const nameObject = {
	    name: newName
	}

	setPersons(persons.concat(nameObject))
	setNewName('')
    }

    const handleNameChange = (event) => {
	setNewName(event.target.value)
    }

    const names = persons.map(name => <Name key={name.name} text={name.name} />)
    
    return (
	<div>
	    <h2>Phonebook</h2>
	    <form>
		<div>
		    name: <input value={newName} onChange={handleNameChange} />
		</div>
		<div>
		    <button type="submit" onClick={addName}>add</button>
		</div>
	    </form>
	    <h2>Numbers</h2>
	    <div>
		{ names }
	    </div>
	</div>
    )
}

export default App;
