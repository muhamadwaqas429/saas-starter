import { useEffect, useMemo, useState } from "react";
import api from "@/api/axios";
import useDebounce from "@/hooks/useDebounce";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // edit modal
  const [editUser, setEditUser] = useState(null);
  const [saving, setSaving] = useState(false);

  /* =========================
     FETCH USERS
  ========================== */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users", {
        params: {
          search: debouncedSearch,
          role: roleFilter,
          status: statusFilter,
        },
      });

      setUsers(res.data.data.users || []);
    } catch (err) {
      console.error("Fetch users error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, roleFilter, statusFilter]);

  /* =========================
     DELETE USER
  ========================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete user");
    }
  };

  /* =========================
     SAVE EDIT
  ========================== */
  const handleSave = async () => {
    if (!editUser?._id) return;

    try {
      setSaving(true);

      const res = await api.put(`/users/${editUser._id}`, {
        name: editUser.name,
        email: editUser.email,
        role: editUser.role,
        status: editUser.status,
      });

      setUsers((prev) =>
        prev.map((u) => (u._id === editUser._id ? res.data.data : u))
      );

      setEditUser(null);
    } catch (err) {
      console.error("Update error", err);
      alert("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     AVATAR INITIALS
  ========================== */
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0][0];
  };

  /* =========================
     RENDER
  ========================== */
  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                      {getInitials(user.name)}
                    </div>
                    <span>{user.name}</span>
                  </td>

                  <td className="p-3">{user.email}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        user.role === "admin" ? "bg-purple-600" : "bg-gray-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`inline-block h-3 w-3 rounded-full ${
                        user.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </td>

                  <td className="p-3 space-x-3">
                    <button
                      onClick={() => setEditUser({ ...user })}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Edit User</h2>

            <input
              className="w-full border px-3 py-2 rounded"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />

            <input
              className="w-full border px-3 py-2 rounded"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <select
              className="w-full border px-3 py-2 rounded"
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <select
              className="w-full border px-3 py-2 rounded"
              value={editUser.status}
              onChange={(e) =>
                setEditUser({ ...editUser, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
