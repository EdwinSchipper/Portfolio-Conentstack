import React from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { PortfolioItem, File } from "@/lib/types";
import { Breadcrumbs, Label, Icon } from "@/components/ui";
import PortfolioTechStack from "./PortfolioTechStack";

interface PortfolioDetailProps {
  item?: PortfolioItem | null;
}

/**
 * Helper to safely extract image URL from either Contentstack File object or string URL.
 */
function getImageUrl(img?: File | string | null): string | null {
  if (!img) return null;
  if (typeof img === "string") return img;
  if (typeof img === "object" && img.url) return img.url;
  return null;
}

/**
 * Safely renders either sanitized HTML or plain text with fallback support.
 */
function renderRichOrPlainText(
  text: string | undefined,
  fallback: string,
  cslpAttr: Record<string, any> | undefined,
  className: string
) {
  const value = text || fallback;
  if (!value) return null;
  const isHtml = /<[a-z][\s\S]*>/i.test(value);
  if (isHtml) {
    return (
      <div
        {...cslpAttr}
        className={className}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
      />
    );
  }
  return (
    <p {...cslpAttr} className={`${className} whitespace-pre-line`}>
      {value}
    </p>
  );
}

/**
 * PortfolioDetail component refactored from Nuxt to Next.js App Router.
 *
 * Implements:
 * - Nuxt -> Next.js syntax transformations (<NuxtImg> -> Next <Image>, <NuxtLink> -> Next <Link>, <UIcon> -> <Icon>).
 * - Multi-section storytelling case study layout:
 *   1. Page Header with brand gradient & company/title
 *   2. Kruimelpad / Breadcrumbs
 *   3. 01 — Overzicht: Main Hero image + De essentie van het project
 *   4. Tech Stack / Project Details summary bar with icons
 *   5. 02 — Uitdaging: De kern van de uitdaging + Banner Visual 1
 *   6. 03 — Aanpak: Uitdagingen & Oplossingen + Banner Visual 2
 *   7. 04 — Uitkomst: Mijn rol en expertise (+ optionele Banner Visual 3)
 *   8. Terug naar portfolio navigatie
 * - Complete Contentstack Live Preview & Visual Builder support (data-cslp).
 * - Resilient field resolution supporting both camelCase and Contentstack-generated lowercase UIDs.
 */
