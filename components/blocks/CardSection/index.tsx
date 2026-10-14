import React from "react";
import { CardSectionBlock, CSLPAttribute } from "@/lib/types";
import CardSectionHeader from "./CardSectionHeader";
import CardGrid from "./CardGrid";
import CardItem from "./CardItem";
import {
  CardLabel,
  CardTitle,
  CardIntro,
  CardTag,
  CardBox,
  CardImageTag,
} from "./ui";

const containerWidths: Record<string, string> = {
  small: "lg:max-w-4xl",
  default: "lg:max-w-5xl",
  large: "lg:max-w-7xl",
  wide: "lg:max-w-[1400px] xl:max-w-[1536px]",
};

const colorModes: Record<string, string> = {
  default: "bg-transparent",
  alt: "bg-background-200 dark:bg-background-900",
};

export interface CardSectionProps {
  children?: React.ReactNode;
  data?: CardSectionBlock;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  className?: string;
}

export default function CardSection({
  children,
  data,
  previewAttr,
  width,
  colorMode,
  className = "",
}: CardSectionProps) {
  const rawWidth = (width || data?.width || data?.container_width || "large").toLowerCase();
  const containerClass = containerWidths[rawWidth] ?? containerWidths.large;

  const colorModeKey = (colorMode || data?.color_mode || "default").toLowerCase();
  const colorModeClass = colorModes[colorModeKey] ?? colorModes.default;

  // Render CMS data if passed directly (e.g. from BlockRenderer)
  if (data && !children) {
    const rawLabel = data?.label_cards || data?.label;
    const sectionTitle = data?.section_title;
    const sectionIntro = data?.section_intro;
    const cards = data?.cards || [];
    const colVal = String(data?.columns || "").match(/[234]/)?.[0] || "3";

    const hasHeader = Boolean(rawLabel || sectionTitle || sectionIntro);

    return (
      <section
        {...previewAttr}
        data-color-mode={colorModeKey}
        data-container-width={rawWidth}
        className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass} ${className}`}
      >
        {hasHeader && (
          <CardSectionHeader
            label={rawLabel}
            title={sectionTitle}
            intro={sectionIntro}
            containerClass={containerClass}
            cslpLabel={data?.$ && (data?.$.label_cards || data?.$.label)}
            cslpTitle={data?.$ && data?.$.section_title}
            cslpIntro={data?.$ && data?.$.section_intro}
          />
        )}

        {cards.length > 0 && (
          <CardGrid
            columns={colVal}
            containerClass={containerClass}
            cslp={data?.$ && data?.$.cards}
          >
            {cards.map((card, idx) => (
              <CardItem
                key={card._metadata?.uid || `card-${idx}`}
                card={card}
              />
            ))}
          </CardGrid>
        )}
      </section>
    );
  }

  // Declarative Compound Component rendering
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
CardSection.Header = CardSectionHeader;
CardSection.Grid = CardGrid;
CardSection.Item = CardItem;
CardSection.Box = CardBox;
CardSection.ImageTag = CardImageTag;
CardSection.Label = CardLabel;
CardSection.Title = CardTitle;
CardSection.Intro = CardIntro;
CardSection.Tag = CardTag;

// Standalone Named Exports
export {
  CardSectionHeader,
  CardGrid,
  CardItem,
  CardBox,
  CardImageTag,
  CardLabel,
  CardTitle,
  CardIntro,
  CardTag,
};
