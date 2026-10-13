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
      className={`shrink-0 flex items-center justify-center w-11 h-9 sm:w-12 sm:h-10 rounded-lg sm:rounded-xl bg-[#ededeb] text-gray-900 font-mono font-bold text-xs sm:text-sm tracking-tight select-none ${className}`}
    >
      {numStr}
    </div>
  );
}
