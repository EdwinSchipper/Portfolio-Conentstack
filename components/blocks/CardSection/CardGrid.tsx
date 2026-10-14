import React from "react";

export interface CardGridProps {
  children: React.ReactNode;
  columns?: number | string;
  containerClass?: string;
  className?: string;
  cslp?: Record<string, any>;
}

/**
 * CardGrid: Full-width container with desktop crosshair hairline borders
 * and dynamic inner width driven by Contentstack containerClass.
 */
export default function CardGrid({
  children,
  containerClass = "lg:max-w-7xl",
  className = "",
  cslp,
}: CardGridProps) {
  return (
    <div
      {...cslp}
      className={`w-full flex flex-col px-10 md:px-20 xl:px-14 border-y border-border-100 dark:border-border-200 relative ${className}`}
    >
      {/* Desktop kruisdraad / divider-lijnen op lg schermen */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border-100 dark:border-border-200 -translate-x-1/2 pointer-events-none" />
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border-100 dark:border-border-200 -translate-y-1/2 pointer-events-none" />

      {/* Grid container met verticale zijranden - breedte gekoppeld aan Contentstack containerClass */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr mx-auto w-full sm:max-w-xl md:max-w-3xl ${containerClass} items-start lg:items-stretch gap-0 relative z-10 border-x border-border-100 dark:border-border-200 divide-y lg:divide-y-0 divide-border-100 dark:divide-border-200`}
      >
        {children}
      </div>
    </div>
  );
}
