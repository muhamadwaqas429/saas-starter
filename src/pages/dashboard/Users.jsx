import React from "react";
import DataTable from "@/components/tables/DataTable";
import { useUsers } from "@/features/users/useUsers";
import { Switch } from "@/components/ui/switch";

export default function Users() {
  const { users } = useUsers();

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "active",
      label: "Active",
      render: (value, row) => <Switch checked={value} readOnly />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <button
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => alert(`Edit user: ${row.name}`)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Users</h2>
      <DataTable columns={columns} data={users || []} />
    </div>
  );
}
