import { useEffect, useState } from 'react'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import Contact from './components/Contact'
import contactServices from './services/server.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const phonebook = persons.filter(person => person.name?.includes(searchName))

  useEffect(() => {
    contactServices
      .getAll()
      .then((response) => setPersons(response))
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
    
    if ( newName === '' ) {
      alert(`Name cannot be blank!`)
    } else if (nameExists) {
      const contactMatch = persons.find(person => person.name === newName)
      const changedContact = { ...contactMatch, number: newNumber }

      contactServices
        .update(changedContact.id, changedContact)
        .then(response => {
          setPersons(persons.map(person => person.id !== changedContact.id ? person : response))
          setNewName('')
          setNewNumber('')
          console.log(`Changed ${changedContact.name}'s contact number to ${changedContact.number}`)
        })
        .catch(error => {
          console.log(`Update failed!`)
        })
    } else {
      const contact = { name: newName, number: newNumber }

      contactServices
        .create(contact)
        .then(response => {
          setPersons([...persons, response])
          setNewName('')
          setNewNumber('')
          console.log(`Contact: "${response.name}" was added to the phonebook!`)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchName={searchName} changeSearch={changeSearch} />
      <Contact 
      newName={newName} changeName={changeName}
      newNumber={newNumber} changeNumber={changeNumber}
      addContact={addContact}
      />
      <Phonebook persons={phonebook} setPersons={setPersons} />
    </div>
  )
}

export default App