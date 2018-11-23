import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

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

  updateBlog = async (id) => {
    const x = this.state.blogs.find(b => b._id === id)

    try {
      const updatedBlog = {
        title: x.title,
        author: x.author,
        url: x.url,
        user: x.user,
        likes: x.likes + 1
      }
      blogService.update(id, updatedBlog)
    } catch (ex) {
      console.log(ex)
    }
  }


  render() {

    const loginForm = () => (
      <LoginForm
        visible={this.state.visible}
        username={this.state.username}
        password={this.state.password}
        handleChange={this.handleFieldChange}
        handleSubmit={this.login} />
    )

    const blogForm = () => (
      <Togglable buttonLabel="Add">
        <BlogForm
          visible={this.state.visible}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleChange={this.handleFieldChange}
          handleSubmit={this.addBlog} />
      </Togglable>
    )
    this.state.blogs.sort((a, b) => {
      return b.likes - a.likes
    })

    return (
      <div>
        {this.state.user === null ?
          <div>
            <h2>Login</h2>
            <Notification message={this.state.message} className="error" />
            {loginForm()}
          </div>
          :
          <div>
            <h2>Blogs</h2>
            <Notification message={this.state.message} className="confirm" />
            <p>{this.state.user.name} logged in <button onClick={this.logout}>Logout</button></p>

            {blogForm()}
            <div>
              {this.state.blogs.map(blog =>
                <Blog key={blog._id} blog={blog} handleUpdate={() => this.updateBlog(blog._id)} />
              )}</div>

          </div>
        }
      </div>
    );
  }
}

export default App;
