import React from "react";
import DOMPurify from "isomorphic-dompurify";

export interface GridQuoteProps {
  quote?: string;
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function GridQuote({
  quote,
  children,
  className = "",
  cslp,
}: GridQuoteProps) {
  const content = quote || children;
  if (!content) return null;

  if (typeof content === "string") {
    return (
      <blockquote
        {...cslp}
        className={`border-l-2 border-[#f05a46] pl-4 py-1 italic text-lg sm:text-xl font-serif text-gray-800 leading-relaxed ${className}`}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      />
    );
  }

  return (
    <blockquote
      {...cslp}
      className={`border-l-2 border-[#f05a46] pl-4 py-1 italic text-lg sm:text-xl font-serif text-gray-800 leading-relaxed ${className}`}
    >
      {content}
    </blockquote>
  );
}
