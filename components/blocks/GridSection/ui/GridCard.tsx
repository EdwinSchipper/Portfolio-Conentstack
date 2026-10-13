import React from "react";
import Image from "next/image";
import { GridCard as GridCardType } from "@/lib/types";

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
    <div className={`flex flex-col h-full ${className}`}>
      {cardImage?.url && (
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm bg-gray-100">
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
        <div className="mb-3">
          <span
            {...(cardMeta && (cardMeta.tag || cardMeta.title))}
            className="inline-block px-3 py-1 bg-white border border-gray-200/90 rounded-lg text-xs font-mono font-medium text-gray-800 shadow-2xs"
          >
            {cardTag}
          </span>
        </div>
      )}

      {cardText && (
        <p
          {...(cardMeta && (cardMeta.text || cardMeta.description))}
          className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line"
        >
          {cardText}
        </p>
      )}
    </div>
  );
}
