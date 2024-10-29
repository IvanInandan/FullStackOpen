import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getCoords = (props) => {
    const api_key = import.meta.env.VITE_WEATHER_KEY
    const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${props}&appid=${api_key}`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const api_key = import.meta.env.VITE_WEATHER_KEY
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default { getAll, getCoords, getWeather }