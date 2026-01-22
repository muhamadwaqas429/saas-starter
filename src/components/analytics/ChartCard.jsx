import React from "react";

export default function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 w-full h-full">
      <h2 className="font-semibold mb-4 text-gray-800">{title}</h2>
      {children}
    </div>
  );
}
