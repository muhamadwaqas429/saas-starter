// src/components/menu/MenuColumn.jsx
import MenuCard from "./MenuCard";
import MenuColumnHeader from "./MenuColumnHeader";

export default function MenuColumn({
  title,
  items = [],
  selectedId,
  onSelect,
  onAdd,
}) {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <MenuColumnHeader title={title} onAdd={onAdd} />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">No entries</p>
        ) : (
          items.map((item) => (
            <MenuCard
              key={item.id}
              title={item.name}
              selected={item.id === selectedId}
              onClick={() => onSelect(item)}
            />
          ))
        )}
      </div>
    </div>
  );
}
