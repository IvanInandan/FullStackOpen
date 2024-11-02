require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const People = require('./models/phonebook.js')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'))

app.get('/api/persons', (req, res) => {
    People.find({}).then(person => {
        res.json(person)
    })
})

app.get('/api/info', (req, res, next) => {
    const currentDate = new Date().toLocaleString()

    People
        .collection.countDocuments()
        .then(count => {
            res.send(`
                <p>Phonebook has info for ${count} people</p>
                <p>${currentDate}</p>
            `)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    People
        .findById(req.params.id)
        .then(found => {
            if (!found) {
                res.status(404).json({ error: 'id not found' })
            } else {
                res.json(found)
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    People.findByIdAndDelete(req.params.id).then(result => {
        if (result) {
            res.status(204).end()
        } else {
            res.status(400).send({ error: 'id not found' })
        }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    console.log(body)

    const person = new People({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(response => {
            res.json(response)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number,
    }

    People
        .findByIdAndUpdate(req.params.id, person, { new: true })
        .then(result => {
            res.json(result)
        })
        .catch(error => next(error))
})

app.use((err, req, res, next) => {
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted ID' })
    } else if (err.name === 'ValidationError') { 
        return res.status(400).send(err.message)
    }
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})