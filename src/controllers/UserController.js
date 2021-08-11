const userService = require("../services/userService");
const resGen = require("../utils/generateResponse");
const logger = require("../utils/logger");

const createOne = async (req, res) => {
  logger.loc("in userController.createOne()");

  return;
};

const readAll = async (req, res) => {
  logger.loc("in userController.readAll()");

  const users = await userService.readAll();

  if (!users) {
    return res.status(404).json(resGen.error("No users found."));
  }

  return res.status(200).json(resGen.success(users));
};

const readOne = async (req, res) => {
  logger.loc("in userController.readOne()");

  return;
};

const updateOne = async (req, res) => {
  logger.loc("in userController.updateOne()");

  return;
};

const deleteOne = async (req, res) => {
  logger.loc("in userController.deleteOne()");

  return;
};

module.exports = { createOne, readAll, readOne, updateOne, deleteOne };
