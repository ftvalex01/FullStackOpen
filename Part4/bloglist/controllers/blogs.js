const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// eslint-disable-next-line no-unused-vars
const logger = require('../utils/logger')




blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
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
blogsRouter.delete('/:id',async(request,response) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    console.log('no existe ese blog')
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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