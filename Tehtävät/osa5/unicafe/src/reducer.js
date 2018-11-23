const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  sum: 0,
  klik: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1, klik: state.klik + 1, sum: state.sum + 1 }
    case 'OK':
      return { ...state, ok: state.ok + 1, klik: state.klik + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1, klik: state.klik + 1, sum: state.sum - 1 }
    case 'ZERO':
      return initialState
  }
  return state
}

export default counterReducer