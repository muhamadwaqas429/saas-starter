// src/pages/dashboard/analytics/MenuPieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  menu: "#3B82F6",
  item: "#10B981",
  option: "#F59E0B",
  choice: "#8B5CF6",
};

export default function MenuPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={4}
          label
        >
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={
                entry.name === "Sections"
                  ? COLORS.menu
                  : entry.name === "Items"
                  ? COLORS.item
                  : entry.name === "Options"
                  ? COLORS.option
                  : COLORS.choice
              }
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
}
