const jwt = require("jsonwebtoken");

const UserService = require("../services/UserService");
const passwordSecurity = require("../utils/passwordAdapter");
const config = require("../config");
const logger = require("../utils/logger");
const resGen = require("../utils/generateResponse");

const register = async (req, res) => {
  logger.loc("in authController.register()");

  const { username, password, name } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json(resGen.error("Missing required parameter: username or password."));
  }
  if (username.length < 4 || password.length < 4) {
    return res
      .status(400)
      .json(
        resGen.error(
          "Username and password must be at least 4 characters long."
        )
      );
  }
  if (await UserService.readOneByUsername(username)) {
    return res.status(400).json({
      success: false,
      error: "Username must be unique.",
    });
  }
  const passwordHash = await passwordSecurity.hash(password);

  const user = {
    username,
    name,
    passwordHash,
  };

  const savedUser = await UserService.createOne(user);

  if (!savedUser) {
    return res.status(500).json(resGen.error("Register operation failed."));
  }
  return res.status(200).json(resGen.success(savedUser));
};

const login = async (req, res) => {
  logger.loc("in authController.login()");

  const body = req.body;

  if (!body.username || !body.password) {
    return res
      .status(400)
      .json(resGen.error("Missing required parameter: username or password."));
  }
  const user = await UserService.readOneByUsername(body.username);

  if (!user) {
    return res.status(400).json(resGen.error("User not found in the database"));
  }
  const passwordCorrect =
    user === null
      ? false
      : await passwordSecurity.verify(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json(resGen.error("Invalid username or password."));
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 600 * 60 });

  console.log("user :>> ", user);
  const data = { token, username: user.username, name: user.name, id: user.id };

  return res.status(200).json(resGen.success(data));
};

const logout = async (req, res) => {
  logger.loc("in authController.logout()");

  return;
};

module.exports = { register, login, logout };
