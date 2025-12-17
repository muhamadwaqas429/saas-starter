import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const doLogin = (userData) => {
    // In frontend-only app, you can mock login
    dispatch(login(userData));
  };

  const doLogout = () => {
    dispatch(logout());
  };

  return { isAuthenticated, user, login: doLogin, logout: doLogout };
}
