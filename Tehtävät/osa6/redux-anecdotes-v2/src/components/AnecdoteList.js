import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { changeNotification } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  voteAnecdote = async (id) => {
    const anecdoteToUpdate = this.props.visibleAnecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      content: anecdoteToUpdate.content,
      votes: anecdoteToUpdate.votes + 1
    }
    this.props.anecdoteVote(id, updatedAnecdote)
  }
  render() {
    return (
      <div>
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.voteAnecdote(anecdote.id)
                this.props.changeNotification(`you voted '${anecdote.content}'`, 5)
                setTimeout(() => {
                  this.props.changeNotification('')
                }, 5000)
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  anecdotes.sort((a, b) => b.votes - a.votes)
  if (filter === '') {
    return anecdotes
  }
  return anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { changeNotification, anecdoteVote }
)(AnecdoteList)
