import React from 'react'
import { changeFilter } from './../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    this.props.store.dispatch(
      changeFilter(filter)
    )
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

export default Filter