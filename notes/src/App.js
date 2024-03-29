import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [message, setMessage] = useState(null)

    useEffect(() => {
	noteService
	    .getAll()
	    .then(initialNotes => setNotes(initialNotes))
    }, [])

    const notificationMessage = (message, notifType) => {
	if (message === null) {
	    setMessage(null)
	} else {
	    setMessage(<Notification message={message} notifType={notifType} />)
	}
    }
    
    const toggleImportanceOf = id => {
	const note = notes.find(n => n.id === id)
	const changedNote = { ...note, important: !note.important }

	noteService
	    .update(id, changedNote)
	    .then(returnedNote => setNotes(notes.map(note => note.id !== id ? note : returnedNote)))
    }
    
    const addNote = event => {
	event.preventDefault()

	const noteObject = {
	    content: newNote,
	    date: new Date().toISOString(),
	    important: Math.random() < 0.5
	}
	
	noteService
	    .create(noteObject)
	    .then(returnedNote => {
		setNotes(notes.concat(returnedNote))
		setNewNote('')
		notificationMessage(`Note '${newNote}' was added`,
				    'notice success')
	    })
    }

    const handleNoteChange = (event) => setNewNote(event.target.value)

    const notesToShow = showAll
		      ? notes
		      : notes.filter(note => note.important)
    
    return (
	<div>
	    <h1>Notes</h1>
	    {message}
	    <div>
		<button onClick={() => setShowAll(!showAll)}>
		    show {showAll ? 'important' : 'all'}
		</button>
	    </div>
	    <ul>
		{notesToShow.map(note => <Note key={note.id}
					       note={note}
					       toggleImportance={() => toggleImportanceOf(note.id)} />)}
	    </ul>
	    <form onSubmit={addNote}>
		<input value={newNote} onChange={handleNoteChange} />
		<button type="submit">save</button>
	    </form>
	    <Footer />
	</div>
    )
}

export default App;
