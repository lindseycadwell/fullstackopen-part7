import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { login } from "../slices/currentUserSlice";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttemptStatus, setLoginAttemptStatus] = useState("idle");

  /*  const onLoginFormSubmitted2 = async (e) => {
    e.preventDefault();

    try {
      const userRes = await authService.login({
        username,
        password,
      });

      console.log("userRes :>> ", userRes);
      console.log("userRes.data.username :>> ", userRes.data.username);

      if (!userRes.success) {
        console.log(userRes);
        return handleNotification({
          success: false,
          message: "Error: invalid username or password",
          duration: 5000,
        });
      }

      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userRes.data)
      );
      blogService.setToken(userRes.data.token);

      setUser(userRes.data);
    } catch (exception) {
      console.log("Error logging in: ", exception);

      return handleNotification({
        success: false,
        message: "Error: invalid username or password",
        duration: 5000,
      });
    }
  };
 */

  const onLoginFormSubmitted = async (e) => {
    e.preventDefault();

    try {
      setLoginAttemptStatus("pending");

      const resultAction = await dispatch(login({ username, password }));
      unwrapResult(resultAction);

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Failed to log in: ", error);
    } finally {
      setLoginAttemptStatus("idle");
    }
  };

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
