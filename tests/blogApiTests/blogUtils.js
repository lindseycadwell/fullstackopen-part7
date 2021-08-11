const Blog = require("../../src/models/blog");
const User = require("../../src/models/user");
const userUtils = require("../authApiTests/userUtils");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const newBlog = {
  title: "evolution",
  author: "lin",
  url: "www.evolution.com",
  like: 5,
};

const updatedBlog = {
  title: "updatedTitle",
  author: "updatedAuthor",
  url: "updatedUrl",
  likes: 420,
};

const resetDb = async () => {
  return await Blog.deleteMany({});
};

const seedDb = async () => {
  const users = await userUtils.getUsersInDb();
  const user = users.find((user) => user.username === "testusername");
  const userId = user.id;

  for (let blog of initialBlogs) {
    blog.user = userId;
    let blogObject = new Blog(blog);
    let savedBlog = await blogObject.save();

    const userToUpdate = await User.findById(userId);
    userToUpdate.blogs = userToUpdate.blogs.concat(savedBlog._id);
    await userToUpdate.save();
  }
  return null;
};

const resetAndSeedDb = async () => {
  await resetDb();

  return await seedDb();
};

const getBlogsinDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  newBlog,
  updatedBlog,
  resetDb,
  seedDb,
  resetAndSeedDb,
  getBlogsinDb,
};
