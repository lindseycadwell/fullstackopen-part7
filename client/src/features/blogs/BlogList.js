import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectAllBlogs } from "./blogsSlice";

const BlogList = () => {
  const blogs = useSelector(selectAllBlogs);

  const renderedBlogs = () => {
    if (blogs.length === 0) {
      return (
        <ul>
          <li>No blogs!</li>
        </ul>
      );
    }
    return (
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h2>Blogs</h2>
      {renderedBlogs()}
    </>
  );
};

export default BlogList;
