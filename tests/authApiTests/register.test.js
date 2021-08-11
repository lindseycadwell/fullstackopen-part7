const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../src/app");
const utils = require("./userUtils");

const api = supertest(app);

beforeEach(async () => {
  await utils.resetDb();
});

describe("/api/auth/register | success", () => {
  it("successfully creates a new user", async (done) => {
    const newUser = {
      username: "testusername",
      name: "testname",
      password: "testpassword",
    };

    const res = await api.post("/api/auth/register").send(newUser);

    expect(res.status).toBe(200);

    const usersInDb = await utils.getUsersInDb();
    expect(usersInDb.length).toBe(1);

    expect(res.body.data.username).toBeDefined();
    expect(res.body.data.name).toBeDefined();

    done();
  });
});

describe("/api/auth/register | fail", () => {
  it("fails with missing username", async (done) => {
    const newUser = { name: "testname", password: "testpassword" };

    const res = await api.post("/api/auth/register").send(newUser);

    expect(res.status).toBe(400);

    done();
  });

  it("fails with missing password", async (done) => {
    const newUser = { username: "testusername", name: "testname" };

    const res = await api.post("/api/auth/register").send(newUser);

    expect(res.status).toBe(400);

    done();
  });

  it("fails with username <4 characters", async (done) => {
    const newUser = {
      username: "hi",
      name: "testname",
      password: "testpassword",
    };

    const res = await api.post("/api/auth/register").send(newUser);

    expect(res.status).toBe(400);

    done();
  });

  it("fails with password <4 characters", async (done) => {
    const newUser = {
      username: "testusername",
      name: "testname",
      password: "hi",
    };

    const res = await api.post("/api/auth/register").send(newUser);

    expect(res.status).toBe(400);

    done();
  });

  it("fails if username is not unique", async (done) => {
    await utils.seedDb();

    const newUser = {
      username: "testusername",
      name: "testname",
      password: "testpassword",
    };

    const res = await api.post("/api/auth/register").send(newUser);

    expect(res.status).toBe(400);

    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  //to fix jest openHanldes error if done() doesn't work: await new Promise((resolve) => setTimeout(() => resolve(), 500));
});

/* describe("register failure", () => {
  it("")
}) */
