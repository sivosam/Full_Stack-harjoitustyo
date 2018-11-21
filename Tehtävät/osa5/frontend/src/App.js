import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }

  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (ex) {
      this.setState({
        message: 'invalid username or password'
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      blogService.create(blogObject)
      this.setState({ message: `a new blog '${blogObject.title}' by ${blogObject.author} added` })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
      this.setState({
        blogs: this.state.blogs.concat(blogObject),
        title: '',
        author: '',
        url: ''
      })
    } catch (ex) {
      console.log(ex)
    }

  }


  render() {

    const loginForm = () => (
      <div>
        <h2>Login</h2>

        <Notification message={this.state.message} className="message" />

        <form onSubmit={this.login}>
          <div>
            Username:
          <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange} />
          </div>
          <div>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div >
    )

    const blogForm = () => (
      <div>
        <h2>Blogs</h2>

        <Notification message={this.state.message} className="confirm" />

        <p>{this.state.user.name} logged in <button onClick={this.logout}>Logout</button></p>

        <h2>Add a new blog</h2>
        <form onSubmit={this.addBlog}>
          <div>
            Title:
          <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange} />
          </div>
          <div>
            Author:
          <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange} />
          </div>
          <div>
            URL:
          <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange} />
          </div>
          <button type="submit">Add</button>
        </form>

        <div>
          {this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog} />
          )}</div>

      </div>
    )

    return (
      <div>
        {this.state.user === null ?
          loginForm() : blogForm()}
      </div>
    );
  }
}

export default App;
