import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <HomeIcon className="h-5 w-5" /> },
  { name: "Users", path: "/dashboard/users", icon: <UsersIcon className="h-5 w-5" /> },
  { name: "Settings", path: "/dashboard/settings", icon: <Cog6ToothIcon className="h-5 w-5" /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-4">
      <h1 className="text-xl font-bold mb-8">SaaS Starter</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                isActive ? "bg-gray-100 font-semibold" : ""
              }`
            }
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
