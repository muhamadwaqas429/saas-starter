import React from "react";

export default function StatCard({
  title,
  value,
  icon,
  change,
  trend,
  description,
  size = "md",
}) {
  // Adjust styles based on size
  const sizeStyles = {
    sm: "p-3 text-sm",
    md: "p-4 text-base",
    lg: "p-6 text-lg",
  };

  const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "";

  const arrowColor = trend === "up" ? "text-green-600" : "text-red-600";

  return (
    <div
      className={`flex items-center ${sizeStyles[size]} bg-white rounded-lg shadow hover:shadow-md transition-shadow w-full`}
    >
      {/* Icon */}
      {icon && (
        <div
          className={`p-2 rounded-full bg-gray-100 flex items-center justify-center`}
        >
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="ml-4 flex-1">
        <p className="text-gray-500 font-medium">{title}</p>
        <p className="text-gray-800 font-semibold text-xl">{value}</p>

        {change && (
          <p
            className={`flex items-center space-x-1 mt-1 font-medium ${arrowColor}`}
          >
            <span>{arrow}</span>
            <span>{change}</span>
          </p>
        )}

        {description && (
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
