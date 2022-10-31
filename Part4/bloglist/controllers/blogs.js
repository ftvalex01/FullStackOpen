const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// eslint-disable-next-line no-unused-vars
const logger = require('../utils/logger')




blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})
/* blogsRouter.get('/:_id',async(request,response) => {
  const blogs = await Blog.findById(request.params.id)
  response.json(blogs)
}) */

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  if(!blog.likes){
    blog.likes = 0
  }
  if(!blog.title || !blog.url){
    return response.status(400).end()
  }
  const blogs = await blog.save()
  response.status(201).json(blogs)
})

module.exports = blogsRouter