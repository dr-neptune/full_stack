import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => axios.post(baseUrl, newObject).then(response => response.data)

const update = (name, newObject) => axios.put(`${baseUrl}/${name}`, newObject).then(response => response.data)

const deleteItem = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data)

export default {
    getAll,
    create,
    update,
    deleteItem
}
