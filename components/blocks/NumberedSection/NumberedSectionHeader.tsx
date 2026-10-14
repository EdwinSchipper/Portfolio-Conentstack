import React from "react";
import NumberedLabel from "./ui/NumberedLabel";
import NumberedTitle from "./ui/NumberedTitle";
import NumberedIntro from "./ui/NumberedIntro";

export interface NumberedSectionHeaderProps {
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

export default function NumberedSectionHeader({
  children,
  label,
  title,
  intro,
  className = "",
  cslp,
  cslpLabel,
  cslpTitle,
  cslpIntro,
}: NumberedSectionHeaderProps) {
  return (
    <div {...cslp} className={`${className}`}>
      {label && <NumberedLabel cslp={cslpLabel}>{label}</NumberedLabel>}
      {title && <NumberedTitle cslp={cslpTitle}>{title}</NumberedTitle>}
      {intro && <NumberedIntro cslp={cslpIntro}>{intro}</NumberedIntro>}
      {children}
    </div>
  );
}
