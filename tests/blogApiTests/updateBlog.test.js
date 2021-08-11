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

describe("UPDATE /api/blogs/${id} | success", () => {
  it("succeeds", async (done) => {
    let blogsInDb = await blogUtils.getBlogsinDb();

    const idToUpdate = blogsInDb[0].id;

    const res = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(blogUtils.updatedBlog)
      .set({ authorization: `bearer ${token}` });

    blogsInDb = await blogUtils.getBlogsinDb();

    expect(res.status).toBe(200);
    expect(blogsInDb[0].author).toBe("updatedAuthor");

    done();
  });
});

describe("UPDATE /api/blogs/${id} | failure", () => {
  it("fails if target blog does not belong to user who is updating", async (done) => {
    const altLoginToken = await userUtils.getAltLoginToken();

    let blogsInDb = await blogUtils.getBlogsinDb();

    const idToUpdate = blogsInDb[0].id;

    const res = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(blogUtils.updatedBlog)
      .set({ authorization: `bearer ${altLoginToken}` });

    expect(res.status).toBe(401);

    done();
  });

  it("fails if missing title, author, or url parameters", async (done) => {
    let incompleteBlog = { author: "author", title: "title" };

    const blogsInDb = await blogUtils.getBlogsinDb();

    const idToUpdate = blogsInDb[0].id;

    const res = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(incompleteBlog)
      .set({ authorization: `bearer ${token}` });

    incompleteBlog = { author: "author", url: "url" };

    const res2 = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(incompleteBlog)
      .set({ authorization: `bearer ${token}` });

    incompleteBlog = { title: "title", url: "url" };

    const res3 = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(incompleteBlog)
      .set({ authorization: `bearer ${token}` });

    expect(res.status).toBe(400);
    expect(res2.status).toBe(400);
    expect(res3.status).toBe(400);

    done();
  });

  it("fails if target blog does not exist", async (done) => {
    const idToUpdate = "999a99aa9aa9a99999a9a999";

    const res = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(blogUtils.updatedBlog)
      .set({ authorization: `bearer ${token}` });

    expect(res.status).toBe(404);

    done();
  });

  it("fails if target blogId is not a correctly formatted id", async (done) => {
    const invalidId = "123abcdoesnotexist";

    const res = await api
      .put(`/api/blogs/${invalidId}`)
      .send(blogUtils.updatedBlog)
      .set({ authorization: `bearer ${token}` });

    expect(res.status).toBe(400);

    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
