const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../src/app");
const blogUtils = require("./blogUtils");
const userUtils = require("../authApiTests/userUtils");

const api = supertest(app);

beforeEach(async () => {
  await blogUtils.resetDb();
});

describe("GET /api/blogs | success", () => {
  it("if there are no blogs in the DB", async (done) => {
    const res = await api.get("/api/blogs");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    done();
  });

  it("if DB is initially seeded with blogs", async (done) => {
    await userUtils.resetAndSeedDb();
    await blogUtils.seedDb();

    const res = await api.get("/api/blogs");

    expect(res.status).toBe(200);

    expect(res.body.data.length).toBe(blogUtils.initialBlogs.length);
    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  //to fix jest openHandles error if done() doesn't work: await new Promise((resolve) => setTimeout(() => resolve(), 500));
});
