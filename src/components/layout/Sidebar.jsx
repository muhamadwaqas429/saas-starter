import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import {
  HomeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  CreditCardIcon,
  CogIcon,
  LifebuoyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";



const sections = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
      { name: "Analytics", path: "/dashboard/analytics", icon: ChartBarIcon },
      { name: "Reports", path: "/dashboard/reports", icon: DocumentTextIcon },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Users", path: "/dashboard/users", icon: UsersIcon },
      { name: "Billing", path: "/dashboard/billing", icon: CreditCardIcon },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Settings", path: "/dashboard/settings", icon: CogIcon },
      { name: "Help", path: "/dashboard/help", icon: LifebuoyIcon },
    ],
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const widthClass = collapsed ? "w-20" : "w-64";

  const handleLogout = () => {
    logout();
    navigate("/login");
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${widthClass}
          bg-slate-900 border-r border-slate-800
          transform transition-all duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          {!collapsed && (
            <span className="text-lg font-semibold">SaaS Starter</span>
          )}

          <div className="flex items-center gap-2">
            <button
              className="hidden lg:flex text-slate-400 hover:text-white"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRightIcon className="h-5 w-5" />
              ) : (
                <ChevronLeftIcon className="h-5 w-5" />
              )}
            </button>

            <button
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-6 overflow-y-auto flex-1">
          {sections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="px-3 mb-2 text-xs uppercase tracking-wide text-slate-500">
                  {section.title}
                </p>
              )}

              <div className="space-y-1">
                {section.items.map(({ name, path, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                      ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{name}</span>}

                    {collapsed && (
                      <span className="absolute left-14 z-50 rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">
                        {name}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-3 py-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-red-500 hover:bg-slate-800 w-full"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
