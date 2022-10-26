import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => 
    axios
    .get(baseUrl)
    .then(response => response.data)

const update = (id, person) => 
    axios
    .put(`${baseUrl}/${id}`, person)
    .then(response => response.data)

const create = (person) => 
    axios
    .post(baseUrl, person)
    .then(response => response.data)

const deletePerson = (id) => 
    axios
    .delete(`${baseUrl}/${id}`)

export default {getAll, update, create, deletePerson} 