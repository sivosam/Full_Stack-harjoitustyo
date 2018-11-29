import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { changeNotification } from './../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {

  addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.anecdoteCreation(newAnecdote.content)
    this.props.changeNotification(`you added '${newAnecdote.content}'`)
    setTimeout(() => {
      this.props.changeNotification(``)
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteCreation, changeNotification }
)(AnecdoteForm)
