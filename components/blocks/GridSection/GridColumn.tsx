import React from "react";
import { GridContentLeft, GridContentRight } from "@/lib/types";
import {
  GridLabel,
  GridTitle,
  GridRichText,
  GridImage,
  GridQuote,
  GridButton,
} from "./ui";
import GridCards from "./GridCards";

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

export interface GridColumnProps {
  span?: number | string;
  data?: GridContentLeft | GridContentRight;
  children?: React.ReactNode;
  className?: string;
}

export default function GridColumn({
  span = 6,
  data,
  children,
  className = "",
}: GridColumnProps) {
  const colClass = colSpans[String(span)] ?? colSpans["6"];

  if (data && !children) {
    // Normaliseer velden tussen content_left en content_right
    const label = (data as GridContentLeft).label_left || (data as GridContentRight).label_right;
    const title = (data as GridContentLeft).title_h1 || (data as GridContentRight).title_h1r;
    const text = (data as GridContentLeft).text_left || (data as GridContentRight).text_right;
    const extendedText = (data as GridContentRight).text_right_extended;
    const quote = (data as GridContentLeft).quote_left || (data as GridContentRight).quote_right;
    const image = (data as GridContentLeft).image_left || (data as GridContentRight).image_right;
    const button = (data as GridContentLeft).button_left || (data as GridContentRight).button_right;
    const cards = data.cards;

    const cslp = data.$;

    return (
      <div className={`${colClass} ${className}`}>
        <div className="sm:space-y-8">
          {label && (
            <GridLabel cslp={cslp && (cslp.label_left || cslp.label_right)}>
              {label}
            </GridLabel>
          )}

          {title && (
            <GridTitle cslp={cslp && (cslp.title_h1 || cslp.title_h1r)}>
              {title}
            </GridTitle>
          )}

          {text && (
            <GridRichText
              content={text}
              cslp={cslp && (cslp.text_left || cslp.text_right)}
            />
          )}

          {image?.url && (
            <GridImage
              src={image.url}
              alt={image.title || title || "Image"}
              cslp={image?.$ && image?.$.url}
            />
          )}

          {quote && (
            <GridQuote
              quote={quote}
              cslp={cslp && (cslp.quote_left || cslp.quote_right)}
            />
          )}

          {extendedText && (
            <GridRichText
              content={extendedText}
              cslp={cslp && cslp.text_right_extended}
            />
          )}

          {button?.href && button?.title && (
            <GridButton
              href={button.href}
              title={button.title}
              cslp={cslp && (cslp.button_left || cslp.button_right)}
            />
          )}

          {cards && cards.length > 0 && (
            <GridCards
              cards={cards}
              cslp={cslp && cslp.cards}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${colClass} ${className}`}>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
