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
      className={`text-base sm:text-lg text-gray-600 leading-relaxed whitespace-pre-line ${className}`}
    >
      {children}
    </p>
  );
}
