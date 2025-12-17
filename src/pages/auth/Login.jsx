import { useAuth } from "../../features/auth/useAuth";

const Login = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <h2>Auth Test</h2>

      <p>Authenticated: {isAuthenticated ? "YES" : "NO"}</p>
      <p>User: {user ? user.name : "None"}</p>

      <button onClick={() => login({ name: "Waqas" })}>Login</button>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Login;
