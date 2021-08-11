const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  logger.loc("in middleware.requestLogger()");
  logger.request("---");
  logger.request("Method:", req.method);
  logger.request("Path:  ", req.path);
  logger.request("Body:  ", req.body);
  logger.request("Authorization: ", req.headers.authorization);
  logger.request("---");
  next();
};

module.exports = requestLogger;
