import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import Notification from "./features/notifications/Notification";
import BlogList from "./features/blogs/BlogList";
import BlogPage from "./features/blogs/BlogPage";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import NewBlogForm from "./features/blogs/NewBlogForm";
import LoginForm from "./features/auth/LoginForm";
import Footer from "./components/Footer";

import blogsService from "./features/blogs/blogsService";
import { fetchBlogs } from "./features/blogs/blogsSlice";
import { fetchUsers } from "./features/users/usersSlice";
import { loadUser } from "./features/auth/currentUserSlice";
import useAuth from "./hooks/useAuth";
import useAsyncEffect from "./hooks/useAsyncEffect";
import ProtectedRoute from "./utilities/ProtectedRoute";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON);
      dispatch(loadUser(userObject));
      blogsService.setToken(userObject.token);
    }
  }, []);

  useAsyncEffect(() => dispatch(fetchBlogs()), [dispatch]);
  useAsyncEffect(() => dispatch(fetchUsers()), [dispatch]);

  return (
    <>
      <Navbar />
      <main>
        <Notification />
        <Switch>
          <Route exact path="/" render={() => <BlogList />} />
          <Route exact path="/blogs/:blogId" component={BlogPage} />
          <Route exact path="/users" render={() => <UsersList />} />
          <Route exact path="/users/:userId" component={UserPage} />

          <Route exact path="/login" render={() => <LoginForm />} />
          <ProtectedRoute
            exact
            isAuthenticated={isAuthenticated}
            path="/newblog"
          >
            <NewBlogForm />
          </ProtectedRoute>
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default App;
