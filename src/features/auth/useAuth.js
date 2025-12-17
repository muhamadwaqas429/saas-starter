import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const doLogin = (userData) => {
    dispatch(login(userData));
  };

  const doLogout = () => {
    dispatch(logout());
  };

  return { authState, doLogin, doLogout };
};
