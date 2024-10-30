import Weather from './Weather'
import weatherServices from '../services/server.js'
import { useState, useEffect } from 'react'

const Countries = ({ countries, showCountry }) => {
    const [weather, setWeather] = useState('')
    const [main, setMain] = useState('')
    const [wind, setWind] = useState('')
    const [capital, setCapital] = useState('')

    useEffect(() => {
        if (countries.length === 1) {
            const country = countries[0]
            const capitalCity = country.capital[0]
            setCapital(capitalCity)

            weatherServices
                .getCoords(capitalCity)
                .then((response) => {
                    const lat = response[0].lat
                    const lon = response[0].lon

                    return weatherServices.getWeather(lat, lon)
                })
                .then((repsonse) => {
                    setWeather(response.weather)
                    setWind(response.wind)
                    setMain(response.main)
                })
                .catch((error) => {
                    console.log(`Error fetching weather data: `, error)
                })
        }
    }, [countries])

    if (countries.length > 10) { // If search > 10
        return (
            <div>
                <p>Too many mathches, please narrow down search.</p>
            </div>
        )
    } else if (countries.length > 1 && countries.length <= 10) { // If search 2-10
        return (
            <div>
                {countries.map((country) => {
                    return (
                        <div key={country.cca2}>
                            <p>
                                {country.name.common}
                                <button onClick={() => showCountry(country.name.common)}>show</button>
                            </p>
                        </div>
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
                <img src={country.flags.png} />
                <h4>Weather in {country.capital}</h4>
                { weather && main && wind ? (
                    <Weather weather={weather} main={main} wind={wind} />
                ) : (
                    <p>Loading weather data...</p>
                )}
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