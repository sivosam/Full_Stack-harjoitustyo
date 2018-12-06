import axios from 'axios'
const url = '/api/users'

const getAll = () => {
  const req = axios.get(url)
  return req.then(res => res.data)
}

export default { getAll }