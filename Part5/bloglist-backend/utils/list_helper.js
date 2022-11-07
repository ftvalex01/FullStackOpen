
const dummy = (blogs) => {
  return ( 1 )
}
const totalLikes = (blogs) => {
  if(blogs.length === 0){
    return 0
  }else{
    return blogs.reduce((totalLikes,blog) => totalLikes + blog.likes,0)
  }
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((maxLikes,blog) => blog.likes > maxLikes ? blog.likes : maxLikes ,blogs[0].likes)
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0)
    return {}

  const authorsCount = {}

  blogs.forEach((blog) => {
    const author = blog.author
    authorsCount[author]
      ? (authorsCount[author] += 1)
      : (authorsCount[author] = 1)
  })
  const authorWithMostBlogs = Object.keys(authorsCount).sort(
    (a,b) => authorsCount[b]-authorsCount[a]
  )[0]
  return{
    author:authorWithMostBlogs,
    blogs:authorsCount[authorWithMostBlogs]
  }

}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}

  const authorsCount = {}
  blogs.forEach((blog) => {
    const author = blog.author
    if(authorsCount === true){
      authorsCount[author] +=blog.likes
    }else{
      authorsCount[author] = blog.likes
    }
  })
  const authorWithMoreLikes = Object.keys(authorsCount).sort(
    (a,b) => authorsCount[b] - authorsCount[a]
  )[0]
  return {
    author: authorWithMoreLikes,
    likes:authorsCount[authorWithMoreLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}