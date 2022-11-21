import React,{ useState } from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, addLike,user,deleteBlog }) => {
  const isOwnedByUser = user.username === blog.user.username


  return (
    <div>
      <p>{blog.url}</p>
      <p>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        <button onClick={addLike}>Add</button>
      </p>
      <p>{blog.user.name}</p>
      {isOwnedByUser && <DeleteButton deleteBlog={deleteBlog} />}
    </div>
  )
}
const DeleteButton = ({ deleteBlog }) => <button onClick={deleteBlog}>delete</button>

const Blog = ({ blog,updateBlog,user,deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false)

  const handleAddLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id,updatedBlog)
  }
  const handleDelete = () => {
    if(window.confirm(`remove blog ${blog.title}`)){
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title}</p>
        <span>{blog.author}</span>
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
        {showDetails ? (
          <BlogDetails blog={blog} addLike={handleAddLike} user={user} deleteBlog={handleDelete}/>
        ) : null}
      </div>


    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

DeleteButton.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
}
export default Blog