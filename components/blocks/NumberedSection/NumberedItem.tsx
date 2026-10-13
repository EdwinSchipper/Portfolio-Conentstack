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
    <div {...cslp} className={`flex items-start gap-4 sm:gap-5 ${className}`}>
      {/* Number Badge (los UI element) */}
      {number !== undefined && number !== null && (
        <NumberBadge number={number} cslp={cslp?.number} />
      )}

      {/* Item Content */}
      <div className="space-y-1.5 sm:space-y-2 grow">
        {title && (
          <h3
            {...(cslp && cslp.title)}
            className="text-base sm:text-lg md:text-xl font-bold text-gray-900 tracking-tight"
          >
            {title}
          </h3>
        )}

        {displayText && (
          <p
            {...(cslp && (cslp.text || cslp.description))}
            className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line"
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
