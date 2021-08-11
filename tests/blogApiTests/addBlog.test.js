const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../src/app");
const blogUtils = require("./blogUtils");
const userUtils = require("../authApiTests/userUtils");

const api = supertest(app);

let token;

beforeEach(async () => {
  await userUtils.resetAndSeedDb();
  await blogUtils.resetAndSeedDb();

  token = await userUtils.getLoginToken();
});

describe("POST /api/blogs | success", () => {
  it("succeeds", async (done) => {
    const res = await api
      .post("/api/blogs")
      .send(blogUtils.newBlog)
      .set({ authorization: `bearer ${token}` });

    const blogsInDb = await blogUtils.getBlogsinDb();

    expect(res.status).toBe(200);
    expect(res.body.data.user).toBeTruthy();
    expect(blogsInDb.length).toBe(blogUtils.initialBlogs.length + 1);

    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
