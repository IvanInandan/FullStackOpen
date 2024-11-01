import axios from 'axios'
const baseUrl = '/api/persons' // Enable if launching from back-end
// const baseUrl = 'http://localhost:3001/api/persons' // Enbable if launching from front-end

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, contact) => {
    const request = axios.put(`${baseUrl}/${id}`, contact)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }