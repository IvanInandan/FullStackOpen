import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";

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

      <Form onSubmit={attemptLogin}>
        <Form.Group>
          <Form.Label>username: </Form.Label>
          <Form.Control
            type="text"
            name="username"
            data-testid="usrename"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>password: </Form.Label>
          <Form.Control
            type="password"
            name="password"
            data-testid="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
