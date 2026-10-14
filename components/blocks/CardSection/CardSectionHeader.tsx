import React from "react";
import CardLabel from "./ui/CardLabel";
import CardTitle from "./ui/CardTitle";
import CardIntro from "./ui/CardIntro";

export interface CardSectionHeaderProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  containerClass?: string;
  className?: string;
  cslp?: Record<string, any>;
  cslpLabel?: Record<string, any>;
  cslpTitle?: Record<string, any>;
  cslpIntro?: Record<string, any>;
}

export default function CardSectionHeader({
  children,
  label,
  title,
  intro,
  containerClass = "lg:max-w-7xl",
  className = "",
  cslp,
  cslpLabel,
  cslpTitle,
  cslpIntro,
}: CardSectionHeaderProps) {
  return (
    <header
      {...cslp}
      className={`w-full flex flex-col gap-14 md:gap-8 px-10 md:px-20 xl:px-14 border-t border-border-100 dark:border-border-200 py-14 md:py-24 relative ${className}`}
    >
      {/* Split background decoratie op desktop (xl) */}
      <div className="hidden xl:block absolute right-0 top-0 bottom-0 w-1/2 bg-border-100/70 dark:bg-border-200/70 pointer-events-none" />
      <div className="hidden xl:block absolute left-1/2 top-0 bottom-0 w-px bg-border-100 dark:border-border-200 -translate-x-1/2 pointer-events-none" />

      {/* Content grid - breedte gekoppeld aan Contentstack containerClass */}
      <div
        className={`mx-auto w-full sm:max-w-xl md:max-w-3xl ${containerClass} grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10 relative z-10`}
      >
        {/* Linker kolom: Label & Titel */}
        <div className="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-6 flex flex-col">
          {label && <CardLabel cslp={cslpLabel}>{label}</CardLabel>}
          {title && <CardTitle cslp={cslpTitle}>{title}</CardTitle>}
        </div>

        {/* Rechter kolom: Intro / beschrijving (indien aanwezig) */}
        {(intro || children) && (
          <div className="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {intro && <CardIntro cslp={cslpIntro}>{intro}</CardIntro>}
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
