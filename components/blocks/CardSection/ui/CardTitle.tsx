import React from "react";

export interface CardTitleProps {
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function CardTitle({
  children,
  className = "",
  cslp,
}: CardTitleProps) {
  if (!children) return null;

  return (
    <h2
      {...cslp}
      className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3 ${className}`}
    >
      {children}
    </h2>
  );
}
