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
      className={`text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 max-w-2xl text-balance ${className}`}
    >
      {children}
    </h2>
  );
}
