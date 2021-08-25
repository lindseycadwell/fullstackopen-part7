import React from "react";
import { useSelector, useDispatch } from "react-redux";

import useAsyncEffect from "../hooks/useAsyncEffect";

import { fetchBlogs, selectBlogIds } from "../slices/blogsSlice";
import Blog from "./Blog";

const BlogList = () => {
  const dispatch = useDispatch();

  useAsyncEffect(() => dispatch(fetchBlogs()), [dispatch]);

  const blogIds = useSelector(selectBlogIds);

  const renderedBlogs = () => {
    if (blogIds.length === 0) {
      return (
        <ul>
          <li>No blogs!</li>
        </ul>
      );
    }
    return (
      <ul>
        {blogIds.map((blogId) => (
          <Blog key={blogId} blogId={blogId} />
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
