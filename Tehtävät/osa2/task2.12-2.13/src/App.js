import React from 'react';
import './App.css';
import Axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      filter: "",
      click: ""
    }
  }

  componentDidMount() {
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data });
      })
  }

  handeFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  }



  render() {
    const filterList = this.state.countries.filter(c => c.name.toUpperCase().includes(this.state.filter.toUpperCase()))
    if (filterList.length > 10) {
      return (
        <div >
          Find countries: <input value={this.state.filter} onChange={this.handeFilterChange}
          />

          <p>Too many countries to display, specify another filter</p>

        </div>
      )
    }
    if (filterList.length === 1) {
      let c = filterList[0]
      return (
        <div >
          Find countries: <input value={this.state.filter} onChange={this.handeFilterChange}
          />
          <h1>{c.name}</h1>
          <div>
            <p>Capital: {c.capital}</p>
            <p>Population: {c.population}</p>
            <img src={c.flag} width="590" height="360" />
          </div>

        </div>
      )
    }
    return (
      <div>
        Find countries: <input value={this.state.filter} onChange={this.handeFilterChange}
        />

        <ul>{filterList.map(c => <li key={c.name}>{c.name}</li>)}</ul>

      </div>
    );
  }
}

export default App;
