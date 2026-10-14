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

  const isHtml = typeof content === "string" && /<[a-z][\s\S]*>/i.test(content);

  return (
    <blockquote
      {...cslp}
      className={`font-quote my-14 border-l-2 border-accent7-200 dark:border-accent8-200 pl-10 ${className}`}
    >
      {isHtml ? (
        <div
          className="quote-text text-pretty text-content-100 dark:text-content-200 italic text-title_3M md:text-title_3 [&>p]:m-0"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content as string),
          }}
        />
      ) : (
        <p className="quote-text text-pretty text-content-100 dark:text-content-200 italic text-title_3M md:text-title_3">
          {content}
        </p>
      )}
    </blockquote>
  );
}
