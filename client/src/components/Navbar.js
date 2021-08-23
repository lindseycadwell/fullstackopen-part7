import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  selectCurrentUser,
  selectIsAuthenticated,
  logout,
} from "../slices/currentUserSlice";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log("user :>> ", user);

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
      {isAuthenticated && (
        <button onClick={() => dispatch(logout())}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
