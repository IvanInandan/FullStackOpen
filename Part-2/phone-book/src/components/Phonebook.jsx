const Phonebook = ({ persons }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map((person, index) => (
                <p key={index}>{person.name} {person.number}</p>
            ))}
        </div>
    )
}

export default Phonebook