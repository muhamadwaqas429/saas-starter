import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-screen p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className="hover:text-slate-700">Dashboard</Link>
        <Link to="/dashboard/users" className="hover:text-slate-700">Users</Link>
        <Link to="/dashboard/settings" className="hover:text-slate-700">Settings</Link>
      </nav>
    </aside>
  );
}
