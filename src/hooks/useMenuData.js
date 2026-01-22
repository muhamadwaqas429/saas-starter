// src/hooks/useMenuData.js
import { useEffect, useState, useMemo } from "react";
import api from "@/api/axios"; // centralized axios instance

export default function useMenuData() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await api.get("/menu"); // fetch menu from backend
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

  // Compute stats dynamically
  const stats = useMemo(() => {
    let totalMenus = menu.length;
    let totalItems = 0;
    let totalOptions = 0;
    let totalChoices = 0;

    menu.forEach((section) => {
      totalItems += section.items?.length || 0;
      section.items?.forEach((item) => {
        totalOptions += item.options?.length || 0;
        item.options?.forEach((opt) => {
          totalChoices += opt.choices?.length || 0;
        });
      });
    });

    return { totalMenus, totalItems, totalOptions, totalChoices };
  }, [menu]);

  return { menu, loading, stats, refresh: fetchMenu };
}
