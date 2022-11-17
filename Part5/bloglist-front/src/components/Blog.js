import { useState } from "react"



const Blog = ({blog,addlike,user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false)
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>

  </div>
)}


export default Blog