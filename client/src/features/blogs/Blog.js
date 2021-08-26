import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCurrentUser } from "../auth/currentUserSlice";
import { selectBlogById } from "./blogsSlice";

const Blog = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) => selectBlogById(state, blogId));

  if (!blog) return <div>404: Blog not found...</div>;

  const user = useSelector(selectCurrentUser);

  const userOwnsBlog = user ? user.id === blog.user.id : false;

  const removeStyle = { display: userOwnsBlog ? "" : "none" };

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
        onClick={() => "handleLike(blog)"}
      >
        like
      </button>
      <p>{blog.user.name}</p>
      <button
        style={removeStyle}
        id="deleteButton"
        className="delete-button"
        onClick={() => "handleDelete"}
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
