import React from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"     // Dark pill: #1b1f24 met hover naar black
  | "brand"       // Coral brand: #f05a46
  | "secondary"   // Wit met grijze rand en subtiele hover
  | "link"        // Oranje inline tekstlink met optionele pijl
  | "link-dark";  // Zwarte inline tekstlink die oranje kleurt op hover

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1b1f24] hover:bg-black text-white font-semibold rounded-xl shadow-sm transition duration-200",
  brand:
    "bg-[#f05a46] hover:bg-[#d94835] text-white font-semibold rounded-xl shadow-sm transition duration-200",
  secondary:
    "border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl shadow-2xs transition duration-200",
  link:
    "p-0 bg-transparent text-[#f05a46] font-semibold hover:underline shadow-none",
  "link-dark":
    "p-0 bg-transparent text-gray-900 hover:text-[#f05a46] font-semibold shadow-none transition-colors",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Universal Button component:
 * - Renders a Next.js <Link> when `href` is provided.
 * - Renders a native HTML <button> when `href` is omitted.
 * - Supports consistent brand variants, sizes, arrow animations, and Contentstack live preview (cslp).
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className = "",
  cslp,
  target,
  rel,
  ...buttonProps
}: ButtonProps) {
  const isLinkVariant = variant === "link" || variant === "link-dark";
  const sizeClass = isLinkVariant
    ? size === "sm"
      ? "text-xs"
      : "text-xs sm:text-sm"
    : sizeStyles[size];
  const variantClass = variantStyles[variant];

  const baseClasses = `group inline-flex items-center gap-1.5 cursor-pointer ${sizeClass} ${variantClass} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        target={target}
        rel={rel}
        {...cslp}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      {...buttonProps}
      {...cslp}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
