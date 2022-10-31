
const dummy = (blogs) =>{
   return ( 1 )
}
const totalLikes = (blogs)=>{
    if(blogs.length === 0){
        return 0
    }else{
        return blogs.reduce((totalLikes,blog)=>totalLikes + blog.likes,0)
    }
}

const favoriteBlog = (blogs) =>{
    return blogs.length === 0
    ? {}
    : blogs.reduce((maxLikes,blog) => blog.likes > maxLikes ? blog.likes : maxLikes ,blogs[0].likes)
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}