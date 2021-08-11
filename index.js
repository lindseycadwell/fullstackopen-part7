const app = require("./src/app"); // the actual Express application
const http = require("http");
const config = require("./src/config");
const logger = require("./src/utils/logger");

logger.info("Running index.js on node ENV: ", config.NODE_ENV);

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
