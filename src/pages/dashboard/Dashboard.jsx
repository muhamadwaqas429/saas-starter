import React, { useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatCard from "@/components/cards/StatCard";
import DataTable from "@/components/tables/DataTable";
import { useUsers } from "@/features/users/useUsers";

export default function Dashboard() {
  const { users, initializeUsers } = useUsers();

  // Initialize dummy users for testing
  useEffect(() => {
    initializeUsers([
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ]);
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Users" value={users.length} />
        <StatCard label="Revenue" value="$2400" />
        <StatCard label="Active Plans" value="36" />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Users List</h2>
        <DataTable>
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
