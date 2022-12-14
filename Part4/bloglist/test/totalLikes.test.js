const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that',() => {
    const blog = blogs[0]
    const result = listHelper.totalLikes([blog])
    expect(result).toBe(blog.likes)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })


})

describe('Favorite Blog', () => {

  test('of empty list is {}', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })
  test('when list has only one blog equals that blog', () => {
    const blog = blogs[0]
    const result = listHelper.favoriteBlog([blog])
    const favorite = blogs.find(blog => blog.likes === result)

    expect(favorite).toEqual(blog)

  })
  test('of a bigger list is calculated right', () => {
    const blogMax = blogs[2]
    const maxLikes = listHelper.favoriteBlog(blogs)
    const favoriteBlog = blogs.find((element) => element.likes === maxLikes)
    expect(favoriteBlog).toEqual(blogMax)
  })

})

describe('Author blogs', () => {
  test('of empty list {}', () => {
    const emptyBlog = listHelper.mostBlogs([])
    expect(emptyBlog).toEqual({})
  })
  test('when list has only one author equals that blog', () => {

    const blog = blogs[0]
    const mostBlogs = listHelper.mostBlogs([blog])

    expect(mostBlogs).toEqual({
      author:blog.author,
      blogs:1
    })
  })
  test('of a bigger list is calculated right', () => {
    const mostBlogs = listHelper.mostBlogs(blogs)
    expect(mostBlogs).toEqual({
      author: 'Robert C. Martin',
      blogs:3
    })
  })
})
describe('Likes Blogs', () => {
  test('of empty list {}', () => {
    const emptyBlog = listHelper.mostLikes([])
    expect(emptyBlog).toEqual({})
  })
  test('when list  has only one author equals that likes', () => {
    const blog = blogs[0]
    const mostLikes = listHelper.mostLikes([blog])

    expect(mostLikes).toEqual({
      author:blog.author,
      likes:7
    })
  })
  test('of a bigger list is calculated right', () => {
    const mostLikes = listHelper.mostLikes(blogs)
    expect(mostLikes).toEqual({
      author: 'Edsger W. Dijkstra',
      likes:12
    })
  })
})

