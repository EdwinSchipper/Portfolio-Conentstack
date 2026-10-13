import React from "react";

const colGrids: Record<string, string> = {
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export interface CardGridProps {
  children: React.ReactNode;
  columns?: number | string;
  className?: string;
  cslp?: Record<string, any>;
}

export default function CardGrid({
  children,
  columns = 3,
  className = "",
  cslp,
}: CardGridProps) {
  const colVal = String(columns).match(/[234]/)?.[0] || "3";
  const colGridClass = colGrids[colVal] ?? colGrids["3"];

  return (
    <div
      {...cslp}
      className={`grid ${colGridClass} gap-8 items-stretch ${className}`}
    >
      {children}
    </div>
  );
}
