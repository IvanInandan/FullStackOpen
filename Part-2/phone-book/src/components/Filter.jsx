const Filter = ({ searchName, changeSearch }) => (
    <div>
        <h2>Search</h2>
        <div>
            filter shown with <input value={searchName} onChange={changeSearch} />
        </div>
    </div>
)

export default Filter