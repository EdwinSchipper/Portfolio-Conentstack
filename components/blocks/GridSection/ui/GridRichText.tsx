import React from "react";
import DOMPurify from "isomorphic-dompurify";

export interface GridRichTextProps {
  content?: string;
  className?: string;
  cslp?: Record<string, any>;
}

export default function GridRichText({
  content,
  className = "",
  cslp,
}: GridRichTextProps) {
  if (!content) return null;

  return (
    <div
      {...cslp}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
      className={`text-baseM sm:text-base w-full text-content-100 dark:text-content-200 text-pretty font-normal font-content ${className}`}
    />
  );
}
