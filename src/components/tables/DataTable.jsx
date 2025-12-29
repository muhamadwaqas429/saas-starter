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

  // Sync props from parent
  useEffect(() => {
    setUsers(propUsers || []);
    setLoading(propLoading);
  }, [propUsers, propLoading]);

  // Open edit modal
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

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated user
  const handleSave = async () => {
    if (!editingUser?._id) return toast.error("User ID missing");
    try {
      const res = await api.put(`/users/${editingUser._id}`, formData);
      toast.success("User updated successfully");

      // Update table locally
      setUsers((prev) =>
        prev.map((u) => (u._id === res.data.data._id ? res.data.data : u))
      );

      setModalOpen(false);
      setEditingUser(null);

      // Refresh parent if provided
      if (refreshUsers) refreshUsers();
    } catch (err) {
      console.error(err.response || err);
      toast.error(err.response?.data?.message || "Failed to update user");
    }
  };

  // Delete user
  const handleDelete = async (user) => {
    if (!user?._id) return toast.error("User ID missing");
    const ok = window.confirm(`Delete user "${user.name}"?`);
    if (!ok) return;

    try {
      await api.delete(`/users/${user._id}`);
      toast.success("User deleted successfully");

      // Remove from table
      setUsers((prev) => prev.filter((u) => u._id !== user._id));

      if (refreshUsers) refreshUsers();
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.status}</td>
                  <td className="px-4 py-2 space-x-2">
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

      {/* Edit Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/30"
      >
        <Dialog.Panel className="bg-white p-6 rounded w-full max-w-md">
          <Dialog.Title className="font-semibold mb-4">Edit User</Dialog.Title>

          <input
            className="w-full border p-2 mb-2"
            value={formData.name}
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 mb-2"
            value={formData.email}
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <select
            className="w-full border p-2 mb-2"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <select
            className="w-full border p-2 mb-4"
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
