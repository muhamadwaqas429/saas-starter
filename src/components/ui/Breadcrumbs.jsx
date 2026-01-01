import React from "react";
import { cn } from "@/lib/utils";

/**
 * Breadcrumbs
 * Props:
 * - children: array of breadcrumb items
 * - className: optional extra classes
 */
export function Breadcrumbs({ children, className }) {
  const items = React.Children.toArray(children);
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex flex-wrap gap-1 text-gray-500", className)}
    >
      {items.map((child, idx) => (
        <span key={idx} className="flex items-center gap-1">
          {child}
          {idx < items.length - 1 && <span className="text-gray-400">/</span>}
        </span>
      ))}
    </nav>
  );
}
