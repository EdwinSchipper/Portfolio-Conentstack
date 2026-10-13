import React from "react";

export interface ServiceCardTagProps {
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function ServiceCardTag({
  children,
  className = "",
  cslp,
}: ServiceCardTagProps) {
  if (!children) return null;

  return (
    <span
      {...cslp}
      className={`inline-block px-3 py-1 bg-white border border-gray-200/90 rounded-lg text-xs font-mono font-medium text-gray-800 shadow-2xs ${className}`}
    >
      {children}
    </span>
  );
}
