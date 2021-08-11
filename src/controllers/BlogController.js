const jwt = require("jsonwebtoken");

const blogService = require("../services/blogService");
const userService = require("../services/userService");
const config = require("../config");
const logger = require("../utils/logger");
const genRes = require("../utils/generateResponse");

const createOne = async (req, res) => {
  logger.loc("in blogController.createOne()");

  if (!req.body.likes) req.body.likes = 0;

  if (!req.body.title && !req.body.url) {
    return res
      .status(400)
      .json(genRes.error("Missing required title or url parameters."));
  }

  let blogData = req.body;
  blogData.user = req.user._id;

  const result = await blogService.createOne(blogData);

  if (!result) {
    return res.status(500).json(genRes.error("Unable to create new blog."));
  }
  return res.status(200).json(genRes.success(result));
};

const readAll = async (req, res) => {
  logger.loc("in blogController.readAll()");

  const blogs = await blogService.readAll();

  if (!blogs) {
    return res.status(404).json(genRes.error("No blogs found"));
  }
  return res.status(200).json(genRes.success(blogs));
};

const readOne = async (req, res) => {
  logger.loc("in blogController.readOne()");

  const blog = await blogService.readOne(req.params.id);

  if (!blog) {
    return res.status(404).json(genRes.error("No blog found"));
  }
  return res.status(200).json(genRes.success(blog));
};

const updateOne = async (req, res) => {
  logger.loc("in blogController.updateOne()");

  const body = req.body;
  const blogId = req.params.id;
  const userId = req.user._id;

  if (!body.title || !body.author || !body.url) {
    return res
      .status(400)
      .json(
        genRes.error("Missing required parameters title, author, and/or url")
      );
  }
  const blogToUpdate = await blogService.readOne(blogId);

  if (!blogToUpdate) {
    return res
      .status(404)
      .json(genRes.error("Cannot locate blog in database."));
  }

  if (blogToUpdate.user.toString() !== userId.toString()) {
    return res
      .status(401)
      .json(genRes.error("You are not authorized to update this blog."));
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const result = await blogService.updateOne(blogId, blog);

  if (!result) {
    return res.status(403).json(genRes.error("Update operation didn't work."));
  }
  return res.status(200).json(genRes.success(result));
};

const deleteOne = async (req, res) => {
  logger.loc("blogsController.deleteOne()");

  const blogId = req.params.id;
  const userId = req.user._id;

  const blogToDelete = await blogService.readOne(blogId);

  if (!blogToDelete) {
    return res
      .status(404)
      .json(genRes.error("Cannot locate blog in database."));
  }

  if (blogToDelete.user.toString() !== userId.toString()) {
    return res
      .status(403)
      .json(genRes.error("You are not authorized to update this blog."));
  }

  const success = await blogService.deleteOne(req.params.id);

  if (!success) {
    return res.status(403).json(genRes("Delete operation didn't work."));
  }
  return res.status(204).send();
};

const deleteAll = async (req, res) => {
  logger.loc("blogsController.deleteAll()");

  const success = await blogService.deleteAll();

  if (!success) {
    return res.status(403).json(genRes("Delete all operation didn't work!"));
  }
  return res.status(204).send();
};

module.exports = {
  createOne,
  readAll,
  readOne,
  updateOne,
  deleteOne,
  deleteAll,
};
