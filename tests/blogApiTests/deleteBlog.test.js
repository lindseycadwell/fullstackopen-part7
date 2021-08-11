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

describe("DELETE /api/blogs/${id} | success", () => {
  it("succeeds", async (done) => {
    let blogsInDb = await blogUtils.getBlogsinDb();

    const idToDelete = blogsInDb[0].id;

    const res = await api
      .delete(`/api/blogs/${idToDelete}`)
      .set({ authorization: `bearer ${token}` });

    blogsInDb = await blogUtils.getBlogsinDb();

    expect(res.status).toBe(204);
    expect(blogsInDb.length).toBe(blogUtils.initialBlogs.length - 1);

    done();
  });
});

describe("DELETE /api/blogs/${id} | failure", () => {
  it("fails if target blog does not belong to user who is updating", async (done) => {
    const altLoginToken = await userUtils.getAltLoginToken();

    let blogsInDb = await blogUtils.getBlogsinDb();

    const idToDelete = blogsInDb[0].id;

    const res = await api
      .delete(`/api/blogs/${idToDelete}`)
      .set({ authorization: `bearer ${altLoginToken}` });

    expect(res.status).toBe(403);

    done();
  });

  it("fails if target blog does not exist", async (done) => {
    const idToDelete = "999a99aa9aa9a99999a9a999";

    const res = await api
      .delete(`/api/blogs/${idToDelete}`)
      .set({ authorization: `bearer ${token}` });

    expect(res.status).toBe(404);

    done();
  });

  it("fails if target blogId is not a correctly formatted id", async (done) => {
    const invalidId = "123abcdoesnotexist";

    const res = await api
      .delete(`/api/blogs/${invalidId}`)
      .set({ authorization: `bearer ${token}` });

    expect(res.status).toBe(400);

    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
