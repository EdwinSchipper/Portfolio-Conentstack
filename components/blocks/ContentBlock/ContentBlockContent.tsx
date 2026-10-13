import React from "react";
import ContentTitle from "./ui/ContentTitle";
import ContentCopy from "./ui/ContentCopy";

export interface ContentBlockContentProps {
  title?: React.ReactNode;
  copy?: string;
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
  cslpTitle?: Record<string, any>;
  cslpCopy?: Record<string, any>;
}

export default function ContentBlockContent({
  title,
  copy,
  children,
  className = "",
  cslp,
  cslpTitle,
  cslpCopy,
}: ContentBlockContentProps) {
  return (
    <div
      {...cslp}
      className={`w-full md:w-1/2 p-6 md:p-8 lg:p-12 space-y-4 ${className}`}
    >
      {title && <ContentTitle cslp={cslpTitle}>{title}</ContentTitle>}
      {copy && <ContentCopy content={copy} cslp={cslpCopy} />}
      {children}
    </div>
  );
}
