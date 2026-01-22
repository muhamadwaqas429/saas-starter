import { Dialog } from "@headlessui/react";
import { useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

export default function AddChoiceModal({ open, onClose, onSuccess, optionId }) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !optionId) {
      toast.error("Choice name & option required");
      return;
    }

    try {
      await api.post("/menu/choice", {
        name,
        optionId,
      });

      toast.success("Choice added");
      setName("");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to add choice");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-4 rounded w-80">
          <Dialog.Title className="mb-3 font-semibold">Add Choice</Dialog.Title>

          <input
            className="w-full border p-2 mb-3"
            placeholder="Choice name"
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
