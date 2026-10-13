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
      className={`prose prose-lg max-w-none text-gray-700 leading-relaxed ${className}`}
    />
  );
}
