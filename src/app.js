const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("express-async-errors");

const config = require("./config");
const logger = require("./utils/logger");
const middleware = require("./middleware");
const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

logger.test("Server running in test environment");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/blogs", middleware.extractToken, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./routes/testRouter.js");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
