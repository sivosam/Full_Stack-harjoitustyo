import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      newNote: "uusi muistiinpano",
      showAll: true,
      error: null
    }
  }

  componentDidMount() {
    noteService
      .getAll()
      .then(response => {
        this.setState({ notes: response });
      })

  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(response => {
        this.setState({
          notes: this.state.notes.concat(response),
          newNote: ''
        });
      })
  }

  handleNoteChange = (event) => {
    this.setState({ newNote: event.target.value });
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  toggleImportanceOf = (id) => {
    return () => {
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
        .update(id, changedNote)
        .then(response => {
          const notes = this.state.notes.filter(n => n.id !== id)
          this.setState({
            notes: notes.concat(changedNote)
          })
        })
        .catch(error => {
          console.log(error)
          this.setState({
            error: `muistiinpano '${note.content}' on jo poistettu palvelimelta`,
            notes: this.state.notes.filter(n => n.id !== id)
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        })
    }
  }

  render() {
    // const tulos = ehto ? val1 : val2
    const notesToShow =
      this.state.showAll ?
        this.state.notes :
        this.state.notes.filter(note => note.important === true)

    const label = this.state.showAll ? "vain tärkeät" : "kaikki"

    return (
      <div>
        <h1>Muistiinpanot</h1>

        <Notification message={this.state.error}/>

        <div>
          <button onClick={this.toggleVisible}>
            Näytä {label}
          </button>
        </div>

        <ul>
          {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={this.toggleImportanceOf(note.id)} />)}
        </ul>
        <form onSubmit={this.addNote}>
          <input value={this.state.newNote}
            onChange={this.handleNoteChange} />
          <button type="submit">Tallenna</button>
        </form>
      </div>
    )
  }
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App