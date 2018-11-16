const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => (blogs.reduce((sum, blog) => sum + blog.likes, 0))

const favoriteBlog = (blogs) => {
    var maxLikes = blogs.reduce((max, blog) => {
        if (blog.likes > max) {
            return blog.likes
        } else {
            return max
        }
    }, 0)

    var favorite = blogs.find(b => b.likes === maxLikes)

    return `Title: ${favorite.title}, Author: ${favorite.author}, Likes: ${favorite.likes}`
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}