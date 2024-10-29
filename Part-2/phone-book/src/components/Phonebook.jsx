import contactServices from '../services/server'

const Phonebook = ({ persons, setPersons }) => {
    const removeContact = (id) => {
        if (window.confirm('Are you sure you want to remove contact from phonebook?')) {
            contactServices
                .remove(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                    console.log(`Contact with ID ${id} removed successfully`)
                })
                .catch(error => {
                    console.log(`Error removing contact:`, error)
                })
        }
    }

    return (
        <div>
            <h2>Numbers</h2>
            {persons.map((person, index) => {
                return (
                    <p key={person.id || index}>
                        {person.name} {person.number}
                        <button onClick={() => removeContact(person.id)}>Delete Contact</button>
                    </p>
                )
            }
            )}
        </div>
    )
}

export default Phonebook