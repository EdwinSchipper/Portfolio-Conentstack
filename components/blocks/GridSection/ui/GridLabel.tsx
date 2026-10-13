import React from "react";
import Label, { LabelProps } from "@/components/ui/Label";

export type GridLabelProps = LabelProps;

export default function GridLabel({
  children,
  className = "",
  cslp,
  ...props
}: GridLabelProps) {
  return (
    <Label className={className} cslp={cslp} {...props}>
      {children}
    </Label>
  );
}

