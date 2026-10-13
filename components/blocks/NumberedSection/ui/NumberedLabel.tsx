import React from "react";

export interface NumberedLabelProps {
  children: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

/**
 * Render label with support for patterns like "02 — IMPACT" or "01 - VISIE":
 * Highlights the leading number in coral brand color (#f05a46), followed by a dash and the label.
 */
function renderLabelContent(rawLabel: React.ReactNode) {
  if (typeof rawLabel === "string") {
    const match = rawLabel.match(/^(\d+)\s*[-—]\s*(.+)$/);
    if (match) {
      return (
        <span className="text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
          <span className="text-[#f05a46] font-mono">{match[1]}</span>
          <span className="text-gray-400">—</span>
          <span className="text-gray-700">{match[2]}</span>
        </span>
      );
    }
  }
  return (
    <span className="text-xs font-bold tracking-widest text-[#f05a46] uppercase mb-4 block">
      {rawLabel}
    </span>
  );
}

export default function NumberedLabel({
  children,
  className = "",
  cslp,
}: NumberedLabelProps) {
  if (!children) return null;

  return (
    <div {...cslp} className={className}>
      {renderLabelContent(children)}
    </div>
  );
}
