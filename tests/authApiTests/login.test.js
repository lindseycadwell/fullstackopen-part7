const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../src/app");
const utils = require("./userUtils");

const api = supertest(app);

beforeEach(async () => {
  await utils.resetAndSeedDb();
});

describe("/api/auth/login | success", () => {
  it("successfully logs the user in", async (done) => {
    const res = await api.post("/api/auth/login").send(utils.initialUserLogin);

    expect(res.status).toBe(200);

    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.token.length).toBeGreaterThan(2);

    done();
  });
});

describe("/api/auth/login | fail", () => {
  it("fails with missing username", async (done) => {
    const res = await api
      .post("/api/auth/login")
      .send({ password: "testpassword" });

    expect(res.status).toBe(400);

    done();
  });

  it("fails with missing password", async (done) => {
    const res = await api
      .post("/api/auth/login")
      .send({ username: "testusername" });

    expect(res.status).toBe(400);

    done();
  });

  it("fails with user not found in the database", async (done) => {
    const res = await api.post("/api/auth/login").send({
      ...utils.initialUserLogin,
      username: "thisUsernameDoesn'tExist",
    });

    expect(res.status).toBe(400);

    done();
  });

  it("fails with incorrect password", async (done) => {
    const res = await api
      .post("/api/auth/login")
      .send({ ...utils.initialUserLogin, password: "incorrectpassword" });

    expect(res.status).toBe(401);

    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
