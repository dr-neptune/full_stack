const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('returned blog list is the right size', async () => {
    const response = await api.get('/api/blogs/')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs/')
    response.body.map(blog => expect(blog.id).toBeDefined())
})


test('a new blog can be added', async () => {
    const newBlog = {
	title: "All Code No Brain",
	author: "Colin Fay",
	url: "https://colinfay.me/",
	likes: 500
    }

    await api
	.post('/api/blogs/')
	.send(newBlog)
	.expect(201)
	.expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

/* currently on 4.11* */
/* 
 * test('likes property is missing from request', async () => {
 *     const response = await api.get('/api/blogs/')
 *     response.body.map(blog => expect(blog.likes).toBeEqual())
 * }) */
