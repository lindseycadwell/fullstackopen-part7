import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleDelete, userId }) => {
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

  const [isExpanded, setIsExpanded] = useState(false);

  const buttonText = isExpanded ? "hide" : "view";

  const userOwnsBlog = userId === blog.user.id;
  const removeStyle = { display: userOwnsBlog ? "" : "none" };

  if (!isExpanded) {
    return (
      <div style={blogStyle}>
        <span>
          {blog.title} by {blog.author}
        </span>
        <button
          className="viewHideButton"
          style={buttonStyle}
          onClick={() => setIsExpanded(true)}
        >
          {buttonText}
        </button>
      </div>
    );
  } else if (isExpanded) {
    return (
      <div style={blogStyle} className="blog-item">
        <span>
          {blog.title} by {blog.author}
        </span>
        <button onClick={() => setIsExpanded(false)}>{buttonText}</button>
        <p>{blog.url}</p>
        <span>likes: {blog.likes}</span>
        <button
          style={buttonStyle}
          id="likeButton"
          className="like-button"
          onClick={() => handleLike(blog)}
        >
          like
        </button>
        <p>{blog.user.name}</p>
        <button
          style={removeStyle}
          id="deleteButton"
          className="delete-button"
          onClick={() => handleDelete(blog)}
        >
          remove
        </button>
      </div>
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.object,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Blog;
