import React from "react";
import { NumberedSectionBlock, CSLPAttribute } from "@/lib/types";
import NumberedSectionHeader from "./NumberedSectionHeader";
import NumberedSectionGrid from "./NumberedSectionGrid";
import NumberedItem from "./NumberedItem";
import {
  NumberBadge,
  NumberedLabel,
  NumberedTitle,
  NumberedIntro,
} from "./ui";

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

export interface NumberedSectionProps {
  children?: React.ReactNode;
  data?: NumberedSectionBlock;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  className?: string;
}

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

  // Auto-wiring when Contentstack CMS data is provided (e.g. via BlockRenderer)
  if (data && !children) {
    const rawLabel = data?.label || data?.section_label || data?.label_numbered;
    const sectionTitle = data?.section_title || data?.title;
    const sectionIntro = data?.section_intro;
    const items = data?.items || data?.numbered_items || [];
    const colVal = String(data?.columns || "").match(/[123]/)?.[0] || "2";

    const hasHeader = Boolean(rawLabel || sectionTitle || sectionIntro);

    return (
      <section
        {...previewAttr}
        data-color-mode={colorModeKey}
        className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass} ${className}`}
      >
        <div className={`mx-auto px-6 sm:px-10 lg:px-12 ${containerClass}`}>

          {hasHeader && (
            <div className="flex flex-col mb-12 lg:mb-20">
              <NumberedSectionHeader
                label={rawLabel}
                title={sectionTitle}
                intro={sectionIntro}
                cslpLabel={
                  data?.$ &&
                  (data?.$.label ||
                    data?.$.section_label ||
                    data?.$.label_numbered)
                }
                cslpTitle={data?.$ && (data?.$.section_title || data?.$.title)}
                cslpIntro={data?.$ && data?.$.section_intro}
              />
            </div>
          )}


          {items.length > 0 && (
            <NumberedSectionGrid
              columns={colVal}
              cslp={data?.$ && (data?.$.items || data?.$.numbered_items)}
            >
              {items.map((item, idx) => (
                <NumberedItem
                  key={item._metadata?.uid || `numbered-item-${idx}`}
                  number={item.number || idx + 1}
                  title={item.title}
                  description={item.text || item.description}
                  button={item.button}
                  cslp={item?.$}
                />
              ))}
            </NumberedSectionGrid>
          )}
        </div>
      </section>
    );
  }

  // Declarative Compound Rendering
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

// Namespaced Compound Components
NumberedSection.Header = NumberedSectionHeader;
NumberedSection.Label = NumberedLabel;
NumberedSection.Title = NumberedTitle;
NumberedSection.Intro = NumberedIntro;
NumberedSection.Grid = NumberedSectionGrid;
NumberedSection.Item = NumberedItem;
NumberedSection.Badge = NumberBadge;

// Named Exports for standalone usage
export {
  NumberedSectionHeader,
  NumberedSectionGrid,
  NumberedItem,
  NumberBadge,
  NumberedLabel,
  NumberedTitle,
  NumberedIntro,
};
