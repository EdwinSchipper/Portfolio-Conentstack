import React from "react";
import Label, { LabelProps } from "@/components/ui/Label";

export type NumberedLabelProps = LabelProps;

export default function NumberedLabel({
  children,
  className = "mb-4",
  cslp,
  ...props
}: NumberedLabelProps) {
  return (
    <Label className={className} cslp={cslp} {...props}>
      {children}
    </Label>
  );
}

