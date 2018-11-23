import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anecdote: ''
    }
  }

  handleChange = (event) => {
    this.setState({ anecdote: event.target.value })
  }

  addAnecdote = (event) => {
    event.preventDefault()

    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: this.state.anecdote
    })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => {
          return b.votes - a.votes
        }).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input
            type='text'
            value={this.state.anecdote}
            onChange={this.handleChange}
          /></div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }
}

export default App