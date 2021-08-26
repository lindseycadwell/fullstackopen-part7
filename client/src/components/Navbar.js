import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../features/auth/currentUserSlice";
import { setNotificationWithTimeout } from "../features/notifications/notificationSlice";
import useAuth from "../hooks/useAuth";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser: user } = useAuth();

  const onLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logout());
    dispatch(
      setNotificationWithTimeout({
        content: "You have logged out",
        type: "success",
      })
    );
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__listItem}>
          <Link to="/">Blogs</Link>
        </li>
        <li className={styles.nav__listItem}>
          <Link to="/newblog">Create New Blog</Link>
        </li>
        {!isAuthenticated && (
          <li className={styles.nav__listItem}>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      {isAuthenticated && <span>Logged in as {user.name} </span>}
      {isAuthenticated && <button onClick={onLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
