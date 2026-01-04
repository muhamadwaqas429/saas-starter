// src/components/menu/MenuTable.jsx
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import api from "@/api/axios";

export default function MenuTable({
  menu: propMenu = [],
  loading: propLoading = false,
  refreshMenu,
}) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    setMenu(propMenu || []);
    setLoading(propLoading);
  }, [propMenu, propLoading]);

  const handleEdit = (item) => {
    if (!item?.id) return toast.error("Item ID missing");
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      status: item.status || "active",
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingItem?.id) return toast.error("Item ID missing");
    try {
      const res = await api.put(`/menu/items/${editingItem.id}`, formData);
      toast.success("Item updated successfully");
      setMenu((prev) =>
        prev.map((m) => (m.id === res.data.data.id ? res.data.data : m))
      );
      setModalOpen(false);
      setEditingItem(null);
      refreshMenu?.();
    } catch (err) {
      console.error(err.response || err);
      toast.error(err.response?.data?.message || "Failed to update item");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading menu...</p>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Menu Hierarchy</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-2 w-1/4">Title</th>
              <th className="px-4 py-2 w-1/4">Description</th>
              <th className="px-4 py-2 w-1/6">Items Count</th>
              <th className="px-4 py-2 w-1/6">Status</th>
              <th className="px-4 py-2 w-1/6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {menu.length ? (
              menu.map((section) => (
                <tr key={section.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2">{section.title}</td>
                  <td className="px-4 py-2">{section.description}</td>
                  <td className="px-4 py-2">{section.items?.length || 0}</td>
                  <td className="px-4 py-2 capitalize">
                    {section.status || "active"}
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(section)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No menu sections found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== EDIT MODAL ===== */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/30"
      >
        <Dialog.Panel className="bg-white p-6 rounded w-full max-w-md">
          <Dialog.Title className="font-semibold mb-4">
            Edit Menu Section
          </Dialog.Title>

          <input
            className="w-full border p-2 mb-2 rounded"
            value={formData.title}
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 mb-2 rounded"
            value={formData.description}
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
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
