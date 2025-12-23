import { useState, useMemo } from "react";
import mockData from "@/data/mockData";

export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return mockData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.status === "active");
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, roleFilter, statusFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All Status</option>
          <option value="active">Active Only</option>
        </select>
      </div>

      {/* User Table */}
      <table className="min-w-fullbg-white border rounded">
        <thead>
          <tr>
            <th className="p-2 border-b">Avatar</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Role</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border-b">
                  <img
                    src={user.avatar}
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                </td>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">
                  <span
                    className={`px-2 py-1 rounded ${
                      user.role === "admin"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-2 border-b">
                  <span
                    className={`h-3 w-3 rounded-full inline-block ${
                      user.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </td>
                <td className="p-2 border-b">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => console.log("Edit", user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => console.log("Delete", user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
