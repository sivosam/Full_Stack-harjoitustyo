const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const path = '/api/blogs'


beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get(path)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const res = await api
    .get(path)

  expect(res.body.length).toBe(initialBlogs.length)
})

test('a blog can be added', async () => {
  const newBlog = {
    title: "Peter's blog",
    url: "google.com"
  }

  await api
    .post(path)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get(path)

  const contents = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(contents).toContain("Peter's blog")
})


describe('adding faulty blogs', async () => {
  beforeAll(async () => {
    await Blog.remove({})
  })

  test('a blog with undefined likes has 0 likes', async () => {
    const newBlog = {
      title: "Steve's blog",
      url: "bbc.com"
    }

    await api
      .post(path)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get(path)

    const blog = response.body[0]

    expect(blog.likes).toBe(0)

  })

  test('a blog without title and/or url is not added', async () => {
    const newBlog = {
      author: 'Steve'
    }

    const initialBlogs = await api
      .get(path)

    await api
      .post(path)
      .send(newBlog)
      .expect(400)

    const response = await api
      .get(path)

    expect(response.body.length).toBe(initialBlogs.body.length)
  })
})

describe('deleting a blog', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: "Paul's blog",
      url: "hs.fi"
    })
    await addedBlog.save()
  })

  test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
    const initialBlogs = await api
      .get(path)

    await api
      .delete(`${path}/${addedBlog._id}`)
      .expect(204)

      const response = await api
      .get(path)

      const contents = response.body.map(b => b.title)

      expect(contents).not.toContain(addedBlog.title)
      expect(response.body.length).toBe(initialBlogs.body.length - 1)
  })
})

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

afterAll(() => {
  server.close()
})