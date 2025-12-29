import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"; // Axios instance

const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      // Ensure we have _id for each user
      const normalizedUsers = res.data.data.users.map((u) => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role || "user",
        status: u.status || "active",
      }));
      setUsers(normalizedUsers);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, loading, fetchUsers, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

// Custom hook
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error("useUsers must be used inside UsersProvider");
  return context;
};
