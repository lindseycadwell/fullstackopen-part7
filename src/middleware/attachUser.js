const userService = require("../services/userService");
const resGen = require("../utils/generateResponse");
const logger = require("../utils/logger");

const attachUser = async (req, res, next) => {
  logger.loc("in middleware.attachUser()");

  const id = req.userId;

  const user = await userService.readOneById(id);

  if (!user) {
    return res
      .status(404)
      .json(
        resGen.error("User from authentification token not found in database.")
      );
  }
  req.user = user;

  return next();
};

module.exports = attachUser;
