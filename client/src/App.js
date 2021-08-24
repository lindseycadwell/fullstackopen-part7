import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
//import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";

import blogService from "./services/blogs";

import { loadUser } from "./slices/currentUserSlice";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("app.js useEffect()");
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    console.log("loggedUserJSON :>> ", loggedUserJSON);
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON);
      dispatch(loadUser(userObject));
      blogService.setToken(userObject.token);
    }
  }, []);

  /* const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  }; */

  /* const handleNotification = (input) => {
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
  }; */

  /* const handleLike = (blog) => {
    console.log("pressed like button on blog: ");
    console.log("blog :>> ", blog);

    let updatedBlog = blog;
    updatedBlog.likes = blog.likes + 1;

    blogService.updateOne(updatedBlog).then((blog) => {
      console.log("updated blog :>> ", blog);

      refreshBlogs();
    });

    return;
  }

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
 */

  return (
    <>
      <Navbar />
      <main>
        {/* <Notification
          successNotification={successNotification}
          failureNotification={failureNotification}
        /> */}
        <Switch>
          <Route exact path="/" render={() => <BlogList />} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/newblog" render={() => <NewBlogForm />} />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default App;
