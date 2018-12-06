const initialNotification = null

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const changeNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }


  // return async (dispatch) => {
  //   dispatch({
  //     type: 'SET_NOTIFICATION',
  //     notification
  //   })
  //   setTimeout(() => {
  //     dispatch({
  //       type: 'SET_NOTIFICATION',
  //       notification: ''
  //     })
  //   }, time * 1000)
  // }
}

export default notificationReducer