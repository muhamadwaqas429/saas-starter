// src/pages/dashboard/Analytics.jsx
import React, { useMemo } from "react";
import { useUsers } from "@/context/UsersContext";
import useMenuData from "@/hooks/useMenuData.js";

import ChartCard from "../../components/analytics/ChartCard";
import UserPieChart from "../../components/analytics/UserPieChart";
import UsersBarChart from "../../components/analytics/UsersBarChart";
import UsersStackedChart from "../../components/analytics/UsersStackedChart";
import MenuPieChart from "../../components/analytics/MenuPieChart";
import MenuStackedChart from "../../components/analytics/MenuStackedChart";
import MenuRadarChart from "../../components/analytics/MenuRadarChart";

export default function Analytics() {
  const { users, loading: loadingUsers } = useUsers();
  const { menu, loading: loadingMenu } = useMenuData();

  const usersList = useMemo(() => users || [], [users]);
  const menuList = useMemo(() => menu || [], [menu]);

  if (loadingUsers || loadingMenu)
    return <div className="p-6 text-gray-500">Loading analytics...</div>;

  /** ===== USERS STATS ===== */
  const totalUsers = usersList.length;
  const activeUsers = usersList.filter((u) => u.status === "active").length;
  const inactiveUsers = totalUsers - activeUsers;
  const adminUsers = usersList.filter((u) => u.role === "admin").length;

  const pieDataUsers = [
    { name: "Admins", value: adminUsers },
    { name: "Active Users", value: activeUsers },
    { name: "Inactive Users", value: inactiveUsers },
  ];

  const barDataUsers = Object.entries(
    usersList.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {})
  ).map(([role, value]) => ({ role, value }));

  const stackedUsers = [
    {
      role: "Admin",
      active: usersList.filter(
        (u) => u.role === "admin" && u.status === "active"
      ).length,
      inactive: usersList.filter(
        (u) => u.role === "admin" && u.status === "inactive"
      ).length,
    },
    {
      role: "User",
      active: usersList.filter(
        (u) => u.role === "user" && u.status === "active"
      ).length,
      inactive: usersList.filter(
        (u) => u.role === "user" && u.status === "inactive"
      ).length,
    },
  ];

  /** ===== MENU STATS ===== */
  const totalSections = menuList.length;
  const totalItems = menuList.reduce(
    (acc, s) => acc + (s.items?.length || 0),
    0
  );
  const totalOptions = menuList.reduce(
    (acc, s) =>
      acc +
      (s.items?.reduce((iAcc, item) => iAcc + (item.options?.length || 0), 0) ||
        0),
    0
  );
  const totalChoices = menuList.reduce(
    (acc, s) =>
      acc +
      (s.items?.reduce(
        (iAcc, item) =>
          iAcc +
          (item.options?.reduce(
            (oAcc, opt) => oAcc + (opt.choices?.length || 0),
            0
          ) || 0),
        0
      ) || 0),
    0
  );

  const menuPieData = [
    { name: "Sections", value: totalSections },
    { name: "Items", value: totalItems },
    { name: "Options", value: totalOptions },
    { name: "Choices", value: totalChoices },
  ];

  const menuStackedData = menuList.map((section) => ({
    section: section.name,
    items: section.items?.length || 0,
    options: section.items?.reduce(
      (acc, item) => acc + (item.options?.length || 0),
      0
    ),
    choices: section.items?.reduce(
      (acc, item) =>
        acc +
        (item.options?.reduce(
          (oAcc, opt) => oAcc + (opt.choices?.length || 0),
          0
        ) || 0),
      0
    ),
  }));

  const radarData = [
    { name: "Sections", value: totalSections },
    { name: "Items", value: totalItems },
    { name: "Options", value: totalOptions },
    { name: "Choices", value: totalChoices },
  ];

  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* ===== USERS CHARTS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="User Status Distribution">
          <UserPieChart data={pieDataUsers} />
        </ChartCard>

        <ChartCard title="Users by Role">
          <UsersBarChart data={barDataUsers} />
        </ChartCard>

        <ChartCard title="Role vs Status Overview">
          <UsersStackedChart data={stackedUsers} />
        </ChartCard>
      </div>

      {/* ===== MENU CHARTS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Menu Distribution">
          <MenuPieChart data={menuPieData} />
        </ChartCard>

        <ChartCard title="Menu Composition (Stacked)">
          <MenuStackedChart data={menuStackedData} />
        </ChartCard>

        <ChartCard title="Menu Overview Radar">
          <MenuRadarChart data={radarData} />
        </ChartCard>
      </div>
    </div>
  );
}
