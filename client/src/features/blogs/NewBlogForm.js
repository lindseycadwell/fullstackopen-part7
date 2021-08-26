import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import { createBlog } from "./blogsSlice";
import { setNotificationWithTimeout } from "../notifications/notificationSlice";

function NewBlogForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createNewBlog = async (evt) => {
    evt.preventDefault();

    dispatch(createBlog());

    try {
      const resultAction = await dispatch(createBlog({ title, author, url }));
      unwrapResult(resultAction);

      history.push("/");
      dispatch(
        setNotificationWithTimeout({
          content: `Added new blog: ${title}`,
          type: "success",
        })
      );
    } catch (err) {
      console.error("Failed to save the blog: ", err);

      dispatch(
        setNotificationWithTimeout({
          content: `Failed to add new blog: ${title}`,
          type: "failure",
        })
      );
    }
  };

  return (
    <form onSubmit={createNewBlog} className="new-blog-form">
      <h2>Create new blog:</h2>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          className="titleInput"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          className="authorInput"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          className="urlInput"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id="newBlogButton">
        create
      </button>
    </form>
  );
}

export default NewBlogForm;
