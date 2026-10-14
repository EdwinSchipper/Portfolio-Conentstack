import React from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { CtaBlock as CtaBlockType, CSLPAttribute } from "@/lib/types";
import { Button, Label } from "@/components/ui";

export interface CtaBlockProps {
  data?: CtaBlockType;
  previewAttr?: CSLPAttribute;
  layout?: "image_left" | "image_right";
  className?: string;
}

/**
 * CtaBlock: Single-file Call-to-Action block supporting label, title, text_cta, image, and button.
 * Aligns with Contentstack content type schema (CTA_Resume).
 */
export default function CtaBlock({
  data,
  previewAttr,
  layout,
  className = "",
}: CtaBlockProps) {
  if (!data) return null;

  const chosenLayout = layout || "image_left";
  const isImageLeft = chosenLayout === "image_left";
  const hasImage = Boolean(data.image?.url);

  return (
    <section
      {...previewAttr}
      className={`col-span-full w-full py-12 md:py-20 font-content ${className}`}
    >

      <div
        className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${hasImage
            ? isImageLeft
              ? "md:flex-row"
              : "md:flex-row-reverse"
            : "justify-center"
          }`}
      >
        {/* Media / Image */}
        {hasImage && data.image?.url && (
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200">
              <Image
                src={data.image.url}
                alt={data.image.title || data.title || "CTA image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                {...(data.image?.$?.url || (data?.$ && data?.$.image))}
              />
            </div>
          </div>
        )}

        {/* Content (Label, Title, Text, Button) */}
        <div
          className={`w-full ${hasImage ? "md:w-1/2" : "max-w-3xl"
            } flex flex-col justify-center space-y-4`}
        >
          {data.label && (
            <div>
              <Label
                variant="brand"
                className="mb-1"
                cslp={data?.$ && data?.$.label}
              >
                {data.label}
              </Label>
            </div>
          )}

          {data.title && (
            <h2
              className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 tracking-tight text-balance"
              {...(data?.$ && data?.$.title)}
            >
              {data.title}
            </h2>
          )}

          {data.text_cta && (
            <div
              className="text-mediumM sm:text-small text-content-100 dark:text-content-200 leading-relaxed font-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.text_cta),
              }}
              {...(data?.$ && data?.$.text_cta)}
            />
          )}

          {data.button_cta?.href && (
            <div className="pt-2">
              <Button
                href={data.button_cta.href}
                variant="primary"
                cslp={data?.$ && data?.$.button_cta}
              >
                {data.button_cta.title || "Meer informatie"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
