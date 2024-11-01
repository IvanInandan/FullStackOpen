const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3] || null
const number = process.argv[4] || null

const url =
 `mongodb+srv://iinandan97:${password}@phonebook.9sqxg.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery', false)
mongoose.connect(url)

 // Define person schema
 const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
})

// Define person
const Person = mongoose.model('Person', personSchema)

if (password && (!name && !number)) { // If only password arg exists
  Person
    .find({})
    .then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
} else {
  // Create new entry
const person = new Person({
  name: name,
  number: number,
})

// Store entry into db
person
  .save()
  .then(response => {
    console.log(`Added ${person.name} ${person.number} into the phonebook`)
    mongoose.connection.close()
  })
  .catch(error => {
    console.log(`ERROR: ${error.message}`)
    mongoose.connection.close()
  })
}


