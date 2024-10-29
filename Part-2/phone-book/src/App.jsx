import { useEffect, useState } from 'react'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import Contact from './components/Contact'
import axios from 'axios'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log(response)
      })
  }, [])

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const changeSearch = (event) => {
    setSearchName(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
localStorage
    if (nameExists) {
      alert(`${newName} already exists in the phonebook!`)
    } else if (newName === '') {
      alert(`Name cannot be blank!`)
    } else {
      setPersons([...persons, { name: newName, number: newNumber }])
      setNewName('')
      setNewNumber('')
    }
  }

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const phonebook = persons.filter(person => person.name.includes(searchName))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchName={searchName} changeSearch={changeSearch} />
      <Contact 
      newName={newName} changeName={changeName}
      newNumber={newNumber} changeNumber={changeNumber}
      addContact={addContact}
      />
      <Phonebook persons={phonebook} />
    </div>
  )
}

export default App