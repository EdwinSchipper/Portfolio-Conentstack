import React from "react";
import Button from "@/components/ui/Button";

export interface CardBoxProps {
  title?: React.ReactNode;
  text?: React.ReactNode;
  button?: { href: string; title?: string };
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function CardBox({
  title,
  text,
  button,
  children,
  className = "",
  cslp,
}: CardBoxProps) {
  return (
    <div
      {...cslp}
      className={`flex flex-col h-full p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition duration-200 ${className}`}
    >
      {title && (
        <h3
          {...(cslp && (cslp.tag || cslp.title))}
          className="text-xl font-bold text-gray-900 mb-2"
        >
          {title}
        </h3>
      )}

      {text && (
        <p
          {...(cslp && (cslp.text || cslp.description))}
          className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line grow"
        >
          {text}
        </p>
      )}

      {button?.href && (
        <div className="pt-4 mt-auto">
          <Button
            href={button.href}
            variant="link-dark"
            arrow
            cslp={cslp && cslp.button}
          >
            {button.title || "Lees meer"}
          </Button>
        </div>
      )}

      {children}
    </div>
  );
}

