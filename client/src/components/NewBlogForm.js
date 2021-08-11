import React, { useState } from "react";

function NewBlogForm({ handleNewBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createNewBlog = (evt) => {
    evt.preventDefault();

    handleNewBlog({ title: title, author: author, url: url });

    setTitle("");
    setAuthor("");
    setUrl("");
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
