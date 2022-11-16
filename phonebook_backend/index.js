const express = require('express')
const app = express()

let persons = [
    { 
	"id": 1,
	"name": "Arto Hellas", 
	"number": "040-123456"
    },
    { 
	"id": 2,
	"name": "Ada Lovelace", 
	"number": "39-44-5323523"
    },
    { 
	"id": 3,
	"name": "Dan Abramov", 
	"number": "12-43-234345"
    },
    { 
	"id": 4,
	"name": "Mary Poppendieck", 
	"number": "39-23-6423122"
    }
]

// middleware
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}

app.use(express.json())
app.use(requestLogger)

// base page
app.get('/', (req, res) => {
    res.send('You betcha')
})

// get all data
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// get info on people
app.get('/info', (req, res) => {
    currDate = new Date()

    overview = `<div>
    <p>Phonebook has information for ${persons.length} people</p>
<br />
${currDate}
    </div>`
    res.send(overview)
})

// get a single person
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
	res.json(person)
    } else {
	res.status(404).end()
    }
})

// delete a single person
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(note => note.id !== id)

    res.status(204).end()
})

// add a single person
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name | !body.number) {
	return res.status(400).json({
	    error: 'name or number missing'
	})
    }

    if (persons.find(name => name.name === body.name)) {
	return res.status(400).json({
	    error: 'name already exists in phonebook'
	})
    }

    const person = {
	id: Number(Math.floor(Math.random()*10000)),
	name: body.name,
	number: body.number
    }

    persons = persons.concat(person)

    res.json(person)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint"})
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
