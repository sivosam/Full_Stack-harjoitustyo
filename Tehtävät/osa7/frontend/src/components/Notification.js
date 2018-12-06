import React from 'react'
// import { connect } from 'react-redux'

// const Notification = ({ notification }) => {
//   if (notification === null) {
//     return null
//   }

//   return (
//     <div className={notification.type}>
//       {notification.message}
//     </div>
//   )
// }

// export default Notification

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.notification}
      </div>
    )
  }
}

export default Notification

// export default connect(
//   (state) => ({notification: state.notification})
// ) (Notification)