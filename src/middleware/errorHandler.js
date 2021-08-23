const logger = require("../utils/logger");
const genRes = require("../utils/generateResponse");

const errorHandler = (error, req, res, next) => {
  logger.loc("middleware.errorHandler() ( custom )");
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error });
  } else if (error.name === "ValidationError") {
    return res.status(400).json(genRes(error.message));
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token." });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json(genRes("Token expired."));
  }
  next(error);
};

module.exports = errorHandler;
