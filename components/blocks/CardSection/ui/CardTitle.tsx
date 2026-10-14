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
    <h3
      {...cslp}
      className={`text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 text-balance lg:pr-10 ${className}`}
    >
      {children}
    </h3>
  );
}
