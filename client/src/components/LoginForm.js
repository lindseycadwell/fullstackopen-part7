import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { login } from "../slices/currentUserSlice";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttemptStatus, setLoginAttemptStatus] = useState("idle");
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const dispatch = useDispatch();

  const { state } = useLocation();

  const onLoginFormSubmitted = async (e) => {
    e.preventDefault();

    try {
      setLoginAttemptStatus("pending");

      const resultAction = await dispatch(login({ username, password }));
      unwrapResult(resultAction);

      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(resultAction.payload)
      );

      setRedirectToReferrer(true);
    } catch (error) {
      console.error("Failed to log in: ", error);
    }
  };

  if (redirectToReferrer) {
    return <Redirect to={state.from || "/"} />;
  }

  return (
    <>
      <form onSubmit={onLoginFormSubmitted}>
        <h2>Login to the application</h2>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="usernameInput"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="passwordInput"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="loginButton">
          login
        </button>
      </form>
      {loginAttemptStatus === "pending" && <div>Logging in...</div>}
    </>
  );
};

export default LoginForm;
