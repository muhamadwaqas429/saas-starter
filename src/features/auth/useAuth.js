import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout as logoutAction } from "./authSlice";
import mockData from "../../data/users.mock.json";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = (email, password) => {
    const user = mockData.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) return false;

    dispatch(
      loginSuccess({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );

    return true;
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    login,
    logout,
  };
}
