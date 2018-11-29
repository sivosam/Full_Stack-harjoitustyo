import noteService from '../services/notes'

const initialState = [
  { content: 'reduxin storen toiminnan määrittelee reduceri', important: true, id: 1 },
  { content: 'storen tilassa voi olla mielivaltaista dataa', important: false, id: 2 }
]

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { ...noteToChange, important: !noteToChange.important }
      return state.map(note => note.id !== id ? note : changedNote)
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const noteCreation = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const importanceToggling = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes
    })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote
    })
  }
}

export const toggleImportance = (note) => {
  return async (dispatch) => {
    const changedNote = {
      content: note.content,
      importance: !note.importance
    }

    await noteService.createNew(note.id, changedNote)
    dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: { id: note.id },
    })
  }
}

export default noteReducer