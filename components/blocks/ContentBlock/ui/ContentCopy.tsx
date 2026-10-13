import React from "react";
import DOMPurify from "isomorphic-dompurify";

export interface ContentCopyProps {
  content?: string;
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function ContentCopy({
  content,
  children,
  className = "",
  cslp,
}: ContentCopyProps) {
  const rawHtml = content || (typeof children === "string" ? children : "");

  if (rawHtml) {
    return (
      <div
        {...cslp}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(rawHtml),
        }}
        className={`prose prose-lg max-w-none text-gray-700 leading-relaxed ${className}`}
      />
    );
  }

  if (children) {
    return (
      <div
        {...cslp}
        className={`prose prose-lg max-w-none text-gray-700 leading-relaxed ${className}`}
      >
        {children}
      </div>
    );
  }

  return null;
}
