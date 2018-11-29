import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

const createNew = async (content) => {
  const res = await axios.post(url, { content, id: getId(), votes: 0 })
  return res.data
}

const update = async (id, newObj) => {
  const res = await axios.put(`${url}/${id}`, newObj)
  return res.data
}

export default { getAll, createNew, update }