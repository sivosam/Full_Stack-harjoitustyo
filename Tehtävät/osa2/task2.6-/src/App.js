import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: "040-123456"
        },
        {
          name: "Pekka Jaakkola",
          number: "09-123"
        },
        {
          name: "Arto Vuori",
          number: "050-123424"
        }
      ],
      newName: '',
      newNumber: '',
      filter: ""
    }
  }

  addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    let duplicate = false

    this.state.persons.forEach(function (e) {
      if (e.name === nameObject.name) {
        alert("Nimi on jo listalla")
        duplicate = true
      }
    })
    if (!duplicate) {
      const persons = this.state.persons.concat(nameObject)

      this.setState({
        persons,
        newName: "",
        newNumber: ""
      });
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


  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
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

        <NumberList state={this.state} />
      </div>
    )
  }
}

const NumberList = (props) => {
  const filterList = props.state.persons.filter(p => p.name.includes(props.state.filter))
  return (
    <ul>{filterList.map(person => <li key={person.name}>{person.name} {person.number}</li>)}</ul>
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