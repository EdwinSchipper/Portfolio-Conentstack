import React from "react";
import { GridSectionBlock, CSLPAttribute } from "@/lib/types";
import GridColumn from "./GridColumn";
import GridCards from "./GridCards";
import {
  GridLabel,
  GridTitle,
  GridRichText,
  GridImage,
  GridQuote,
  GridButton,
  GridCard,
} from "./ui";

const containerWidths: Record<string, string> = {
  small: "max-w-4xl",
  default: "max-w-4xl xl:max-w-5xl",
  large: "max-w-7xl",
  wide: "container",
};

const colorModes: Record<string, string> = {
  default: "bg-transparent",
  alt: "bg-background-200 dark:bg-background-900",
};

export interface GridSectionProps {
  children?: React.ReactNode;
  data?: GridSectionBlock;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  className?: string;
}

export default function GridSection({
  children,
  data,
  previewAttr,
  width,
  colorMode,
  className = "",
}: GridSectionProps) {
  const rawWidth = (width || data?.container_width || "default").toLowerCase();
  const containerClass = containerWidths[rawWidth] ?? containerWidths.default;

  const colorModeKey = (colorMode || data?.color_mode || "default").toLowerCase();
  const colorModeClass = colorModes[colorModeKey] ?? colorModes.default;

  if (data && !children) {
    const leftCol = data.left_col_span ?? "5";
    const rightCol = data.right_col_span ?? "7";
    const contentLeft = data.content_left;
    const contentRight = data.content_right;

    return (
      <section
        {...previewAttr}
        data-color-mode={colorModeKey}
        className={`col-span-full w-full mb-20 md:mb-40 lg:mb-40 ${colorModeClass} ${className}`}
      >
        <div
          className={`sm:grid grid-cols-1 md:grid-cols-12 mx-auto z-20 ${containerClass} px-10 sm:px-14 lg:px-12 md:px-20 gap-14 lg:gap-x-10 xl:gap-x-24`}
        >
          {contentLeft && (
            <GridColumn span={leftCol} data={contentLeft} />
          )}
          {contentRight && (
            <GridColumn span={rightCol} data={contentRight} />
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      {...previewAttr}
      data-color-mode={colorModeKey}
      className={`col-span-full w-full mb-20 md:mb-40 lg:mb-40 ${colorModeClass} ${className}`}
    >
      <div
        className={`sm:grid grid-cols-1 md:grid-cols-12 mx-auto z-20 ${containerClass} px-10 sm:px-14 lg:px-12 md:px-20 gap-14 lg:gap-x-10 xl:gap-x-24`}
      >
        {children}
      </div>
    </section>
  );
}

// Attach subcomponents to GridSection namespace
GridSection.Column = GridColumn;
GridSection.Cards = GridCards;
GridSection.Label = GridLabel;
GridSection.Title = GridTitle;
GridSection.RichText = GridRichText;
GridSection.Image = GridImage;
GridSection.Quote = GridQuote;
GridSection.Button = GridButton;
GridSection.Card = GridCard;

// Standalone Named Exports
export {
  GridColumn,
  GridCards,
  GridLabel,
  GridTitle,
  GridRichText,
  GridImage,
  GridQuote,
  GridButton,
  GridCard,
};
