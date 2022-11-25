const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// middleware
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const morganConfig = morgan(function (tokens, req, res) {

    const additionalInfo =
	  tokens.method(req, res) === 'POST' || tokens.method(req, res) === 'PUT'
	  ? JSON.stringify(req.body)
	  : ''

    return [
	tokens.method(req, res),
	tokens.url(req, res),
	tokens.status(req, res),
	tokens.res(req, res, 'content-length'), '-',
	tokens['response-time'](req, res), 'ms',
	additionalInfo
    ].join(' ')
})

app.use(morganConfig)

// base page
app.get('/', (_, response) => {
    response.send('You betcha')
})

// get all data
app.get('/api/persons', (_, response) => {
    Person.find({}).then(person => response.json(person))
})

// get info on people
app.get('/info', (_, response, next) => {
    Person.count({})
	.then(numPeople => {
	    const currDate = new Date()

	    const overview = `<div>
    <p>Phonebook has information for ${numPeople} people</p>
<br />
${currDate}
    </div>`
	    response.send(overview)
	})
	.catch(error => next(error))
})

// get a single person
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
	.then(person => response.json(person))
	.catch(error => next(error))
})

// delete a single person
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
	.then(_ => response.status(204).end())
	.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined) {
	return response.status(400).json({error: 'content missing'})
    }

    const person = new Person({
	name: body.name,
	number: body.number,
    })

    person.save()
	.then(savedPerson => response.json(savedPerson))
	.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(request.params.id, { name, number },
			     {new: true, runValidators: true, context: 'query'})
	.then(updatedPerson => response.json(updatedPerson))
	.catch(error => next(error))
})


const unknownEndpoint = (_, res) => {
    res.status(404).send({error: "unknown endpoint"})
}

app.use(unknownEndpoint)

const errorHandler = (error, _, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
	return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
	return response.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

app.listen(process.env.PORT || 3001)