export default function PortfolioDetail({ item }: PortfolioDetailProps) {
  // Empty state handling
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-content-100/60 dark:text-content-200/60 font-content">
        Project niet gevonden.
      </div>
    );
  }

  const companyOrTitle = item.company || item.title;

  // Overview text: supports description or content
  const overviewText = item.description || item.content;
  const overviewCslp =
    item?.$ && (item?.$.description || item?.$.content);

  // Section 02, 03, 04 texts
  const detail1Text = item.portfolioimagedetail1_txt;
  const detail2Text = item.portfolioimagedetail2_txt;
  const detail3Text = item.portfolioimagedetail3_txt;

  // CSLP live preview attributes
  const detail1Cslp = item?.$ && item.$.portfolioimagedetail1_txt;
  const detail2Cslp = item?.$ && item.$.portfolioimagedetail2_txt;
  const detail3Cslp = item?.$ && item.$.portfolioimagedetail3_txt;

  // Hero image resolution (supports portfolioimagedetail, fallback to featured_image)
  const heroImg = item.portfolioimagedetail || item.featured_image;
  const heroImgUrl = getImageUrl(heroImg);

  // Banner images: supports new banner_visual_1/2 with fallback to portfolioimagedetail1/2
  const banner1Img = item.banner_visual_1 || item.portfolioimagedetail1;
  const banner2Img = item.banner_visual_2 || item.portfolioimagedetail2;
  const banner3Img = item.portfolioimagedetail3;

  const banner1Url = getImageUrl(banner1Img);
  const banner2Url = getImageUrl(banner2Img);
  const banner3Url = getImageUrl(banner3Img);

  const banner1Cslp =
    (item?.$ && (item.$.banner_visual_1 || item.$.portfolioimagedetail1)) ||
    (typeof banner1Img === "object" && banner1Img?.$ && (banner1Img as any).$.url);

  const banner2Cslp =
    (item?.$ && (item.$.banner_visual_2 || item.$.portfolioimagedetail2)) ||
    (typeof banner2Img === "object" && banner2Img?.$ && (banner2Img as any).$.url);


  return (
    <article className="w-full">
      {/* 1. Page Header (Nuxt: <UiPageHeader :title="portfolioItem.company" label="Portfolio" />) */}
      <header className="relative w-full flex flex-col justify-end pt-36 md:pt-40 lg:pt-52 pb-10 md:pb-16 lg:pb-24 overflow-hidden border-b border-border-100/30 dark:border-border-200/5 -mt-[109px] mb-14 lg:mb-20 bg-gradient-to-tl from-accent7-200/30 to-accent7-500/60 dark:from-accent8-100 dark:via-accent8-100 dark:to-accent8-300 font-content">
        <div className="relative z-10 w-full max-w-4xl xl:max-w-6xl px-10 sm:px-14 md:px-20 lg:px-12 mx-auto flex flex-col items-start">
          <Label
            variant="brand"
            className="flex gap-3 items-center relative w-full mb-3 md:mb-3 xl:mb-3"
          >
            Portfolio
          </Label>

          <h1
            {...(item?.$ && (item?.$.company || item?.$.title))}
            className="text-title_1M sm:text-title_1 font-bold text-title-100 dark:text-title-200 tracking-tight text-balance max-w-4xl"
          >
            {companyOrTitle}
          </h1>
        </div>
      </header>

      {/* 2. Breadcrumbs (Nuxt: <UiBreadcrumbs :items="breadcrumbItems" />) */}
      <section
        id="portfolio-header"
        className="mx-auto max-w-4xl xl:max-w-6xl w-full"
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/#portfolio" },
            { label: companyOrTitle, active: true },
          ]}
          currentTitleAttr={item?.$ && (item?.$.company || item?.$.title)}
        />
      </section>

      {/* 3. Section 01: Overzicht & De essentie van het project (Nuxt: #page-intro-gsap) */}
      <section
        id="page-intro-gsap"
        className="flex lg:items-center justify-center sm:max-w-xl md:max-w-4xl lg:max-w-7xl container lg:w-full px-6 sm:px-0 md:px-14 lg:px-20 xl:px-12 mx-auto z-20 mb-14 lg:mb-40 overflow-hidden"
      >
        <div className="w-full mx-auto z-20 flex flex-col md:grid md:grid-cols-12 items-start justify-start lg:justify-end lg:items-end">
          <h2 className="sr-only">Portfolio</h2>

          {/* Left: Main Hero Image */}
          <div
            id="page-intro-content-left"
            className="w-full relative group rounded-md overflow-hidden order-2 md:order-1 md:col-span-6 lg:col-span-7 mb-8 lg:mb-0 mt-8 md:mt-0 h-[220px] sm:h-[325px] md:h-[400px] lg:h-[500px] xl:h-[50vh] bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200"
          >
            {heroImgUrl && (
              <Image
                src={heroImgUrl}
                alt={
                  item.alt_text ||
                  (typeof heroImg === "object" && heroImg?.title) ||
                  `Hero afbeelding voor ${companyOrTitle}`
                }
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
                className="object-cover"
                {...(typeof heroImg === "object" && heroImg?.$ && (heroImg as any).$.url)}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-background-900/5 via-background-900/10 dark:from-background-900/5 dark:via-background-900/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Right: Overzicht content */}
          <div
            id="page-intro-content-right"
            className="contents lg:relative lg:pt-10 lg:pb-0 md:order-2 md:col-span-6 lg:col-span-5 md:flex md:justify-end md:flex-col md:pl-14 xl:pl-24"
          >
            <div className="flex flex-col md:mb-4 lg:mb-10 order-1 lg:order-none w-full mx-auto px-4 sm:px-0">
              <Label
                variant="numbered"
                id="synergy-label"
                className="mb-2"
              >
                01 — Overzicht
              </Label>

              <div className="w-full relative">
                <h2
                  id="synergy-title"
                  className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 max-w-sm md:max-w-xl lg:max-w-6xl text-balance"
                >
                  De essentie van het project
                </h2>
              </div>
            </div>

            {renderRichOrPlainText(
              overviewText,
              "",
              overviewCslp,
              "text-mediumM sm:text-medium w-full text-content-100 dark:text-content-200 text-pretty font-normal font-content order-3 lg:order-none max-w-xl mx-auto px-4 sm:px-0 leading-relaxed [&>p]:mb-4"
            )}
          </div>
        </div>
      </section>

      {/* 4. Tech Stack (Alleen zichtbaar indien ingevuld in Contentstack) */}
      <PortfolioTechStack
        items={item.tech_stack}
        cslp={item?.$ && item.$.tech_stack}
      />

      {/* 5. Section 02: Uitdaging (Nuxt: #portfolio-section-01) */}
      <section
        id="portfolio-section-01"
        className="portfolio-section mx-auto max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-10 md:px-20 lg:px-12 mb-14 lg:mb-20 font-content"
      >
        <div className="container mx-auto">
          <div className="lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 md:flex flex-row md:flex-col mb-7 lg:mb-0 items-start">
              <Label
                id="synergy-label-01"
                variant="numbered"
                className="mb-2"
              >
                02 — Uitdaging
              </Label>

              <h3
                id="synergy-title-01"
                className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 max-w-sm md:max-w-xl lg:max-w-6xl text-balance"
              >
                De kern van de uitdaging
              </h3>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {renderRichOrPlainText(
                detail1Text,
                "Geen uitdaging toelichting opgegeven.",
                detail1Cslp,
                "text-content-100 dark:text-content-200 text-baseM sm:text-base font-normal text-pretty leading-relaxed [&>p]:mb-4"
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Banner 1 Visual (Nuxt: #portfolio-banner-1) */}
      {banner1Url && (
        <section
          id="portfolio-banner-1"
          className="px-10 md:px-20 lg:px-12 mb-28 md:mb-40 lg:mb-48 max-w-xl md:max-w-4xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto"
        >
          <div className="container mx-auto">
            <div className="relative w-auto lg:w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[780px] rounded-md overflow-hidden group -mx-4 lg:mx-auto bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200">
              <Image
                src={banner1Url}
                alt={
                  item.alt_text ||
                  (typeof banner1Img === "object" && banner1Img?.title) ||
                  `Project visual voor ${companyOrTitle}`
                }
                fill
                loading="lazy"
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                {...(banner1Cslp as any)}
              />
            </div>
          </div>
        </section>
      )}

      {/* 7. Section 03: Aanpak (Nuxt: #portfolio-section-02) */}
      <section
        id="portfolio-section-02"
        className="portfolio-section mx-auto max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-10 md:px-20 lg:px-12 mb-14 lg:mb-20 font-content"
      >
        <div className="container mx-auto">
          <div className="lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 md:flex flex-row md:flex-col mb-7 lg:mb-0 items-start">
              <Label
                id="synergy-label-02"
                variant="numbered"
                className="mb-2"
              >
                03 — Aanpak
              </Label>
              <h3
                id="synergy-title-02"
                className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 max-w-sm md:max-w-xl lg:max-w-6xl text-balance"
              >
                Uitdagingen &amp; Oplossingen
              </h3>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {renderRichOrPlainText(
                detail2Text,
                "Geen aanpak toelichting opgegeven.",
                detail2Cslp,
                "text-content-100 dark:text-content-200 text-baseM sm:text-base font-normal text-pretty leading-relaxed [&>p]:mb-4"
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Banner 2 Visual (Nuxt: #portfolio-banner-2) */}
      {banner2Url && (
        <section
          id="portfolio-banner-2"
          className="px-10 md:px-20 lg:px-12 mb-28 md:mb-40 lg:mb-48 max-w-xl md:max-w-4xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto"
        >
          <div className="container mx-auto">
            <div className="relative w-auto lg:w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[780px] rounded-md overflow-hidden group -mx-4 lg:mx-auto bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200">
              <Image
                src={banner2Url}
                alt={
                  item.alt_text ||
                  (typeof banner2Img === "object" && banner2Img?.title) ||
                  `Project visual voor ${companyOrTitle}`
                }
                fill
                loading="lazy"
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                {...(banner2Cslp as any)}
              />
            </div>
          </div>
        </section>
      )}

      {/* 9. Section 04: Uitkomst (Nuxt: #portfolio-section-03) */}
      <section
        id="portfolio-section-03"
        className="portfolio-section mx-auto max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-10 md:px-20 lg:px-12 mb-14 lg:mb-20 font-content"
      >
        <div className="container mx-auto">
          <div className="lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 md:flex flex-row md:flex-col mb-7 lg:mb-0 items-start">
              <Label
                id="synergy-label-03"
                variant="numbered"
                className="mb-2"
              >
                04 — Uitkomst
              </Label>
              <h3
                id="synergy-title-03"
                className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 max-w-sm md:max-w-xl lg:max-w-6xl text-balance"
              >
                Mijn rol en expertise
              </h3>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {renderRichOrPlainText(
                detail3Text,
                "Geen uitkomst toelichting opgegeven.",
                detail3Cslp,
                "text-content-100 dark:text-content-200 text-baseM sm:text-base font-normal text-pretty leading-relaxed [&>p]:mb-4"
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Optionele Banner 3 Visual indien aanwezig */}
      {banner3Url && (
        <section
          id="portfolio-banner-3"
          className="px-10 md:px-20 lg:px-12 mb-28 md:mb-40 lg:mb-48 max-w-xl md:max-w-4xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto"
        >
          <div className="container mx-auto">
            <div className="relative w-auto lg:w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[780px] rounded-md overflow-hidden group -mx-4 lg:mx-auto bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200">
              <Image
                src={banner3Url}
                alt={
                  item.alt_text ||
                  (typeof banner3Img === "object" && banner3Img?.title) ||
                  `Project visual voor ${companyOrTitle}`
                }
                fill
                loading="lazy"
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                {...(typeof banner3Img === "object" && banner3Img?.$ && (banner3Img as any).$.url)}
              />
            </div>
          </div>
        </section>
      )}

      {/* 10. Horizontal Divider (Nuxt: <UiHorizontalDivider />) */}
      <section id="portfolio-divider" className="section-divider">
        <hr className="max-w-5xl mx-auto mb-14 lg:mb-14 border-border-100 dark:border-border-200" />
      </section>

      {/* 11. Terug naar portfolio navigatie (Nuxt: <NuxtLink to="/portfolio">) */}
      <section
        id="aanpak-section"
        className="px-10 md:px-20 lg:px-12 mb-28 md:mb-40 lg:mb-60"
      >
        <div className="container mx-auto max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div
            id="intro-label"
            className="flex gap-4 lg:gap-x-4 text-content-100/70 dark:text-content-200/70 text-smallM md:text-small font-content font-normal w-fit"
          >
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 hover:text-title-100 dark:hover:text-title-200 hover:gap-x-3 transition-all duration-200 font-bold underline"
            >
              <Icon name="arrow-long-left" size="sm" />
              <span>Terug naar portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
