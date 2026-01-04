// src/pages/dashboard/analytics/MenuRadarChart.jsx
import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Sections: "#3B82F6",
  Items: "#10B981",
  Options: "#F59E0B",
  Choices: "#8B5CF6",
};

export default function MenuRadarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis
          angle={30}
          domain={[0, Math.max(...data.map((d) => d.value)) + 2]}
        />
        {data.map((entry, index) => (
          <Radar
            key={index}
            name={entry.name}
            dataKey="value"
            stroke={COLORS[entry.name]}
            fill={COLORS[entry.name]}
            fillOpacity={0.6}
          />
        ))}
        <Tooltip
          formatter={(value, name) => [`${value}`, name]}
          contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
