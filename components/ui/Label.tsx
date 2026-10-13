import React from "react";

export type LabelVariant = "brand" | "numbered" | "pill" | "muted";

export interface LabelProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  variant?: LabelVariant;
  className?: string;
  cslp?: Record<string, any>;
  as?: "span" | "div" | "p";
}

/**
 * Parses and formats numbered label strings like "01 — VISIE" or "02 - IMPACT":
 * Highlights the leading number in coral brand color (#f05a46), followed by a dash and the label.
 */
function renderNumberedContent(text: string) {
  const match = text.match(/^(\d+)\s*[-—]\s*(.+)$/);
  if (match) {
    return (
      <span className="flex items-center gap-2">
        <span className="text-[#f05a46] font-mono">{match[1]}</span>
        <span className="text-gray-400">—</span>
        <span className="text-gray-700">{match[2]}</span>
      </span>
    );
  }
  return text;
}

const variantStyles: Record<LabelVariant, string> = {
  brand: "text-xs font-bold tracking-widest text-[#f05a46] uppercase mb-2 block",
  numbered: "text-xs font-bold tracking-widest uppercase mb-2 block",
  pill: "inline-block px-3 py-1 bg-white border border-gray-200/90 rounded-lg text-xs font-mono font-medium text-gray-800 shadow-2xs",
  muted: "text-xs font-bold tracking-widest text-gray-500 uppercase mb-2 block",
};

/**
 * Universal Label component:
 * - Brand section overline (default uppercase coral #f05a46).
 * - Automatic parsing for numbered patterns ("01 — VISIE").
 * - Pill badge variant for tags and category labels.
 * - Supports Contentstack live preview bindings (cslp).
 */
export default function Label({
  children,
  variant = "brand",
  className = "",
  cslp,
  as: Component = "span",
  ...restProps
}: LabelProps) {
  if (!children) return null;

  // Auto-detect numbered pattern when children is a string
  const isString = typeof children === "string";
  const hasNumberedPattern = isString && /^(\d+)\s*[-—]\s*(.+)$/.test(children);

  const effectiveVariant: LabelVariant =
    variant === "brand" && hasNumberedPattern ? "numbered" : variant;

  const content =
    (effectiveVariant === "numbered" || hasNumberedPattern) && isString
      ? renderNumberedContent(children)
      : children;

  const baseClass = variantStyles[effectiveVariant] || variantStyles.brand;

  return (
    <Component
      {...cslp}
      {...restProps}
      className={`${baseClass} ${className}`}
    >
      {content}
    </Component>
  );
}
