import React from 'react'
import NoteForm from './components/NoteForm.js'
import NoteList from './components/NoteList.js'
import VisibilityFilter from './components/VisibilityFilter'
import { connect } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

class App extends React.Component {
  componentWillMount() {
    this.props.initializeNotes()
  }

  render() {
    return (
      <div>
        <NoteForm />
        <VisibilityFilter />
        <NoteList />
      </div>
    )
  }
}

export default connect(
  null,
  { initializeNotes }
)(App)