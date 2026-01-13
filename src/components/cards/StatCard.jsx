// src/components/cards/UsersStatsCards.jsx
import React from "react";

export default function UsersStatsCards({ users }) {
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const adminCount = users.filter((u) => u.role === "admin").length;

  const cardData = [
    {
      label: "Total Users",
      value: totalUsers,
      color: "bg-gradient-to-r from-blue-500 to-blue-700",
      icon: "👥",
    },
    {
      label: "Active Users",
      value: activeUsers,
      color: "bg-gradient-to-r from-green-500 to-green-700",
      icon: "✅",
    },
    {
      label: "Admins",
      value: adminCount,
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      icon: "🛡️",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {cardData.map((card) => (
        <div
          key={card.label}
          className={`${card.color} text-white rounded-xl shadow-lg p-5 flex items-center justify-between hover:scale-105 transform transition-transform duration-300`}
        >
          <div>
            <span className="text-sm uppercase font-medium opacity-90">
              {card.label}
            </span>
            <h2 className="text-3xl font-bold mt-1">{card.value}</h2>
          </div>
          <div className="text-4xl opacity-80">{card.icon}</div>
        </div>
      ))}
    </div>
  );
}
