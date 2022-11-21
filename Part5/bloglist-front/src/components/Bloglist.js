import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import BlogForm from '../components/BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import PropTypes from 'prop-types'

export const Bloglist = ({ user,notify }) => {

  const [blogs,setBlogs] = useState([])
  const blogFormRef = React.useRef()


  useEffect(() => {
    const fetchAllBlogs = async() => {
      const blogsFromApi = await blogService.getAll()
      setBlogs(blogsFromApi.sort((a, b) => b.likes - a.likes))
    }
    fetchAllBlogs()
  },[])

  const createNewBlog = async(blogObject) => {
    try {
      const returnBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnBlog))
      blogFormRef.current.toggleVisibility()
      notify({
        message: `New blog created: ${returnBlog.title} by ${returnBlog.author}`,
        type: 'success',
      })
    } catch (error) {
      notify({
        message: 'Could not create a new blog entry',
        type: 'error',
      })
    }
  }
  const updateBlog = async(blogId,blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId,blogObject)
      const updatedBlogs = blogs.map((element) => (element.id === updatedBlog.id ? updatedBlog : element))
      setBlogs(updatedBlogs)
      notify({
        message: `added a like for ${updatedBlog.title}`,
        type: 'success',
      })
    } catch (error) {
      notify({
        message: 'Could not updated a blog',
        type: 'error',
      })
    }
  }
  const deleteBlog = async(blogId) => {
    try {
      const response = await blogService.remove(blogId)
      if(response.status === 204){
        setBlogs(blogs.filter((element) => element.id !== blogId))

        notify({
          message: 'removed blog successfully',
          type: 'success',
        })
      } else {
        notify({
          message: 'Could not delete blog',
          type: 'error',
        })
      }
    } catch (error) {
      notify({
        message: 'Could not delete blog',
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
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  )
}
Bloglist.propTypes = {
  user: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
}
