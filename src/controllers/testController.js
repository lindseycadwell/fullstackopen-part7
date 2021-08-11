const blogService = require("../services/blogService");
const userService = require("../services/userService");
const logger = require("../utils/logger");

const reset = async (req, res) => {
  logger.loc("in testController.reset()");

  await blogService.deleteAll();
  await userService.deleteAll();

  res.status(204).end();
};

module.exports = {
  reset,
};
