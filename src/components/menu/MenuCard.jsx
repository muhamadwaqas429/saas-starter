// src/components/menu/MenuCard.jsx
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MenuCard({ title, selected, onClick }) {
  return (
    <motion.div
      layout
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-xl border px-4 py-3 transition-all",
        "bg-white dark:bg-slate-900",
        selected
          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
          : "border-slate-200 dark:border-slate-800 hover:border-indigo-400"
      )}
    >
      <p
        className={cn(
          "text-sm font-medium",
          selected
            ? "text-indigo-700 dark:text-indigo-300"
            : "text-slate-700 dark:text-slate-300"
        )}
      >
        {title}
      </p>
    </motion.div>
  );
}
