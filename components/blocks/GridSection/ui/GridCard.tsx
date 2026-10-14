import React from "react";
import Image from "next/image";
import { GridCard as GridCardType } from "@/lib/types";
import Label from "@/components/ui/Label";

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

export default function GridCard({
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
        <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden border border-border-100 dark:border-border-200  bg-red-900">
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
