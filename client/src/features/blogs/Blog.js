import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams, useHistory } from "react-router-dom";

import { selectCurrentUser } from "../auth/currentUserSlice";
import { updateBlog, deleteBlog, selectBlogById } from "./blogsSlice";
import { setNotificationWithTimeout } from "../notifications/notificationSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { blogId } = useParams();

  const blog = useSelector((state) => selectBlogById(state, blogId));
  const user = useSelector(selectCurrentUser);

  if (!blog) return <div>404: Blog not found...</div>;

  const userOwnsBlog = user ? user.id === blog.user.id : false;

  const removeStyle = { display: userOwnsBlog ? "" : "none" };

  const onLikeButtonClicked = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    try {
      const resultAction = await dispatch(updateBlog(updatedBlog));
      unwrapResult(resultAction);

      dispatch(
        setNotificationWithTimeout({
          content: `Liked blog: ${blog.title}`,
          type: "success",
        })
      );
    } catch (err) {
      console.error("Failed to like the blog: ", err);

      dispatch(
        setNotificationWithTimeout({
          content: `Failed to like blog: ${blog.title}`,
          type: "failure",
        })
      );
    }
  };

  const onDeleteButtonClicked = async () => {
    try {
      const resultAction = await dispatch(deleteBlog(blog.id));
      unwrapResult(resultAction);

      history.push("/");
      dispatch(
        setNotificationWithTimeout({
          content: `Deleted blog: ${blog.title}`,
          type: "success",
        })
      );
    } catch (err) {
      console.error("Failed to delete the blog: ", err);

      dispatch(
        setNotificationWithTimeout({
          content: `Failed to delete blog: ${blog.title}`,
          type: "failure",
        })
      );
    }
  };

  return (
    <div style={blogStyle} className="blog-item">
      <span>
        {blog.title} by {blog.author}
      </span>
      <p>{blog.url}</p>
      <span>likes: {blog.likes}</span>
      <button
        style={buttonStyle}
        id="likeButton"
        className="like-button"
        onClick={onLikeButtonClicked}
      >
        like
      </button>
      <p>{blog.user.name}</p>
      <button
        style={removeStyle}
        id="deleteButton"
        className="delete-button"
        onClick={onDeleteButtonClicked}
      >
        remove
      </button>
    </div>
  );
};

export default Blog;

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const buttonStyle = {
  marginLeft: 7,
};
