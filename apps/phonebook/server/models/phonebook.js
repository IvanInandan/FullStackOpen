const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
.then(response => {
    console.log('success!')
})
.catch(error => {
    console.log('failure: ', error)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: (v) => {
                return /^(?:[0-9]{2}-[0-9]{6,}|[0-9]{3}-[0-9]{5,})$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'user phone number required']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('People', personSchema)