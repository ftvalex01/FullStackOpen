import React, { useEffect, useState } from 'react'
import Notification from './Notification'
import blogService from '../services/blogs'
import BlogForm from '../components/BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

export const Bloglist = ({user}) => {

    const [blogs,setBlogs] = useState([])
    const blogFormRef = React.useRef()


    useEffect(()=>{
        const fetchAllBlogs = async() =>{
            const blogsFromApi = await blogService.getAll()
            setBlogs(blogsFromApi.sort((a, b) => b.likes - a.likes))
        }
        fetchAllBlogs()
    })

    const createNewBlog = async(blogObject) =>{
        try {
            const returnBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(returnBlog))
            blogFormRef.current.toggleVisibility()
            Notification({
                message: `New blog created: ${returnBlog.title} by ${returnBlog.author}`,
                type: 'success',
              })
        } catch (error) {
            Notification({
              message: 'Could not create a new blog entry',
              type: 'error',
            })
          }
        }
  return (
    <div>
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm createNewBlog={createNewBlog} />
    </Togglable>
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </div>
  </div>
  )
}
