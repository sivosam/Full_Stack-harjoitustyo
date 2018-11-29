import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from './../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    this.props.changeFilter(filter)
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

export default connect(
  null,
  { changeFilter }
)(Filter)