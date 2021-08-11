const Blog = require("../models/blog");
const userService = require("./userService");
const logger = require("../utils/logger");

const createOne = async (blogData) => {
  logger.loc("in blogsService.createOne()");

  const blog = new Blog(blogData);

  const savedBlog = await blog.save();

  const userToUpdate = await userService.readOneById(blogData.user);

  userToUpdate.blogs = userToUpdate.blogs.concat(savedBlog._id);

  await userToUpdate.save();

  return savedBlog;
};

const readAll = async () => {
  logger.loc("in blogsService.readAll()");

  const blogs = await Blog.find({}).populate("user", { username: 1 });

  return blogs;
};

const readOne = async (id) => {
  logger.loc("in blogsService.readOne()");

  const blog = await Blog.findById(id);

  return blog;
};

const updateOne = async (id, changedBlog) => {
  logger.loc("in blogsService.updateOne()");

  const updatedBlog = await Blog.findByIdAndUpdate(id, changedBlog, {
    new: true,
  });

  return updatedBlog;
};

const deleteOne = async (id) => {
  logger.loc("in blogsService.deleteOne()");

  const success = await Blog.findByIdAndRemove(id);

  return success;
};

const deleteAll = async () => {
  logger.loc("in blogsService.deleteAll()");

  const success = await Blog.deleteMany({});

  return success;
};

module.exports = {
  createOne,
  readAll,
  readOne,
  updateOne,
  deleteOne,
  deleteAll,
};
