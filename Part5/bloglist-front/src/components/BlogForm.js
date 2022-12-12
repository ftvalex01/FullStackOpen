
import React, { useState } from 'react'
import PropTypes from 'prop-types'



const AddBlog = ({ createNewBlog }) => {



  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes,setLikes] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    createNewBlog({
      title,
      author,
      url,
      likes
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }
  return (
    <div>
      <h2>Create new</h2>
      <form id="create-blog-form" onSubmit={addNewBlog}>
        <div>
              Title:{' '}
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
              Author:{' '}
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
              URL:{' '}
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
              LIKES:{' '}
          <input
            id="likes"
            type="text"
            value={likes}
            name="likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit" id="create">Create</button>
      </form>
    </div>
  )
}
AddBlog.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
}
export default AddBlog