// src/components/cards/MenuStatsCards.jsx
import React from "react";

export default function MenuStatsCards({ stats }) {
  const cardData = [
    {
      label: "Total Menus",
      value: stats.totalMenus,
      color: "bg-gradient-to-r from-indigo-500 to-indigo-700",
      icon: "📂",
    },
    {
      label: "Total Items",
      value: stats.totalItems,
      color: "bg-gradient-to-r from-green-500 to-green-700",
      icon: "🍔",
    },
    {
      label: "Total Options",
      value: stats.totalOptions,
      color: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      icon: "⚙️",
    },
    {
      label: "Total Choices",
      value: stats.totalChoices,
      color: "bg-gradient-to-r from-pink-500 to-pink-700",
      icon: "🎯",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
