import axios from 'axios'
const baseUrl = 'http://localhost:3002/log'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(`${baseUrl}`, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove  = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(console.log(`Deleted post with ID ${id}`))
} 


export default { getAll, create, update, remove }