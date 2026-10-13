import React from "react";

const colGrids: Record<string, string> = {
  "1": "grid-cols-1 max-w-3xl",
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export interface NumberedSectionGridProps {
  children: React.ReactNode;
  columns?: number | string;
  className?: string;
  cslp?: Record<string, any>;
}

export default function NumberedSectionGrid({
  children,
  columns = 2,
  className = "",
  cslp,
}: NumberedSectionGridProps) {
  const colVal = String(columns).match(/[123]/)?.[0] || "2";
  const colGridClass = colGrids[colVal] ?? colGrids["2"];

  return (
    <div
      {...cslp}
      className={`grid ${colGridClass} gap-x-12 lg:gap-x-16 gap-y-10 md:gap-y-12 items-start ${className}`}
    >
      {children}
    </div>
  );
}
