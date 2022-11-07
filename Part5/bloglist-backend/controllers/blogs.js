const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')






blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username:1,name:1 })
  response.json(blogs)
})


blogsRouter.post('/', async(request, response) => {

  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }
  const user = await User.findById(request.decodedToken.id)
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })




  if(!blog.likes){
    blog.likes = 0
  }
  if(!blog.title || !blog.url){
    return response.status(400).end()
  }


  const blogs = await blog.save()
  user.blogs = user.blogs.concat(blogs._id)
  await user.save()
  response.status(201).json(blogs)
})
blogsRouter.delete('/:id',async(request,response) => {
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }
  const user = await User.findById(request.decodedToken.id)
  const blog = await Blog.findById(request.params.id)


  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).end()
  }
})
blogsRouter.put('/:id',async(request,response) => {
  const body = request.body


  const blog = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedblog => {
      response.json(updatedblog)
    })
    .catch(error => console.log(error))
})
module.exports = blogsRouter