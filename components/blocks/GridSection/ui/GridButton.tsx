import React from "react";
import Button from "@/components/ui/Button";

export interface GridButtonProps {
  href?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function GridButton({
  href,
  title,
  children,
  className = "",
  cslp,
}: GridButtonProps) {
  if (!href) return null;
  const label = title || children;
  if (!label) return null;

  return (
    <div className="pt-2">
      <Button
        href={href}
        variant="primary"
        className={className}
        cslp={cslp}
      >
        {label}
      </Button>
    </div>
  );
}

