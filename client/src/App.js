import React, { useState, useEffect } from "react";
//import { useDispatch, useSelect } from "react-redux";

import blogService from "./services/blogs";
import authService from "./services/auth";
import helpers from "./helpers";

import NewBlogForm from "./components/NewBlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successNotification, setSuccessNotification] = useState(null);
  const [failureNotification, setFailureNotification] = useState(null);
  const [newBlogVisible, setNewBlogVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log("retrieved blogs: ", blogs);
      let sortedBlogs = helpers.sortBlogs(blogs);
      console.log("sortedBlogs :>> ", sortedBlogs);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON);
      console.log("userObject :>> ", userObject);
      setUser(userObject);
      blogService.setToken(userObject.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    console.log("logging in with", username, password);

    try {
      const userRes = await authService.login({
        username,
        password,
      });

      console.log("userRes :>> ", userRes);
      console.log("userRes.data.username :>> ", userRes.data.username);

      if (!userRes.success) {
        console.log(userRes);
        return handleNotification({
          success: false,
          message: "Error: invalid username or password",
          duration: 5000,
        });
      }

      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userRes.data)
      );
      blogService.setToken(userRes.data.token);

      setUser(userRes.data);
    } catch (exception) {
      /* setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000); */
      console.log("Error logging in: ", exception);

      return handleNotification({
        success: false,
        message: "Error: invalid username or password",
        duration: 5000,
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleNewBlog = async ({ title, author, url }) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    const res = await blogService.createOne(newBlog);

    if (res.success) {
      console.log("Success: New blog successfully created");
      handleNotification({
        success: true,
        message: `Success: New blog successfully created with title ${newBlog.title}`,
        duration: 5000,
      });
    } else {
      console.log("Error: New blog not created successfully");
      handleNotification({
        success: false,
        message: "Error: New blog not created successfully",
        duration: 5000,
      });
    }
    setNewBlogVisible(false);

    refreshBlogs();
  };

  const newBlogForm = () => {
    const hideWhenVisible = { display: newBlogVisible ? "none" : "" };
    const showWhenVisible = { display: newBlogVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm handleNewBlog={handleNewBlog} />
          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const handleNotification = (input) => {
    const { success, message, duration } = input;

    if (success) {
      setSuccessNotification(message);
      setTimeout(() => {
        setSuccessNotification(null);
      }, duration);
    } else {
      setFailureNotification(message);
      setTimeout(() => {
        setFailureNotification(null);
      }, duration);
    }

    return;
  };

  const handleLike = (blog) => {
    console.log("pressed like button on blog: ");
    console.log("blog :>> ", blog);

    let updatedBlog = blog;
    updatedBlog.likes = blog.likes + 1;

    blogService.updateOne(updatedBlog).then((blog) => {
      console.log("updated blog :>> ", blog);

      refreshBlogs();
    });

    return;
  };

  const refreshBlogs = () => {
    blogService.getAll().then((blogs) => {
      let sortedBlogs = helpers.sortBlogs(blogs);

      setBlogs(sortedBlogs);
    });
  };

  const handleDelete = (blog) => {
    console.log("delete blog > ", blog);

    blogService
      .deleteOne(blog)
      .then((res) => {
        console.log("res :>> ", res);
        refreshBlogs();
      })
      .catch((err) => {
        console.log("error :>> ", err);
      });

    return;
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {failureNotification && <div>{failureNotification}</div>}
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }
  console.log("user in app.js before return :>> ", user);

  return (
    <>
      <h2>blogs</h2>
      {successNotification && <div>{successNotification}</div>}
      {failureNotification && <div>{failureNotification}</div>}
      <span>Logged in as {user.name} </span>
      <button onClick={handleLogout}>Logout</button>
      <BlogList
        blogs={blogs}
        handleLike={handleLike}
        handleDelete={handleDelete}
        user={user}
      />
      {newBlogForm()}
    </>
  );
};

export default App;
