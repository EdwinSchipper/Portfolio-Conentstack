import React from "react";
import CardLabel from "./ui/CardLabel";
import CardTitle from "./ui/CardTitle";
import CardIntro from "./ui/CardIntro";

export interface CardSectionHeaderProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  title?: React.ReactNode;
  intro?: React.ReactNode;
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
  className = "",
  cslp,
  cslpLabel,
  cslpTitle,
  cslpIntro,
}: CardSectionHeaderProps) {
  return (
    <div {...cslp} className={`mb-10 md:mb-14 max-w-3xl ${className}`}>
      {label && <CardLabel cslp={cslpLabel}>{label}</CardLabel>}
      {title && <CardTitle cslp={cslpTitle}>{title}</CardTitle>}
      {intro && <CardIntro cslp={cslpIntro}>{intro}</CardIntro>}
      {children}
    </div>
  );
}
