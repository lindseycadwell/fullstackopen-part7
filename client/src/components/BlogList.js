import React from "react";

import Blog from "./Blog";

const BlogList = ({ blogs, handleLike, handleDelete, user }) => {
  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            userId={user.id}
          />
        ))}
      </ul>
    </>
  );
};

export default BlogList;
