// src/components/menu/MenuColumnHeader.jsx
export default function MenuColumnHeader({ title, onAdd }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {title}
      </h3>

      <button
        onClick={onAdd}
        className="text-xs font-medium text-indigo-600 hover:underline"
      >
        + Add
      </button>
    </div>
  );
}
