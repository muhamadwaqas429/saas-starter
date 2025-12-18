import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useUsers } from "@/features/users/useUsers";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/tables/DataTable";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function Users() {
  const { users } = useUsers();
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:text-blue-700">
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Users</h2>

      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm"
      />

      <DataTable columns={columns} data={filteredUsers} />
    </div>
  );
}
