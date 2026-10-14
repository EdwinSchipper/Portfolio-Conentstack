import React from "react";

export interface NumberBadgeProps {
  number: number | string;
  className?: string;
  cslp?: Record<string, any>;
}

/**
 * NumberBadge renders a padded, monospace number badge (e.g. "01", "02").
 */
export default function NumberBadge({
  number,
  className = "",
  cslp,
}: NumberBadgeProps) {
  const numStr =
    number !== undefined && number !== null
      ? String(number).padStart(2, "0")
      : "";

  if (!numStr) return null;

  return (
    <div
      {...cslp}
      className={`self-start shrink-0 inline-flex items-center justify-center rounded-lg bg-border-100 dark:bg-border-200 py-2 px-3 sm:py-2.5 sm:px-3.5 select-none ${className}`}
    >
      <span className="text-title-100 dark:text-title-200 font-playfull text-smallM sm:text-medium font-bold">
        {numStr}
      </span>
    </div>
  );
}
