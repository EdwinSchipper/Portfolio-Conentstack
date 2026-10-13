import React from "react";
import Label, { LabelProps } from "@/components/ui/Label";

export type CardLabelProps = LabelProps;

export default function CardLabel({
  children,
  className = "",
  cslp,
  ...props
}: CardLabelProps) {
  return (
    <Label className={className} cslp={cslp} {...props}>
      {children}
    </Label>
  );
}

