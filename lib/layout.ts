/**
 * Layout Tokens & Standards for Contentstack Blocks
 * 
 * Provides a Single Source of Truth for:
 * 1. Container Widths (small, default, large, wide)
 * 2. Section Color Modes (default, alt)
 * 3. Grid Column Utilities
 */

export const containerWidths: Record<string, string> = {
  small: "w-full lg:max-w-4xl",
  default: "w-full lg:max-w-5xl",
  medium: "w-full lg:max-w-5xl",
  large: "w-full lg:max-w-7xl",
  wide: "w-full lg:max-w-[1400px] xl:max-w-[1536px]",
  container: "w-full lg:max-w-[1400px] xl:max-w-[1536px]",
  full: "w-full max-w-none lg:max-w-none",
};

export const colorModes: Record<string, string> = {
  default: "bg-transparent",
  alt: "bg-background-200 dark:bg-background-900 border-y border-border-100 dark:border-border-200 py-20 sm:py-36",
};

export const colSpans: Record<string, string> = {
  "1": "col-span-12 lg:col-span-1",
  "2": "col-span-12 lg:col-span-2",
  "3": "col-span-12 lg:col-span-3",
  "4": "col-span-12 lg:col-span-4",
  "5": "col-span-12 lg:col-span-5",
  "6": "col-span-12 lg:col-span-6",
  "7": "col-span-12 lg:col-span-7",
  "8": "col-span-12 lg:col-span-8",
  "9": "col-span-12 lg:col-span-9",
  "10": "col-span-12 lg:col-span-10",
  "11": "col-span-12 lg:col-span-11",
  "12": "col-span-12",
};

/**
 * Resolves a column span number/string to Tailwind grid classes.
 */
export function getColSpanClass(span?: number | string, fallback = "col-span-12"): string {
  if (!span) return fallback;
  return colSpans[String(span).trim()] ?? fallback;
}

/**
 * Resolves a Contentstack width string to standard Tailwind max-w classes.
 */
export function getContainerClass(width?: string, defaultWidth = "large"): string {
  const key = String(width || defaultWidth).trim().toLowerCase();
  return (
    containerWidths[key] ??
    containerWidths[defaultWidth.trim().toLowerCase()] ??
    containerWidths.large
  );
}

/**
 * Resolves a Contentstack color mode string ("Default" | "Alt") to background & border classes.
 */
export function getColorModeClass(mode?: string): string {
  const key = String(mode || "default").trim().toLowerCase();
  return colorModes[key] ?? colorModes.default;
}
