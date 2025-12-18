import { useSelector } from "react-redux";

export function useUsers() {
  const users = useSelector((state) => state.users.list || []);
  return { users };
}
