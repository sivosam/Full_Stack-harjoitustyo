import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Table, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert, ButtonToolbar, ButtonGroup } from 'react-bootstrap'


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>
              by {anecdote.author}
            </td>
          </tr>)}
      </tbody>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={4}>
          <p>According to Wikipedia:</p>
          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>
        </Col>
        <Col xs={6} md={4}>
          <img width={200} height={278} src="https://goo.gl/67qs4q" alt="nimi" />
        </Col>
      </Row>
    </Grid>

    <br />
    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>



  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup style={submitStyle}>
            <ControlLabel>Content: </ControlLabel>
            <FormControl
              type="text"
              name="content"
            />
            <ControlLabel>Author: </ControlLabel>
            <FormControl
              type="text"
              name="author"
            />
            <ControlLabel>URL for more info: </ControlLabel>
            <FormControl
              type="text"
              name="info"
            />
          </FormGroup>

          <Button bsStyle="info" type="submit">Create</Button>
        </form>
      </div>
    )

  }
}

const notificationStyle = {
  color: '#78a3d8',
  fontStyle: 'italic',
  fontSize: 20,
  padding: 2,
  background: 'white'
}

const navStyle = {
  color: '#78a3d8',
  background: 'white',
  borderRadius: 2,
  padding: 2
}

const navBarStyle = {
  background: '#78a3d8',
  borderRadius: 5,
  fontStyle: 'italic',
  paddingLeft: 10,
  paddingTop: 1
}

const submitStyle = {
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: 'a new anecdote ' + anecdote.content + ' created!'
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <div style={navBarStyle}>
              <h1>Software anecdotes</h1>

              <ButtonToolbar>
                <ButtonGroup >
                  <Button><NavLink exact to="/" activeStyle={navStyle}>anecdotes</NavLink></Button>
                  <Button><NavLink exact to="/create" activeStyle={navStyle}>create new</NavLink></Button>
                  <Button><NavLink exact to="/about" activeStyle={navStyle}>about</NavLink></Button>
                </ButtonGroup>
              </ButtonToolbar>
              {(this.state.notification && <Alert bsStyle="success">{this.state.notification}</Alert>)}


            </div>
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({ history }) => <CreateNew addNew={this.addNew} history={history} />} />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
          </div>


        </Router>
        <br />
        <Footer />
      </div>
    );
  }
}

export default App;
