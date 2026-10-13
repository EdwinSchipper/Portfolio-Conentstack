import React from "react";

export interface GridLabelProps {
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function GridLabel({
  children,
  className = "",
  cslp,
}: GridLabelProps) {
  if (!children) return null;

  return (
    <span
      {...cslp}
      className={`text-xs font-bold tracking-widest text-[#f05a46] uppercase mb-2 block ${className}`}
    >
      {children}
    </span>
  );
}
