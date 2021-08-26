import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import useAsyncEffect from "../hooks/useAsyncEffect";

import { fetchBlogs, selectAllBlogs } from "../slices/blogsSlice";

const BlogList = () => {
  const dispatch = useDispatch();

  useAsyncEffect(() => dispatch(fetchBlogs()), [dispatch]);

  const blogs = useSelector(selectAllBlogs);
  console.log("blogs :>> ", blogs);

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
