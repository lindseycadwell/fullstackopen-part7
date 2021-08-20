import React from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = ({ usersName, handleLogout }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__listItem}>
          <Link to="/">Blogs</Link>
        </li>
        <li className={styles.nav__listItem}>
          <Link to="/newblog">Create New Blog</Link>
        </li>
        <li className={styles.nav__listItem}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <span>Logged in as {usersName} </span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
