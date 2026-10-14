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
      className={`text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 max-w-2xl text-balance w-11/12 md:w-full ${className}`}
    >
      {children}
    </Component>
  );
}
