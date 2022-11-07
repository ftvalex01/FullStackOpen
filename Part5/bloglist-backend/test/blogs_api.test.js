const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const api = supertest(app)
const Blog = require('../models/blog')

let token

beforeEach(async() => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('password', 10)
  const rootUser = await new User({
    username:'root',
    name:'root',
    passwordHash,
    blogs:[]
  }).save()


  const userForToken = { username:rootUser.username,id:rootUser.id }
  token = jwt.sign(userForToken,process.env.SECRET)

  await Promise.all(
    helper.initialBlogs.map((blog) => {
      blog.user = rootUser.id
      return new Blog(blog).save()
    })
  )
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
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map((e) => e.title)
    expect(contents).toContain('Canonical string reduction')

  })
  test('cannot be added without a valid user token', async () => {
    const newBlog = {
      title: 'not added',
      author: 'alex',
      url: 'la qe sea',
      likes: 12,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('Logged user deleting a saved blog', async () => {
    const currentBlogsInDb = await helper.blogsInDb()
    const blogToDelete = currentBlogsInDb[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAfterDelete.map((e) => e.title)

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
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    expect(newEntryblogupdated.body.likes).toBe(updatedData.likes)
  })
})
afterAll(() => mongoose.connection.close())