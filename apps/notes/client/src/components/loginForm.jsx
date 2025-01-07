const LoginForm = ({ username, password, handleLogin }) => {
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        username="username"
        onChange={({ target }) => setUserusername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        username="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>;
};

export default LoginForm;
