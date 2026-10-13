import React from "react";

export interface ContentTitleProps {
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function ContentTitle({
  children,
  className = "",
  cslp,
}: ContentTitleProps) {
  if (!children) return null;

  return (
    <h2
      {...cslp}
      className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 ${className}`}
    >
      {children}
    </h2>
  );
}
