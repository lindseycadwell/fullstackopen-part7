const User = require("../models/user");
const logger = require("../utils/logger");

const createOne = async (userData) => {
  logger.loc("in userService.createOne()");

  const user = new User(userData);

  const savedUser = await user.save();

  return savedUser;
};

const readAll = async () => {
  logger.loc("in userService.readAll()");
  const users = await User.find({}).populate("blogs", {
    title: 1,
  });

  return users;
};

const readOneById = async (id) => {
  logger.loc("in userService.readOneById()");

  const user = await User.findById(id).exec();

  return user;
};

const readOneByUsername = async (username) => {
  logger.loc("in userService.readOneByUsername()");
  const user = await User.findOne({ username: username }).exec();

  return user;
};

const updateOne = async (id, changedUser) => {
  logger.loc("in userService.updateOne()");
  return;
};

const deleteOne = async (id) => {
  logger.loc("in userService.deleteOne()");
  return;
};

const deleteAll = async () => {
  logger.loc("in userService.deleteAll()");

  const success = await User.deleteMany({});

  return success;
};

module.exports = {
  createOne,
  readAll,
  readOneById,
  readOneByUsername,
  updateOne,
  deleteOne,
  deleteAll,
};
