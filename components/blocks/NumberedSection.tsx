import React from "react";
import { NumberedSectionBlock, CSLPAttribute } from "@/lib/types";
import { Button, Label } from "@/components/ui";

const containerWidths: Record<string, string> = {
  small: "max-w-4xl",
  default: "max-w-4xl xl:max-w-5xl",
  large: "max-w-7xl",
  wide: "container",
};

const colorModes: Record<string, string> = {
  default: "bg-transparent",
  alt: "bg-background-200 dark:bg-background-900 border-y border-border-100 dark:border-border-200",
};

export interface NumberBadgeProps {
  number: number | string;
  className?: string;
  cslp?: Record<string, any>;
}

/**
 * Padded, compact monospace number badge.
 */
export function NumberBadge({
  number,
  className = "",
  cslp,
}: NumberBadgeProps) {
  const numStr =
    number !== undefined && number !== null
      ? String(number).padStart(2, "0")
      : "";

  if (!numStr) return null;

  return (
    <div
      {...cslp}
      className={`self-start shrink-0 inline-flex items-center justify-center rounded-lg bg-border-100 dark:bg-border-200 py-2 px-3 sm:py-2.5 sm:px-3.5 select-none ${className}`}
    >
      <span className="text-title-100 dark:text-title-200 font-playfull text-smallM sm:text-medium font-bold">
        {numStr}
      </span>
    </div>
  );
}

export interface NumberedSectionProps {
  children?: React.ReactNode;
  data?: NumberedSectionBlock;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  className?: string;
}

/**
 * NumberedSection: Self-contained section with header, 2-column grid, and numbered items.
 */
export default function NumberedSection({
  children,
  data,
  previewAttr,
  width,
  colorMode,
  className = "",
}: NumberedSectionProps) {
  const rawWidth = (width || data?.width || data?.container_width || "large").toLowerCase();
  const containerClass = containerWidths[rawWidth] ?? containerWidths.large;

  const colorModeKey = (colorMode || data?.color_mode || "default").toLowerCase();
  const colorModeClass = colorModes[colorModeKey] ?? colorModes.default;

  // Auto-wiring when Contentstack CMS data is provided
  if (data && !children) {
    const rawLabel = data?.label || data?.section_label || data?.label_numbered;
    const sectionTitle = data?.section_title || data?.title;
    const sectionIntro = data?.section_intro;
    const items = data?.items || data?.numbered_items || [];
    const hasHeader = Boolean(rawLabel || sectionTitle || sectionIntro);

    return (
      <section
        {...previewAttr}
        data-color-mode={colorModeKey}
        className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass} ${className}`}
      >
        <div className={`mx-auto px-6 sm:px-10 lg:px-12 ${containerClass}`}>
          {/* Section Header */}
          {hasHeader && (
            <div className="flex flex-col mb-12 lg:mb-20">
              {rawLabel && (
                <Label
                  variant="brand"
                  className="mb-3"
                  cslp={
                    data?.$ &&
                    (data?.$.label ||
                      data?.$.section_label ||
                      data?.$.label_numbered)
                  }
                >
                  {rawLabel}
                </Label>
              )}

              {sectionTitle && (
                <h2
                  className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 max-w-2xl text-balance"
                  {...(data?.$ && (data?.$.section_title || data?.$.title))}
                >
                  {sectionTitle}
                </h2>
              )}

              {sectionIntro && (
                <p
                  className="text-baseM sm:text-base text-content-100 dark:text-content-200 font-content mt-4 max-w-3xl"
                  {...(data?.$ && data?.$.section_intro)}
                >
                  {sectionIntro}
                </p>
              )}
            </div>
          )}

          {/* Numbered Items Grid */}
          {items.length > 0 && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-5 md:gap-y-10 md:gap-x-10 font-content items-start"
              {...(data?.$ && (data?.$.items || data?.$.numbered_items))}
            >
              {items.map((item, idx) => {
                const displayText = item.description ?? item.text;
                const itemNum = item.number || idx + 1;

                return (
                  <div
                    key={item._metadata?.uid || `numbered-item-${idx}`}
                    className="flex gap-x-6 page-items-content"
                  >
                    <NumberBadge number={itemNum} cslp={item?.$?.number} />

                    <div className="flex flex-col">
                      {item.title && (
                        <h3
                          className="text-baseM sm:text-base text-title-100 dark:text-title-200 font-semibold"
                          {...(item?.$ && item?.$.title)}
                        >
                          {item.title}
                        </h3>
                      )}

                      {displayText && (
                        <p
                          className="text-baseM sm:text-medium text-content-100 dark:text-content-200 mt-1"
                          {...(item?.$ && (item?.$.text || item?.$.description))}
                        >
                          {displayText}
                        </p>
                      )}

                      {item.button?.href && (
                        <div className="pt-2">
                          <Button
                            href={item.button.href}
                            variant="link"
                            arrow
                            cslp={item?.$ && item?.$.button}
                          >
                            {item.button.title || "Lees meer"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Compound / custom children fallback
  return (
    <section
      {...previewAttr}
      data-color-mode={colorModeKey}
      className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass} ${className}`}
    >
      <div className={`mx-auto px-6 sm:px-10 lg:px-12 ${containerClass}`}>
        {children}
      </div>
    </section>
  );
}
