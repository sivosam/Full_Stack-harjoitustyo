import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken, create }