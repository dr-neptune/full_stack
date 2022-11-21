import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => axios.post(baseUrl, newObject).then(response => response.data)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)

export default {
    getAll,
    create,
    update
}
