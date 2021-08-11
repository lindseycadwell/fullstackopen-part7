const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../src/app");
const User = require("../../src/models/user");
const passwordSecurity = require("../../src/utils/passwordAdapter");

const api = supertest(app);

const initialUser = {
  username: "testusername",
  name: "testname",
  password: "testpassword",
};

const initialUserLogin = {
  username: "testusername",
  password: "testpassword",
};

const altUser = {
  username: "altusername",
  name: "altname",
  password: "altpassword",
};

const altUserLogin = {
  username: "altusername",
  password: "altpassword",
};

const resetDb = async () => {
  await User.deleteMany({});
};

const seedDb = async () => {
  const passwordHash = await passwordSecurity.hash(initialUser.password);

  let userObject = new User({
    username: initialUser.username,
    name: initialUser.name,
    passwordHash,
  });
  await userObject.save();

  const altPasswordHash = await passwordSecurity.hash(altUser.password);

  let altUserObject = new User({
    username: altUser.username,
    name: altUser.name,
    passwordHash: altPasswordHash,
  });
  await altUserObject.save();
};

const resetAndSeedDb = async () => {
  await resetDb();
  await seedDb();
};

const getUsersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getLoginToken = async () => {
  const res = await api.post("/api/auth/login").send(initialUserLogin);

  expect(res.body.data.token).toBeDefined();

  const token = res.body.data.token;

  return token;
};

const getAltLoginToken = async () => {
  const res = await api.post("/api/auth/login").send(altUserLogin);

  expect(res.body.data.token).toBeDefined();

  const token = res.body.data.token;

  return token;
};

module.exports = {
  initialUserLogin,
  resetDb,
  seedDb,
  resetAndSeedDb,
  getUsersInDb,
  getLoginToken,
  getAltLoginToken,
};
