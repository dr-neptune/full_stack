const Blog = require('../models/blog')

const initialBlogs = [
    {
	"title": "Neptunes Arkestra",
	"author": "Neptune",
	"url": "arkestra.dev",
	"likes": 1000,
	"id": "6384b78735bcb3748b429e81"
    },
    {
	"title": "Ambrevars Blog",
	"author": "Ambrevar",
	"url": "ambrevar.xyz",
	"likes": 100,
	"id": "6384b85d35bcb3748b429e93"
    }    
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}
