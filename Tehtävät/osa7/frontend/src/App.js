import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { changeNotification } from './reducers/notificationReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import userService from './services/user'


const BlogList = ({ list, like, remove, user }) => (
  <div>
    <h2>blogs</h2>
    {
      list.map(blog =>
        <Blog
          key={blog._id}
          blog={blog}
          like={like(blog._id)}
          remove={remove(blog._id)}
          deletable={blog.user === undefined || blog.user.username === user}
        />
      )
    }
  </div>
)

const UserList = ({ list }) => (
  <div>
    <h2>users</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs added</th>
        </tr>
      </thead>
      <tbody>
        {list.map(user =>
          <tr key={user._id}>
            <td><Link to={`users/${user._id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>)}
      </tbody>
    </table>

  </div>
)

const User = ({ user }) => {
  if (user === undefined) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <div>
        {user.blogs.map(b =>
          <li key={b._id}>{b.title} by {b.author}</li>)}
      </div>
    </div>
  )
}

const SingleBlog = ({ blog, like, comment, handleChange, remove }) => {
  if (blog === undefined) {
    return null
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes <button onClick={like(blog._id)}>like</button></p>
        <p>added by {blog.user.name}</p>
        <button onClick={remove(blog._id)}>delete</button>
      </div>
      <div>
        <h2>Comments</h2>
        {blog.comments.map((c, x) =>
          <li key={x}>{c}</li>)}
      </div>
      <form onSubmit={comment(blog._id)}>
        <input
          name='comment'
          onChange={handleChange}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      users: [],
      comment: ''
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    userService.getAll().then(users =>
      this.setState({ users }))
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  notify = (message, type = 'info') => {
    this.props.store.dispatch(
      changeNotification(message)
    )
  }

  like = (id) => async () => {
    const liked = this.state.blogs.find(b => b._id === id)
    const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated)
    this.notify(`you liked '${updated.title}' by ${updated.author}`)
    this.setState({
      blogs: this.state.blogs.map(b => b._id === id ? updated : b)
    })
  }

  addComment = (id) => async () => {
    const commentedBlog = this.blogById(id)
    const comment = this.state.comment
    const updatedBlog = { ...commentedBlog, comments: commentedBlog.comments.concat(comment) }
    this.notify(`comment '${comment}' added to blog '${commentedBlog.title}'`)
    this.setState({ comment: '' })
    await blogService.update(id, updatedBlog)
  }

  remove = (id) => async () => {
    const deleted = this.state.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if (ok === false) {
      return
    }

    await blogService.remove(id)
    this.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
    this.setState({
      blogs: this.state.blogs.filter(b => b._id !== id)
    })
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }

    const result = await blogService.create(blog)
    this.notify(`blog '${blog.title}' by ${blog.author} added`)
    this.setState({
      title: '',
      url: '',
      author: '',
      blogs: this.state.blogs.concat(result)
    })
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out')
    this.setState({ user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('welcome back!')
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  userById = (id) => this.state.users.find(u => u._id === id)
  blogById = (id) => this.state.blogs.find(b => b._id === id)

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification />
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsInOrder = this.state.blogs.sort(byLikes)

    return (
      <div className="container">
        <Router>
          <div>
            <Notification notification={this.props.store.getState()} />
            <div>
              <Link to={"/create"}>blogs</Link> &nbsp;
              <Link to={"/users"}>users</Link> &nbsp;
              {this.state.user.name} logged in <button onClick={this.logout}>logout</button>
            </div>


            <Togglable buttonLabel='uusi blogi'>
              <BlogForm
                handleChange={this.handleChange}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                handleSubmit={this.addBlog}
              />
            </Togglable>

            <Route path="/create" render={() => <BlogList list={blogsInOrder} like={this.like} remove={this.remove} user={this.state.user.username} />} />
            <Route exact path="/users" render={() => <UserList list={this.state.users} />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={this.userById(match.params.id)} />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <SingleBlog blog={this.blogById(match.params.id)} like={this.like} comment={this.addComment} handleChange={this.handleChange} remove={this.remove} />} />
          </div>
        </Router>
      </div>

    )
  }
}

export default App;