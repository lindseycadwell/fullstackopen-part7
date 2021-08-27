import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUsers } from "./usersSlice";

const UsersList = () => {
  const users = useSelector(selectUsers);

  const renderedUsers = users.map((user) => {
    return (
      <li key={user.id}>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </li>
    );
  });

  return (
    <>
      <h2>Users:</h2>
      <ul>{renderedUsers}</ul>
    </>
  );
};

export default UsersList;
