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
