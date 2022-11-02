const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')


const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async() => {
  await Blog.deleteMany({})
  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArr = blogObject.map(blog => blog.save())
  await Promise.all(promiseArr)
})

describe('blog information', () => {

  test('blogs are returned as JSON',async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('the unique identifier property of the blog post is _id', async() => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
  test('A valid blog can be added', async() => {
    const newBlog = {
      title:'i dont like testings',
      author:'victor',
      url:'send me',
      likes:24
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)


  })
  test('if likes property miss , default 0', async() => {
    const newBlog = {
      title:'Example from Test',
      author:'alex',
      url:'quealguienmecontrate.com'
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(response.body.likes).toBe(0)
  })
  test('If title and url are missing, respond with 400 bad request', async() => {


    const newBlog = {
      author:'pepee',
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test('delete blog from DB', async() => {
    const blogsDB = await helper.blogsInDb()
    const blogToDelete = blogsDB[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const bloginDb = await helper.blogsInDb()
    expect(bloginDb).toHaveLength(helper.initialBlogs.length - 1)

    const contents = bloginDb.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
  test('updating blog from db', async() => {
    const blogsDB = await helper.blogsInDb()
    const blogToUpdate = blogsDB[0]
    const updatedData = {
      likes: 40,
    }
    const newEntryblogupdated =
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)

    expect(newEntryblogupdated.body.likes).toBe(updatedData.likes)
  })
})
afterAll(() => mongoose.connection.close())