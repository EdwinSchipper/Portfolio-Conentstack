import React from "react";

export interface NumberedIntroProps {
  children: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function NumberedIntro({
  children,
  className = "",
  cslp,
}: NumberedIntroProps) {
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
