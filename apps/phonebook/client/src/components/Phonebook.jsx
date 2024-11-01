const Phonebook = ({ persons, removeContact }) => {
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