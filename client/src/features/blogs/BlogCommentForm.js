import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addBlogComment } from "./blogsSlice";

const BlogCommentForm = ({ blogId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addBlogComment({
        blogId,
        comment: { name, content },
      })
    );
  };

  return (
    <>
      <h2>Add a comment to this blog:</h2>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        ></input>
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          name="content"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></input>
        <button>Add Comment</button>
      </form>
    </>
  );
};

export default BlogCommentForm;
