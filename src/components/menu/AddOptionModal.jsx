import { Dialog } from "@headlessui/react";
import { useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

export default function AddOptionModal({
  open,
  onClose,
  onSuccess,
  itemId,
  onSelectOption,
}) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !itemId) {
      toast.error("Option name & item required");
      return;
    }

    try {
      const res = await api.post("/menu/option", {
        name,
        itemId,
      });

      toast.success("Option added");
      setName("");
      onSuccess();
      onSelectOption(res.data.data._id);
      onClose();
    } catch {
      toast.error("Failed to add option");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-4 rounded w-80">
          <Dialog.Title className="mb-3 font-semibold">Add Option</Dialog.Title>

          <input
            className="w-full border p-2 mb-3"
            placeholder="Option name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded"
          >
            Add
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
