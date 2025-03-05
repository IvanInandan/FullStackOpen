import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = async (event) => {
    event.preventDefault();

    const success = await handleLogin({
      username: username,
      password: password,
    });

    setUsername("");
    setPassword("");

    if (success === true) {
      console.log("Login Successful");
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={attemptLogin}>
        <div>
          Username
          <input
            data-testid="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          Password
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
