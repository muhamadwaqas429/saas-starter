import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  ChevronLeft
} from "lucide-react";

export default function Sidebar({ isOpen, toggle }) {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart3 /> },
    { name: "Users", path: "/users", icon: <Users /> },
    { name: "Settings", path: "/settings", icon: <Settings /> },
  ];

  return (
    <aside
      className={`h-screen bg-slate-900 border-r border-slate-800
      transition-all duration-300
      ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Logo / Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        {isOpen && (
          <span className="text-lg font-semibold text-white">
            SaaS Panel
          </span>
        )}

        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm
              transition-colors
              ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
