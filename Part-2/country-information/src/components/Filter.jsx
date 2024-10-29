const Filter = ({ searchCountry, changeSearch }) => {
    return (
        <div>
            find countries <input value={searchCountry} onChange={changeSearch} />
        </div>
    )
}

export default Filter