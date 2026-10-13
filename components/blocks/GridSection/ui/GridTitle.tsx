import React from "react";

export interface GridTitleProps {
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  cslp?: Record<string, any>;
}

export default function GridTitle({
  children,
  as: Component = "h1",
  className = "",
  cslp,
}: GridTitleProps) {
  if (!children) return null;

  return (
    <Component
      {...cslp}
      className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 ${className}`}
    >
      {children}
    </Component>
  );
}
