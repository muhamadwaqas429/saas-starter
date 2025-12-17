import React from "react";

export default function InputField({ label, id, type = "text", ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id} className="mb-1 text-gray-700">{label}</label>}
      <input
        id={id}
        type={type}
        {...props}
        className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
    </div>
  );
}
