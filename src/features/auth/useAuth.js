import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const doLogin = (userData) => {
    dispatch(login(userData));
  };

  const doLogout = () => {
    dispatch(logout());
  };

  return {
    isLoggedIn,
    user,
    doLogin,
    doLogout,
  };
}
