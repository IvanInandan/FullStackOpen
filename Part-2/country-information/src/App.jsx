import { useState, useEffect } from 'react'
import countryService from './services/server.js'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    countryService 
      .getAll()
      .then((response) => {
        setCountries(response)
        console.log(`server connection success!`)
      })
      .catch((error) => console.log(`failed to connect to server`))
  }, [])

  const displayedCountries = countries.filter(country => 
    country.name.common?.includes(searchCountry)
  )

  const changeSearch = (event) => {
    setSearchCountry(event.target.value)
  }
  
  return (
    <div>
      <Filter searchCountry={searchCountry} changeSearch={changeSearch} />
      <h1>Countries</h1>
      <Countries countries={displayedCountries} />
    </div>
  )
}

export default App