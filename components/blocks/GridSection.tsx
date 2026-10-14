import React from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import {
  GridSectionBlock,
  GridContentLeft,
  GridContentRight,
  GridCard as GridCardType,
  CSLPAttribute,
} from "@/lib/types";
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

export interface GridQuoteProps {
  quote?: string;
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export function GridQuote({
  quote,
  children,
  className = "",
  cslp,
}: GridQuoteProps) {
  const content = quote || children;
  if (!content) return null;

  const isHtml = typeof content === "string" && /<[a-z][\s\S]*>/i.test(content);

  return (
    <blockquote
      {...cslp}
      className={`font-quote my-14 border-l-2 border-accent7-200 dark:border-accent8-200 pl-10 ${className}`}
    >
      {isHtml ? (
        <div
          className="quote-text text-pretty text-content-100 dark:text-content-200 italic text-title_3M md:text-title_3 [&>p]:m-0"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content as string),
          }}
        />
      ) : (
        <p className="quote-text text-pretty text-content-100 dark:text-content-200 italic text-title_3M md:text-title_3">
          {content}
        </p>
      )}
    </blockquote>
  );
}

export interface GridCardProps {
  card?: GridCardType;
  image?: { url?: string; title?: string; $?: any };
  tag?: string;
  title?: string;
  text?: string;
  description?: string;
  className?: string;
  cslp?: Record<string, any>;
}

export function GridCard({
  card,
  image,
  tag,
  title,
  text,
  description,
  className = "",
  cslp,
}: GridCardProps) {
  const cardImage = image || card?.image;
  const cardTag = tag || card?.tag || title || card?.title;
  const cardText = text || card?.text || description || card?.description;
  const cardMeta = cslp || card?.$;

  return (
    <div className={`font-content flex flex-col h-full ${className}`}>
      {cardImage?.url && (
        <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden border border-border-100 dark:border-border-200 bg-background-200 dark:bg-background-900">
          <Image
            src={cardImage.url}
            alt={cardImage.title || cardTag || "Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            {...(cardImage?.$ && cardImage?.$.url)}
          />
        </div>
      )}

      {cardTag && (
        <div className="flex flex-wrap items-center gap-1.5 md:gap-1.5 mt-10 lg:mt-10">
          <Label
            variant="pill"
            cslp={cardMeta && (cardMeta.tag || cardMeta.title)}
          >
            {cardTag}
          </Label>
        </div>
      )}

      {cardText && (
        <p
          {...(cardMeta && (cardMeta.text || cardMeta.description))}
          className="mt-4 lg:mt-4 text-mediumM lg:text-medium font-normal text-content-100 dark:text-content-200"
        >
          {cardText}
        </p>
      )}
    </div>
  );
}

export interface GridCardsProps {
  cards?: GridCardType[];
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export function GridCards({
  cards,
  children,
  className = "",
  cslp,
}: GridCardsProps) {
  return (
    <div
      {...cslp}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-8 ${className}`}
    >
      {cards && cards.length > 0
        ? cards.map((card, idx) => (
            <GridCard
              key={card._metadata?.uid || `card-${idx}`}
              card={card}
            />
          ))
        : children}
    </div>
  );
}

export interface GridColumnProps {
  span?: number | string;
  data?: GridContentLeft | GridContentRight;
  children?: React.ReactNode;
  className?: string;
}

export function GridColumn({
  span = 6,
  data,
  children,
  className = "",
}: GridColumnProps) {
  const colClass = colSpans[String(span)] ?? colSpans["6"];

  if (data && !children) {
    const label =
      (data as GridContentLeft).label_left ||
      (data as GridContentRight).label_right;
    const title =
      (data as GridContentLeft).title_h1 ||
      (data as GridContentRight).title_h1r;
    const text =
      (data as GridContentLeft).text_left ||
      (data as GridContentRight).text_right;
    const extendedText = (data as GridContentRight).text_right_extended;
    const quote =
      (data as GridContentLeft).quote_left ||
      (data as GridContentRight).quote_right;
    const image =
      (data as GridContentLeft).image_left ||
      (data as GridContentRight).image_right;
    const button =
      (data as GridContentLeft).button_left ||
      (data as GridContentRight).button_right;
    const cards = data.cards;

    const cslp = data.$;

    return (
      <div className={`${colClass} ${className}`}>
        <div className="sm:space-y-8">
          {label && (
            <Label cslp={cslp && (cslp.label_left || cslp.label_right)}>
              {label}
            </Label>
          )}

          {title && (
            <h2
              {...(cslp && (cslp.title_h1 || cslp.title_h1r))}
              className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 max-w-2xl text-balance w-11/12 md:w-full"
            >
              {title}
            </h2>
          )}

          {text && (
            <div
              {...(cslp && (cslp.text_left || cslp.text_right))}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(text),
              }}
              className="text-baseM sm:text-base w-full text-content-100 dark:text-content-200 text-pretty font-normal font-content"
            />
          )}

          {image?.url && (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-background-200 dark:bg-background-900 border-dashed border-border-100 dark:border-border-200">
              <Image
                src={image.url}
                alt={image.title || title || "Image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                {...(image?.$ && image?.$.url)}
              />
            </div>
          )}

          {quote && (
            <GridQuote
              quote={quote}
              cslp={cslp && (cslp.quote_left || cslp.quote_right)}
            />
          )}

          {extendedText && (
            <div
              {...(cslp && cslp.text_right_extended)}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(extendedText),
              }}
              className="text-baseM sm:text-base w-full text-content-100 dark:text-content-200 text-pretty font-normal font-content"
            />
          )}

          {button?.href && button?.title && (
            <div className="pt-2">
              <Button
                href={button.href}
                variant="primary"
                cslp={cslp && (cslp.button_left || cslp.button_right)}
              >
                {button.title}
              </Button>
            </div>
          )}

          {cards && cards.length > 0 && (
            <GridCards cards={cards} cslp={cslp && cslp.cards} />
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

export interface GridSectionProps {
  children?: React.ReactNode;
  data?: GridSectionBlock;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  className?: string;
}

/**
 * GridSection: Consolidated 2-column modular grid section.
 */
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
          {contentLeft && <GridColumn span={leftCol} data={contentLeft} />}
          {contentRight && <GridColumn span={rightCol} data={contentRight} />}
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

GridSection.Column = GridColumn;
GridSection.Cards = GridCards;
GridSection.Card = GridCard;
GridSection.Quote = GridQuote;