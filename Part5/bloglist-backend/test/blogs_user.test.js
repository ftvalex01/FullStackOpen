const bcrypt = require('bcryptjs')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'saladox',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('invalid username at POST', async() => {
    const users = await helper.usersInDb()
    const newUser = {
      username:'bb',
      name:'alex',
      password:'a321321ads'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'username is required and min length 3 characters'
    )

    const usersInDB = await helper.usersInDb()
    expect(usersInDB).toHaveLength(users.length)

    const userName = usersInDB.map((user) => user.userName)
    expect(userName).not.toContain(newUser.username)
  })
  test('invalid password at POST', async() => {
    const users = await helper.usersInDb()
    const newUser = {
      username:'bbb',
      name:'alexx',
      password:'a3'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'password is required and min length 3 characters'
    )

    const usersInDB = await helper.usersInDb()
    expect(usersInDB).toHaveLength(users.length)

    const userName = usersInDB.map((user) => user.userName)
    expect(userName).not.toContain(newUser.username)
  })
})