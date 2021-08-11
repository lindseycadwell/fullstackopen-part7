const sortBlogs = (blogs) => {
  const compareFunction = (a, b) => {
    return b.likes - a.likes;
  };

  return blogs.sort(compareFunction);
};

export default { sortBlogs };
