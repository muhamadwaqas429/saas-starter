import { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axios";
import { useAuth } from "@/features/auth/useAuth";

const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (params = {}) => {
    if (!user?.token) return; // skip fetch if not logged in

    try {
      setLoading(true);
      const res = await api.get("/users", {
        params: { page, limit, ...params },
        headers: { Authorization: `Bearer ${user.token}` }, // send token
      });
      setUsers(res.data.data.users || []);
      setTotalPages(res.data.data.totalPages || 1);
    } catch (err) {
      console.error("Fetch users error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, user]); // refetch when user logs in

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
        page,
        setPage,
        limit,
        setLimit,
        totalPages,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used inside UsersProvider");
  return ctx;
};
