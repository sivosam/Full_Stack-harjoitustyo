import React from 'react'
import Person from './components/Person'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: "",
      message: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response });
      })
  }


  addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    let person = this.state.persons.find(p => p.name === nameObject.name)

    if (person === undefined) {
      personService
        .create(nameObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response),
            message: this.state.newName + " lisätty",
            newName: '',
            newNumber: ''
          })
          clearTimeout()
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000)
        })
    } else {
      if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const updatedPerson = { ...person, number: nameObject.number }

        personService
          .update(person._id, nameObject)
          .then(response => {
            const persons = this.state.persons.filter(p => p._id !== person._id)
            this.setState({
              persons: persons.concat(updatedPerson),
              message: updatedPerson.name + " päivitetty"
            })
            setTimeout(() => {
              this.setState({ message: null })
            }, 5000)
          }).catch(e => {
            const persons = this.state.persons.filter(p => p._id !== person._id)
            this.setState({
              message: "Kyseistä henkilöä ei enää löydy",
              persons
            })
            setTimeout(() => {
              this.setState({ message: null })
            }, 5000)
          })


      }
    }
  }


  handeNameChange = (event) => {
    this.setState({ newName: event.target.value });
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value });
  }
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  }

  deleteName = (id) => {
    const x = this.state.persons.find(p => p._id === id)
    return () => {
      personService
        .deletePerson(id)
        .then(response => {
          const persons = this.state.persons.filter(p => p._id !== id)
          this.setState({
            persons: persons,
            message: x.name + " poistettu"
          })
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }


  render() {
    const filterList = this.state.persons.filter(p => p.name.toUpperCase().includes(this.state.filter.toUpperCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.message} />
        <Filter state={this.state} onChange={this.handleFilterChange} />
        <h3>Lisää uusi</h3>
        <form onSubmit={this.addName}>
          <div>
            Nimi: <input
              value={this.state.newName}
              onChange={this.handeNameChange} />
          </div>
          <div>
            Numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange} />
          </div>
          <div>

            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>

        <table>
          <tbody>
            {filterList.map(p =>
              <Person
                key={p._id}
                person={p}
                buttonHandler={this.deleteName(p._id)} />)}

          </tbody>

        </table>

        {/* <NumberList state={this.state} /> */}
      </div>
    )
  }
}

//Ei millään suostunut toimimaan henkilön poistaminen kun oli erillisenä komponenttina tää lista...

// const NumberList = (props) => {
//   const filterList = props.state.persons.filter(p => p.name.toUpperCase().includes(props.state.filter.toUpperCase()))
//   return (
//     <table>
//       <tbody>
//         {filterList.map(p =>
//           <Person key={p.id}
//             person={p}
//             buttonHandler={deleteName(p.id)} />
//         )}
//       </tbody>

//     </table>

//   )
// }

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      Rajaa listaa: <input
        value={props.state.filter}
        onChange={props.onChange} />
    </div>
  )
}


export default App