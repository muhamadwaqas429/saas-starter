import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800 ${className}`}
    >
      {children}
    </button>
  );
}
