import axios from 'axios'
const baseUrl = 'http://localhost:3002/log'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (name, newObject) => {
  const request = axios.put(`${baseUrl}/${name}`, newObject)
  return request.then(response => response.data)
}

const remove  = (name) => {
    const request = axios.delete(`${baseUrl}/${name}`)
    return request.then(console.log(`Deleted post with ID ${id}`))
} 


export default { getAll, create, update, remove }