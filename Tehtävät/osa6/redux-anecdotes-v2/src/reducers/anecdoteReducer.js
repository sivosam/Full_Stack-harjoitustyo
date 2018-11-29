const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    case 'CREATE':
      return [...store, { content: action.content}]
    case 'INIT':
      return action.content
    default:
      return store
  }
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    content,
  }
}

export const anecdoteInit = (content) => {
  return {
    type: 'INIT',
    content
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export default anecdoteReducer 