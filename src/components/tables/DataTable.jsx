import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import api from "@/api/axios";

export default function UsersTable({
  users: propUsers = [],
  loading: propLoading = false,
  refreshUsers,
}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  useEffect(() => {
    setUsers(propUsers || []);
    setLoading(propLoading);
  }, [propUsers, propLoading]);

  const handleEdit = (user) => {
    if (!user?._id) return toast.error("User ID missing");
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      status: user.status || "active",
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingUser?._id) return toast.error("User ID missing");
    try {
      const res = await api.put(`/users/${editingUser._id}`, formData);
      toast.success("User updated successfully");
      setUsers((prev) =>
        prev.map((u) => (u._id === res.data.data._id ? res.data.data : u))
      );
      setModalOpen(false);
      setEditingUser(null);
      refreshUsers?.();
    } catch (err) {
      console.error(err.response || err);
      toast.error(err.response?.data?.message || "Failed to update user");
    }
  };

  const handleDelete = async (user) => {
    if (!user?._id) return toast.error("User ID missing");
    if (!window.confirm(`Delete user "${user.name}"?`)) return;
    try {
      await api.delete(`/users/${user._id}`);
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
      refreshUsers?.();
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-2 w-1/5">Name</th>
              <th className="px-4 py-2 w-1/3">Email</th>
              <th className="px-4 py-2 w-1/6">Role</th>
              <th className="px-4 py-2 w-1/6">Status</th>
              <th className="px-4 py-2 w-1/6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2 break-words">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2 capitalize">{user.status}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/30"
      >
        <Dialog.Panel className="bg-white p-6 rounded w-full max-w-md">
          <Dialog.Title className="font-semibold mb-4">Edit User</Dialog.Title>

          <input
            className="w-full border p-2 mb-2 rounded"
            value={formData.name}
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 mb-2 rounded"
            value={formData.email}
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <select
            className="w-full border p-2 mb-2 rounded"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <select
            className="w-full border p-2 mb-4 rounded"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
