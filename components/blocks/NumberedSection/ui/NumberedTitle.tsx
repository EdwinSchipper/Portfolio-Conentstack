import React from "react";

export interface NumberedTitleProps {
  children: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function NumberedTitle({
  children,
  className = "",
  cslp,
}: NumberedTitleProps) {
  if (!children) return null;

  return (
    <h2
      {...cslp}
      className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 ${className}`}
    >
      {children}
    </h2>
  );
}
