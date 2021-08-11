const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    //console.log("acc :>> ", acc);
    //console.log("curr['likes'] :>> ", curr["likes"]);
    return acc + curr["likes"];
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  let maxLikes = 0;
  let max = {};
  for (let blog of blogs) {
    if (blog.likes > maxLikes) {
      max = blog;
      maxLikes = max.likes;
    }
  }

  return { title: max.title, author: max.author, likes: max.likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  let authorBlogs = {};
  let maxBlogs = 0;
  let maxAuthor = "";

  for (let blog of blogs) {
    authorBlogs[blog.author] = authorBlogs[blog.author]
      ? authorBlogs[blog.author] + 1
      : 1;

    if (authorBlogs[blog.author] > maxBlogs) {
      maxBlogs = authorBlogs[blog.author];
      maxAuthor = blog.author;
    }
  }

  return {
    author: maxAuthor,
    blogs: authorBlogs[maxAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  let authorLikes = {};
  let maxLikes = 0;
  let maxAuthor = "";

  for (let blog of blogs) {
    authorLikes[blog.author] = authorLikes[blog.author]
      ? authorLikes[blog.author] + blog.likes
      : blog.likes;

    if (authorLikes[blog.author] > maxLikes) {
      maxLikes = authorLikes[blog.author];
      maxAuthor = blog.author;
    }
  }

  return {
    author: maxAuthor,
    likes: authorLikes[maxAuthor],
  };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
