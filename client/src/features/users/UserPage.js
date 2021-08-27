import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUsers } from "./usersSlice";

const UserPage = () => {
  const { userId } = useParams();
  const users = useSelector(selectUsers);
  const user = users.find((user) => user.id === userId);

  const renderedUserBlogs = user.blogs.map((blog) => {
    return (
      <li key="blog.id">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </li>
    );
  });

  return (
    <>
      <h2>{user.name}&apos;s blogs:</h2>
      <ul>{renderedUserBlogs}</ul>
    </>
  );
};

export default UserPage;
