import React from "react";
import { useSelector, useDispatch } from "react-redux";

import useAsyncEffect from "../hooks/useAsyncEffect";

import { fetchBlogs, selectBlogIds } from "../slices/blogsSlice";
import Blog from "./Blog";

const BlogList = () => {
  const dispatch = useDispatch();

  useAsyncEffect(() => dispatch(fetchBlogs()), [dispatch]);

  const blogIds = useSelector(selectBlogIds);

  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {blogIds.map((blogId) => (
          <Blog key={blogId} blogId={blogId} />
        ))}
      </ul>
    </>
  );
};

export default BlogList;
