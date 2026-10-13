import React from "react";
import Label, { LabelProps } from "@/components/ui/Label";

export type CardTagProps = LabelProps;

export default function CardTag({
  children,
  className = "",
  cslp,
  ...props
}: CardTagProps) {
  return (
    <Label variant="pill" className={className} cslp={cslp} {...props}>
      {children}
    </Label>
  );
}

