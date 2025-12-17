import React from "react";

export default function Navbar() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Admin</span>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
}
