const Countries = ({ countries }) => {
    if (countries.length > 10) { // If search > 10
        return (
            <div>
                <p>Too many mathches, please narrow down search.</p>
            </div>
        )
    } else if (countries.length > 1 && countries.length <= 10) { // If search 2-10
        return (
            <div>
                {countries.map((country, index) => {
                    return (
                        <p key={index}>{country.name.common}</p>
                    )
                })}
            </div>
        )
    } else if (countries.length === 1) { // If single country is found
        const country = countries[0]
        const languages = Object.values(country.languages)

        return (
            <div>
                <p>Country: {country.name.common}</p>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h4>Languages: </h4>
                <ul>
                    {languages.map((language, index) => {
                        return (
                            <li key={index}>{language}</li>
                        )
                    })}
                </ul>
                <img src={country.flags.png}/>
            </div>
        )
    } else {
        return (
            <div>
                <p>No countries found!</p>
            </div>
        )
    }
}

export default Countries