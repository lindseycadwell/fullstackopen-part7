import React from "react";

import Blog from "./Blog";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../slices/currentUserSlice";

const BlogList = ({ blogs, handleLike, handleDelete }) => {
  const user = useSelector(selectCurrentUser);

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
