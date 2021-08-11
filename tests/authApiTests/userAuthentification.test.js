const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../src/app");
const userUtils = require("./userUtils");
const blogUtils = require("../blogApiTests/blogUtils");

const api = supertest(app);

beforeEach(async () => {
  await userUtils.resetAndSeedDb();
  await blogUtils.resetDb();
});

describe("/api/blogs routes | fail", () => {
  it("fails when there is no user token", async (done) => {
    const res = await api.post("/api/blogs").send(blogUtils.newBlog);

    expect(res.status).toBe(401);

    done();
  });

  it("fails when user token is invalid", async (done) => {
    const token = "bearer abc123invalidtoken";

    const res = await api
      .post("/api/blogs")
      .send(blogUtils.newBlog)
      .set({ authorization: `bearer ${token}` });

    expect(res.status).toBe(401);

    done();
  });

  it("fails when user from token cannot be found", async (done) => {
    const token = await userUtils.getLoginToken();

    await userUtils.resetDb();

    const res = await api
      .post("/api/blogs")
      .send(blogUtils.newBlog)
      .set({ authorization: `bearer ${token}` });

    expect(res.status).toBe(404);

    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
