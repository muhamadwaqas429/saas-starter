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
  admin: "#6366F1",
  active: "#22C55E",
  inactive: "#EF4444",
};

export default function UserPieChart({ data }) {
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
                entry.name === "Admins"
                  ? COLORS.admin
                  : entry.name === "Active Users"
                  ? COLORS.active
                  : COLORS.inactive
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
