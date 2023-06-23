const express = require("express");
const app = express();

// Modals
const Blog = require("../models/Blog");

// Set up middleware
app.use(express.json());


// Middleware function to handle errors
const errorHandler = (error, req, res, next) => {
	console.error('Error:', error);
	res.status(200).send({
		fbIsError: true,
		fsMessage: error.message,
	});
};

// Middleware function to wrap async route handlers with error handling
const asyncHandler = (routeHandler) =>
	(req, res, next) => Promise.resolve(routeHandler(req, res, next)).catch(next);

// View & View All Blogs
app.get("/blog", asyncHandler(async (req, res) => {
	const { id } = req.body;
	let blogData;
	console.log(blogData);
	if (!id) {
		blogData = await Blog.find({}).sort({ title:'asc' }).limit(10);
	} else {
		blogData = await Blog.findById(id, 'title author').exec();
	}

	res.send(blogData);
}));

// Insert Blog
app.post("/blog", asyncHandler(async (req, res) => {
	const newBlog = await Blog.create(req.body);
	res.send(newBlog);
}));

// Update Blog document
app.patch("/blog", asyncHandler(async (req, res) => {
	const { id, ...updateObj } = req.body;
	const updatedBlog = await Blog.findByIdAndUpdate(id, updateObj, { new: true });
	res.send(updatedBlog);
}));

// delete blogs
app.delete('/blog', asyncHandler(async (req, res) => {
	const { id } = req.body;
	const result = await Blog.findByIdAndDelete(id);
	res.send(result);
}));


// Where & Join Using Query
app.get("/users/:id",  asyncHandler(async(req, res) => {
	const { id } = req.params.id;
	const result = await User.find({ _id: id, age: { $lt: 30, $gt: 20 } }).populate('userDetail');
	res.send(result);
}));

// remove collection using query
app.get("/delete/blog",  asyncHandler((req, res) => {
	const { id } = req.params.id;
	const result = Blog.collection.drop();
	res.send(result);
}));


// Error handling middleware
app.use(errorHandler);


module.exports = app;