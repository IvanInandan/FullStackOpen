import { useEffect, useState } from 'react'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import Contact from './components/Contact'
import Notification from './components/Notification'
import contactServices from './services/server.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const phonebook = persons.filter(person => person.name?.includes(searchName))
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState()

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

    if (newName === '') { // Blank Name
      alert(`Name cannot be blank!`)
    } else if (nameExists) { // If name exist in phone, update phone number
      if (window.confirm(`${newName} already exists in the phonebook. Do you want to edit their number?`)) {
        const contactMatch = persons.find(person => person.name === newName)
        const changedContact = { ...contactMatch, number: newNumber }

        contactServices
          .update(changedContact.id, changedContact)
          .then(response => {
            setPersons(persons.map(person => person.id !== changedContact.id ? person : changedContact)) // Changed from response -> changedContact
            setNewName('')
            setNewNumber('')

            // Handle notification message 
            setSuccess(true)
            setMessage(`Number for '${changedContact.name}' has been changed to ${changedContact.number}`)
            setTimeout(() => { // After five seconds, erase error message
              setSuccess(null)
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setSuccess(false)
            setMessage(`ERROR: ${contactMatch.name} does not exist in the server. Please refresh page`)
            setTimeout(() => {
              setSuccess(null)
              setMessage(null)
            }, 5000)
          })
      }
    } else { // If name does not exist, add phone number
      const contact = { name: newName, number: newNumber }

      contactServices
        .create(contact)
        .then(response => {
          setPersons([...persons, response])
          setNewName('')
          setNewNumber('')

          // Handle notification message
          setSuccess(true)
          setMessage(`Contact: "${response.name}" was added to the phonebook!`)
          setTimeout(() => { // After five seconds, erase error message
            setSuccess(null)
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log('failed to add')
          setSuccess(false)
          setMessage(`ERROR: Problem adding ${contact.name} to server`)
          setTimeout(() => {
            setSuccess(null)
            setMessage(null)
          }, 5000)
        })
    }
  }

  const removeContact = (id) => {
    if (window.confirm('Are you sure you want to remove contact from phonebook?')) {
      contactServices
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccess(true)
          setMessage(`Contact with ID ${id} has been removed successfully`)
          setTimeout(() => {
            setSuccess(null)
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setSuccess(false)
          setMessage(`ERROR: Contact ${id} has does not exist in the server`)
          setTimeout(() => {
            setSuccess(null)
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} success={success} />
      <Filter searchName={searchName} changeSearch={changeSearch} />
      <Contact
        newName={newName} changeName={changeName}
        newNumber={newNumber} changeNumber={changeNumber}
        addContact={addContact}
      />
      <Phonebook
        persons={phonebook}
        removeContact={removeContact}
      />
    </div>
  )
}

export default App