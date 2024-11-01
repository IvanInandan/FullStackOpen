const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'))

let phonebook = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-532353"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-34-234345"
    },
    {
        id: "4",
        name: "Mary Poppendiek",
        number: "39-23-6423122"
    }
]

const generateId = () => {
    const randomId = Math.floor(Math.random() * 1000000).toString()
    return randomId
}

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
})

app.get('/api/info', (req, res) => {
    const currentDate = new Date().toLocaleString();

    res.send(`
        <p>Phonebook has info for ${phonebook.length} people</p>
        <p>${currentDate}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const found = phonebook.find(n => n.id === id)

    if (!found) {
        res.status(404).end()
    } else {
        res.json(found)
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const found = phonebook.find(person => person.id === id)

    if (found) {
        phonebook = phonebook.filter(person => person.id != id)
        return res.status(204).end();
    } else {
        return res.status(400).json({
            error: 'ID not found in phonebook'
        })
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.number || !body.name) {
        return res.status(400).json({
            error: 'Content is missing'
        })
    } else if (phonebook.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'Name already exists in phonebook'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    phonebook = phonebook.concat(person)
    res.json(person)
})

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const data = req.body
    const found = phonebook.find(person => person.id === id)

    if (!found) {
        return res.status(400).json({
            error: 'ID not found in phonebook'
        })
    }

    phonebook = phonebook.map(person => person.id !== id ? person : data)
    res.status(200).json({
        message: `Number for ${data.name} has been changed to ${data.number}`
    })
})

const PORT = process.env.port || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})