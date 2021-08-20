import React from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__listItem}>
          <Link to="/newblogform">New Blog</Link>
        </li>
        <li className={styles.nav__listItem}>
          <Link to="/bloglist">Blogs</Link>
        </li>
        <li className={styles.nav__listItem}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
