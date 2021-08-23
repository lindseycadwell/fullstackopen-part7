import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import blogService from "./services/blogs";
import helpers from "./helpers";

import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [successNotification, setSuccessNotification] = useState(null);
  const [failureNotification, setFailureNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log("retrieved blogs: ", blogs);
      let sortedBlogs = helpers.sortBlogs(blogs);
      console.log("sortedBlogs :>> ", sortedBlogs);
      setBlogs(sortedBlogs);
    });
  }, []);

  /* useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON);
      console.log("userObject :>> ", userObject);
      setUser(userObject);
      blogService.setToken(userObject.token);
    }
  }, []); */

  /* const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  }; */

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

    refreshBlogs();
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

  /* if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {failureNotification && <div>{failureNotification}</div>}
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }
  console.log("user in app.js before return :>> ", user); */

  return (
    <>
      <Navbar />
      <main>
        <Notification
          successNotification={successNotification}
          failureNotification={failureNotification}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BlogList
                blogs={blogs}
                handleLike={handleLike}
                handleDelete={handleDelete}
              />
            )}
          />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route
            exact
            path="/newblog"
            render={() => <NewBlogForm handleNewBlog={handleNewBlog} />}
          />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default App;
