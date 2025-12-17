import { useDispatch, useSelector } from "react-redux";
import { setUsers, addUser, clearUsers } from "./usersSlice";

export const useUsers = () => {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);

  const setAllUsers = (users) => dispatch(setUsers(users));
  const addNewUser = (user) => dispatch(addUser(user));
  const clearAllUsers = () => dispatch(clearUsers());

  return { usersState, setAllUsers, addNewUser, clearAllUsers };
};
