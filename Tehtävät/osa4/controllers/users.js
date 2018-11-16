const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: "username must be unique" })
    }

    const passwordHash = await bcrypt.hash(body.password, 10)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      adult: body.adult
    })

    const savedUser = await user.save()

    response.json(User.format(savedUser))
  } catch (ex) {
    console.log(ex)
    response.status(500).json({ error: 'oops' })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {title: 1, author: 1})
  response.json(users.map(User.format))
})

module.exports = usersRouter