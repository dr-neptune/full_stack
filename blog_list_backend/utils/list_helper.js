const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
	return sum + blog.likes
    }
    if (blogs.length === 0) {
	return 0
    } else if (blogs.length === 1) {
	return blogs[0].likes
    } else {
	return blogs.reduce(reducer, 0)
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
	const nullBlog = {
	    _id: "0",
	    title: "None",
	    author: "None",
	    url: "None",
	    likes: 0,
	}
		return nullBlog
    } else {
	return blogs.reduce((max, blog) => blog.likes >= max.likes ? blog : max, blogs[0])
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
	return 'None'
    } else {
	return _.chain(blogs)
		.groupBy('author')
		.map((value, key) => [{
		    'author': key,
		    'blogs': value.length
		}])
		.flatten()
		.maxBy(author => author.blogs)
		.value()
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
	return 'None'
    } else {
	return _.chain(blogs)
		.groupBy('author')
		.map((value, key) => [{ 'author': key,
					'likes': value.reduce((sum, post) => sum + post.likes, 0) }])
		.flatten()
		.maxBy(author => author.likes)
		.value()
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
