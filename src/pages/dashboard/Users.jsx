import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DataTable from "@/components/tables/DataTable";
import Button from "@/components/buttons/Button";
import InputField from "@/components/forms/InputField";
import { useUsers } from "@/features/users/useUsers";

export default function Users() {
  const { users, createUser, deleteUser } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = () => {
    if (!name || !email) return;

    const newUser = {
      id: Date.now(),
      name,
      email,
    };
    createUser(newUser);
    setName("");
    setEmail("");
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
        <div className="flex gap-4 mb-4">
          <InputField
            label="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleAddUser}>Add User</Button>
        </div>
      </div>

      <DataTable>
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <Button
                    variant="destructive"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </DashboardLayout>
  );
}
