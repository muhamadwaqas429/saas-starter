import { createContext, useContext, useState, useEffect } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await api.get("/menu");
      setSections(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ sections, fetchMenu, loading }}>
      {children}
    </MenuContext.Provider>
  );
};
