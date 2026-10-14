import React from "react";

export interface CardIntroProps {
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function CardIntro({
  children,
  className = "",
  cslp,
}: CardIntroProps) {
  if (!children) return null;

  return (
    <p
      {...cslp}
      className={`text-baseM sm:text-base text-content-100 dark:text-content-200 leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}
