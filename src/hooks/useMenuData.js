// src/hooks/useMenuData.js
import { useEffect, useState } from "react";
import api from "@/api/axios"; // centralized axios instance

export default function useMenuData() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      // Remove extra /api since baseURL already has /api
      const res = await api.get("/menu");
      setMenu(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return { menu, loading, refresh: fetchMenu };
}
