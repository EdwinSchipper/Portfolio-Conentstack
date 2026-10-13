import React from "react";
import Label, { LabelProps } from "@/components/ui/Label";

export type ServiceCardTagProps = LabelProps;

export default function ServiceCardTag({
  children,
  className = "",
  cslp,
  ...props
}: ServiceCardTagProps) {
  return (
    <Label variant="pill" className={className} cslp={cslp} {...props}>
      {children}
    </Label>
  );
}

