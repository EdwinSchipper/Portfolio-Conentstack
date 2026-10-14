import React from "react";
import Image from "next/image";
import { CardSectionBlock, CardSectionItem, CSLPAttribute } from "@/lib/types";
import { Button, Label } from "@/components/ui";
import { getContainerClass, getColorModeClass } from "@/lib/layout";

export interface CardBoxProps {
  title?: React.ReactNode;
  tag?: React.ReactNode;
  text?: React.ReactNode;
  button?: { href: string; title?: string };
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export function CardBox({
  title,
  tag,
  text,
  button,
  children,
  className = "",
  cslp,
}: CardBoxProps) {
  // Support tags passed as string with "/" separators (e.g. "Componenten / Vue.js / Nuxt")
  const rawTag = tag;
  const tagList =
    typeof rawTag === "string"
      ? rawTag.split("/").map((t) => t.trim()).filter(Boolean)
      : null;

  return (
    <div
      {...cslp}
      className={`services-card h-fit md:h-full group relative overflow-hidden flex flex-col p-8 md:p-12 xl:p-14 bg-transparent border-0 rounded-none ${className} font-content`}
    >
      <div className="relative z-10 flex flex-col h-auto md:h-full">
        <div className="flex gap-5 sm:gap-8 flex-col w-full">
          {/* Circle Icon */}
          <div className="service-icon sm:w-[70px] sm:h-[70px] w-[60px] h-[60px] shrink-0 rounded-full border-[6px] border-accent7-300 dark:border-accent8-300 bg-accent7-900 dark:bg-accent8-900 flex items-center justify-center">
            <span className="text-accent7-100 dark:text-accent8-100 font-bold text-sm select-none">
              ✦
            </span>
          </div>

          {/* Titel & Tags */}
          <div className="flex flex-col justify-center gap-y-5 md:gap-y-3 lg:gap-y-1.5">
            {title && (
              <h4
                {...(cslp && (cslp.card_title || cslp.title || cslp.tag))}
                className="service-title text-title_4M sm:text-title_4 font-semibold text-title-100 dark:text-title-200 text-pretty"
              >
                {title}
              </h4>
            )}

            {tagList && tagList.length > 0 && (
              <div
                {...(cslp && cslp.tag)}
                className="service-tags flex flex-wrap items-center gap-1.5 text-label_smallM sm:text-label_small text-content-300 dark:text-content-300 uppercase"
              >
                {tagList.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className="service-tag">{item}</span>
                    {idx < tagList.length - 1 && <span>/</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            {!tagList && tag && (
              <div
                {...(cslp && cslp.tag)}
                className="service-tags flex flex-wrap items-center gap-1.5 text-label_smallM sm:text-label_small text-content-300 dark:text-content-300 uppercase"
              >
                {tag}
              </div>
            )}
          </div>

          {/* Beschrijving */}
          {text && (
            <div
              {...(cslp && (cslp.text || cslp.description))}
              className="service-desc flex flex-col text-mediumM sm:text-small text-content-100 dark:text-content-200 font-content flex-grow text-pretty leading-relaxed"
            >
              <p>{text}</p>
            </div>
          )}

          {button?.href && (
            <div className="pt-2 mt-auto">
              <Button
                href={button.href}
                variant="link-dark"
                arrow
                cslp={cslp && cslp.button}
              >
                {button.title || "Lees meer"}
              </Button>
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}

export interface CardImageTagProps {
  image?: { url: string; title?: string; $?: any };
  tag?: React.ReactNode;
  text?: React.ReactNode;
  button?: { href: string; title?: string };
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export function CardImageTag({
  image,
  tag,
  text,
  button,
  children,
  className = "",
  cslp,
}: CardImageTagProps) {
  return (
    <div
      {...cslp}
      className={`flex flex-col h-full group p-8 md:p-12 xl:p-14 ${className}`}
    >
      {/* Foto met afgeronde hoeken */}
      {image?.url && (
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200">
          <Image
            src={image.url}
            alt={image.title || (typeof tag === "string" ? tag : "Card image")}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            {...(image?.$ && image?.$.url)}
          />
        </div>
      )}

      {/* Tag / Badge */}
      {tag && (
        <div className="mb-3">
          <Label variant="pill" cslp={cslp && (cslp.tag || cslp.title)}>
            {tag}
          </Label>
        </div>
      )}

      {/* Omschrijving */}
      {text && (
        <p
          {...(cslp && (cslp.text || cslp.description))}
          className="text-content-100 dark:text-content-200 text-mediumM sm:text-small leading-relaxed whitespace-pre-line grow"
        >
          {text}
        </p>
      )}

      {/* Button */}
      {button?.href && (
        <div className="pt-3 mt-auto">
          <Button
            href={button.href}
            variant="link"
            arrow
            cslp={cslp && cslp.button}
          >
            {button.title || "Lees meer"}
          </Button>
        </div>
      )}

      {children}
    </div>
  );
}

export interface CardItemProps {
  card?: CardSectionItem;
  variant?: "default" | "image_tag" | string;
  image?: { url: string; title?: string; $?: any };
  tag?: React.ReactNode;
  title?: React.ReactNode;
  text?: React.ReactNode;
  description?: React.ReactNode;
  button?: { href: string; title?: string };
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export function CardItem({
  card,
  variant,
  image,
  tag,
  title,
  text,
  description,
  button,
  children,
  className = "",
  cslp,
}: CardItemProps) {
  const cardImage = image || card?.image;
  const cardTitle = title || card?.card_title || card?.title;
  const cardTag = tag || card?.tag;
  const cardText = text || card?.text || description || card?.description;
  const cardButton = button || card?.button;
  const cardVariant = variant || card?.card_variant?.toLowerCase() || "";
  const meta = cslp || card?.$;

  const isDefaultBox = !cardImage?.url || cardVariant === "default";

  if (isDefaultBox) {
    return (
      <CardBox
        title={cardTitle}
        tag={cardTag}
        text={cardText}
        button={cardButton}
        className={className}
        cslp={meta}
      >
        {children}
      </CardBox>
    );
  }

  return (
    <CardImageTag
      image={cardImage}
      tag={cardTag}
      text={cardText}
      button={cardButton}
      className={className}
      cslp={meta}
    >
      {children}
    </CardImageTag>
  );
}

export interface CardSectionHeaderProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  containerClass?: string;
  className?: string;
  cslp?: Record<string, any>;
  cslpLabel?: Record<string, any>;
  cslpTitle?: Record<string, any>;
  cslpIntro?: Record<string, any>;
}

export function CardSectionHeader({
  children,
  label,
  title,
  intro,
  containerClass = "w-full lg:max-w-7xl",
  className = "",
  cslp,
  cslpLabel,
  cslpTitle,
  cslpIntro,
}: CardSectionHeaderProps) {
  return (
    <header
      {...cslp}
      className={`w-full flex flex-col gap-14 md:gap-8 px-10 md:px-20 xl:px-14 border-t border-border-100 dark:border-border-200 py-14 md:py-24 relative ${className}`}
    >
      {/* Split background decoratie op desktop (xl) */}
      <div className="hidden xl:block absolute right-0 top-0 bottom-0 w-1/2 bg-border-100/70 dark:bg-border-200/70 pointer-events-none" />
      <div className="hidden xl:block absolute left-1/2 top-0 bottom-0 w-px bg-border-100 dark:border-border-200 -translate-x-1/2 pointer-events-none" />

      {/* Content grid - breedte gekoppeld aan Contentstack containerClass */}
      <div
        className={`mx-auto w-full sm:max-w-xl md:max-w-3xl ${containerClass} grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10 relative z-10`}
      >
        {/* Linker kolom: Label & Titel */}
        <div className="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-6 flex flex-col">
          {label && (
            <Label variant="brand" className="mb-3" cslp={cslpLabel}>
              {label}
            </Label>
          )}
          {title && (
            <h3
              {...cslpTitle}
              className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 text-balance lg:pr-10"
            >
              {title}
            </h3>
          )}
        </div>

        {/* Rechter kolom: Intro / beschrijving */}
        {(intro || children) && (
          <div className="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {intro && (
              <p
                {...cslpIntro}
                className="text-baseM sm:text-base text-content-100 dark:text-content-200 leading-relaxed font-content"
              >
                {intro}
              </p>
            )}
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

const colGrids: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 lg:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export interface CardGridProps {
  children: React.ReactNode;
  columns?: number | string;
  containerClass?: string;
  className?: string;
  cslp?: Record<string, any>;
}

export function CardGrid({
  children,
  columns = "3",
  containerClass = "w-full lg:max-w-7xl",
  className = "",
  cslp,
}: CardGridProps) {
  const colVal = String(columns || "3").match(/[1-4]/)?.[0] || "3";
  const colGridClass = colGrids[colVal] ?? colGrids["3"];

  return (
    <div
      {...cslp}
      className={`w-full flex flex-col px-10 md:px-20 xl:px-14 border-y border-border-100 dark:border-border-200 relative ${className}`}
    >
      {/* Desktop kruisdraad / divider-lijnen op lg schermen (alleen bij 2 kolommen) */}
      {colVal === "2" && (
        <>
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border-100 dark:border-border-200 -translate-x-1/2 pointer-events-none" />
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border-100 dark:border-border-200 -translate-y-1/2 pointer-events-none" />
        </>
      )}

      {/* Grid container met verticale zijranden */}
      <div
        className={`grid ${colGridClass} lg:auto-rows-fr mx-auto w-full sm:max-w-xl md:max-w-3xl ${containerClass} items-start lg:items-stretch gap-0 relative z-10 border-x border-border-100 dark:border-border-200 divide-y lg:divide-y-0 divide-border-100 dark:divide-border-200`}
      >
        {children}
      </div>
    </div>
  );
}

export interface CardSectionProps {
  children?: React.ReactNode;
  data?: CardSectionBlock;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  columns?: "1" | "2" | "3" | "4" | number | string;
  className?: string;
}

/**
 * CardSection: Consolidated section with desktop split header and hairline crosshair grid.
 */
export default function CardSection({
  children,
  data,
  previewAttr,
  width,
  colorMode,
  columns,
  className = "",
}: CardSectionProps) {
  const rawWidth = width || data?.width || data?.container_width;
  const containerClass = getContainerClass(rawWidth, "large");

  const colorModeKey = colorMode || data?.color_mode;
  const colorModeClass = getColorModeClass(colorModeKey);

  // Render CMS data if passed directly (e.g. from BlockRenderer)
  if (data && !children) {
    const rawLabel = data?.label_cards || data?.label;
    const sectionTitle = data?.section_title;
    const sectionIntro = data?.section_intro;
    const cards = data?.cards || [];
    const colVal = String(columns || data?.columns || "").match(/[1-4]/)?.[0] || "3";

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

  // Fallback declarative children
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

CardSection.Header = CardSectionHeader;
CardSection.Grid = CardGrid;
CardSection.Item = CardItem;
CardSection.Box = CardBox;
CardSection.ImageTag = CardImageTag;
