const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const fullArgs = process.argv.length > 3

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://fullstacker:${password}@bigclust.ezfzxbh.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (fullArgs) {
    mongoose
	.connect(url)
	.then((result) => {
	    console.log('connected')

	    const person = new Person({
		id: Math.floor(Math.random() * 1000),
		name: personName,
		number: personNumber,
	    })

	    return person.save()
	})
	.then(() => {
	    console.log(`added Person: ${personName} Number: ${personNumber} to phonebook`)
	    return mongoose.connection.close()
	})
	.catch((err) => console.log(err))
} else {
    mongoose
	.connect(url)
	.then((result) => {
	    Person.find({}).then(result => {
		console.log('phonebook:\n:Name\t\t\t:Number')
		result.forEach(person => {
		    console.log(`${person.name}\t\t${person.number}\t\t`)
		})
		mongoose.connection.close()
	    })
	})
	.catch((err) => console.log(err))
}
