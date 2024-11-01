const mongoose = require('mongoose')

/*if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
*/

const url =
  `mongodb+srv://iinandan97:b9Hjref217909y!@notes.oq2i5.mongodb.net/notesApp?retryWrites=true&w=majority&appName=notes`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({ important: true }).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

/*
const note = new Note({
  content: 'FullStackOpen is cool!',
  important: false,
})

note.save().then(result => {
  console.log('note saved!', result)
  mongoose.connection.close()
})
*/