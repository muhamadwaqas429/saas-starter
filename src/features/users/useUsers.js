import { useDispatch, useSelector } from "react-redux";
import { setUsers, addUser, clearUsers } from "./usersSlice";

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  return {
    users,
    setUsers: (data) => dispatch(setUsers(data)),
    addUser: (user) => dispatch(addUser(user)),
    clearUsers: () => dispatch(clearUsers()),
  };
};
