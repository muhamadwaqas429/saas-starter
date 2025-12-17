import { useDispatch, useSelector } from "react-redux";
import { setUsers, addUser, clearUsers } from "./usersSlice";

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users || []);
  const setAllUsers = (users) => dispatch(setUsers(users));
  const addNewUser = (user) => dispatch(addUser(user));
  const clearAllUsers = () => dispatch(clearUsers());

  return { users, setAllUsers, addNewUser, clearAllUsers };
};
