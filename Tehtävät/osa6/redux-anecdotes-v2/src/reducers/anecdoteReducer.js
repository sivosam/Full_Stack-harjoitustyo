import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    case 'CREATE':
      return [...store, { content: action.content, id: action.id, votes: 0}]
    case 'INIT':
      return action.content
    default:
      return store
  }
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      content: anecdotes
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      content: newAnecdote.content,
      id: newAnecdote.id
    })
  }
}

export const anecdoteVote = (id, updatedAnecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      id
    })
  }
}

export default anecdoteReducer 