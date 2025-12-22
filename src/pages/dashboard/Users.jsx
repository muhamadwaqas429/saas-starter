import React from "react";
import { DataTable } from "../../components/tables/DataTable";
import users from "@/data/mockData.json";

export default function Users() {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
