import React, { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLoginFormSubmitted = (e) => {
    e.preventDefault();

    handleLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={onLoginFormSubmitted}>
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
  );
};

export default LoginForm;
