const logger = require("../utils/logger");
const genRes = require("../utils/generateResponse");

const unknownEndpoint = (req, res) => {
  logger.loc("in middleware.unknownEndpoint()");

  logger.info("Unknown endpoint reached: ");
  logger.info("req.path :>> ", req.path);
  return res
    .status(404)
    .json(genRes.error("You have reached an unknown endpoint."));
};

module.exports = unknownEndpoint;
