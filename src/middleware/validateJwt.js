const jwt = require("jsonwebtoken");
const genRes = require("../utils/generateResponse");
const config = require("../config");
const logger = require("../utils/logger");

const validateJwt = (req, res, next) => {
  logger.loc("in middleware.validateJwt()");

  const decodedToken = jwt.verify(req.token, config.SECRET);

  if (!req.token || !decodedToken.id) {
    return res
      .status(401)
      .json(genRes.error("Authentification token was missing or invalid."));
  }
  req.userId = decodedToken.id;

  return next();
};

module.exports = validateJwt;
