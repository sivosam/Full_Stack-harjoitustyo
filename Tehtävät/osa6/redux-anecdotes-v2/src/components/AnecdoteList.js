import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { changeNotification } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = () => {
      const { anecdotes, filter } = this.props.store.getState()
      if (filter === '') {
        return anecdotes
      }
      return anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
    }
    return (
      <div>

        {anecdotes().sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(anecdoteVote(anecdote.id))
                this.props.store.dispatch(changeNotification(`you voted '${anecdote.content}'`))
                setTimeout(() => {
                  this.props.store.dispatch(changeNotification(''))
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

export default AnecdoteList
