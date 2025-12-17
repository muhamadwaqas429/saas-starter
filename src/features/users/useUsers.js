import { useSelector, useDispatch } from "react-redux";
import { setUsers, addUser, removeUser, clearUsers } from "./usersSlice";

export default function useUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const initializeUsers = (userList) => {
    dispatch(setUsers(userList));
  };

  const createUser = (user) => {
    dispatch(addUser(user));
  };

  const deleteUser = (id) => {
    dispatch(removeUser(id));
  };

  const resetUsers = () => {
    dispatch(clearUsers());
  };

  return {
    users,
    initializeUsers,
    createUser,
    deleteUser,
    resetUsers,
  };
}
