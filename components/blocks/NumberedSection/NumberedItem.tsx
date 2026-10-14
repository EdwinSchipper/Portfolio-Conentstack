import React from "react";
import NumberBadge from "./ui/NumberBadge";
import Button from "@/components/ui/Button";

export interface NumberedItemProps {
  number?: number | string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  text?: React.ReactNode;
  button?: { href: string; title?: string };
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function NumberedItem({
  number,
  title,
  description,
  text,
  button,
  children,
  className = "",
  cslp,
}: NumberedItemProps) {
  const displayText = description ?? text;

  return (
    <div {...cslp} className={`flex gap-x-6 page-items-content ${className}`}>
      {/* Number Badge (los UI element) */}
      {number !== undefined && number !== null && (
        <NumberBadge number={number} cslp={cslp?.number} />
      )}

      {/* Item Content */}
      <div className="flex flex-col">
        {title && (
          <h3
            {...(cslp && cslp.title)}
            className="text-baseM sm:text-base text-title-100 dark:text-title-200 font-semibold"
          >
            {title}
          </h3>
        )}

        {displayText && (
          <p
            {...(cslp && (cslp.text || cslp.description))}
            className="text-baseM sm:text-medium text-content-100 dark:text-content-200"
          >
            {displayText}
          </p>
        )}

        {button?.href && (
          <div className="pt-2">
            <Button
              href={button.href}
              variant="link"
              arrow
              cslp={cslp && cslp.button}
            >
              {button.title || "Lees meer"}
            </Button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
