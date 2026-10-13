import React from "react";

export interface ServiceCardBoxProps {
  title?: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
  cslpTitle?: Record<string, any>;
  cslpText?: Record<string, any>;
}

export default function ServiceCardBox({
  title,
  text,
  children,
  className = "",
  cslp,
  cslpTitle,
  cslpText,
}: ServiceCardBoxProps) {
  return (
    <div
      {...cslp}
      className={`flex flex-col h-full p-6 md:p-8 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition duration-200 ${className}`}
    >
      {title && (
        <h3
          {...cslpTitle}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          {title}
        </h3>
      )}

      {text && (
        <p
          {...cslpText}
          className="text-gray-600 leading-relaxed whitespace-pre-line"
        >
          {text}
        </p>
      )}

      {children}
    </div>
  );
}
