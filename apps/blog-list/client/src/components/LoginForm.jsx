import PropTypes from "prop-types";

import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = (event) => {
    event.preventDefault();
    handleLogin(username, password);
    setUsername(""); // reset username state
    setPassword(""); // reset password state
  };

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
  };

  return (
    <div>
      <h2 data-testid="login">Login</h2>

      <form onSubmit={attemptLogin}>
        <div>
          Username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
