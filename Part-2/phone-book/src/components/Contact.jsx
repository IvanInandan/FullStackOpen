const Contact = ({ newName, changeName, newNumber, changeNumber, addContact }) => (
    <form>
        <h2>Add contact</h2>
        <div>
            name: <input value={newName} onChange={changeName} />
        </div>
        <div>
            number: <input value={newNumber} onChange={changeNumber} />
        </div>
        <div>
            <button type="submit" onClick={addContact}>add</button>
        </div>
    </form>
)

export default Contact