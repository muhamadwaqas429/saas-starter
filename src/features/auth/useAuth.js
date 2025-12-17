import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "./authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    login: (data) => dispatch(loginSuccess(data)),
    logout: () => dispatch(logout()),
  };
};
