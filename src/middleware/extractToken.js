const logger = require("../utils/logger");

const extractToken = (req, res, next) => {
  logger.loc("in middleware.extractToken()");

  const authHeader = req.headers.authorization;

  logger.debug("authHeader :>> ", authHeader);

  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    req.token = authHeader.split(" ")[1];

    return next();
  } else {
    req.token = null;

    return next();
  }
};

module.exports = extractToken;
