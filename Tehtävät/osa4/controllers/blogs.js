const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(Blog.format))
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(savedBlog))

  } catch (ex) {
    if (ex.name === 'JsonWebTokenError') {
      response.status(401).json({ error: ex.message })
    } else {
    console.log(ex)
    response.status(500).json({ error: 'oops' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (ex) {
    console.log(ex)
    response.status(400).send({ error: 'malformed id' })
  }
})

//ei toimi
blogsRouter.put('/:id', async (request, response) => {
  try {
    const updatedBlog = new Blog(request.body)

    await Blog.findOneAndUpdate({ _id: request.params._id }, { likes: updatedBlog.likes })
    response.json(Blog.format(updatedBlog))
  } catch (ex) {
    console.log(ex)
    response.status(400).send({ error: 'oops' })
  }
})

module.exports = blogsRouter