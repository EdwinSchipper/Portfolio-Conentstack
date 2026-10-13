import React from "react";
import Image from "next/image";
import ServiceCardTag from "./ServiceCardTag";

export interface ServiceCardImageProps {
  image?: { url: string; title?: string; $?: any };
  tag?: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
  cslpTag?: Record<string, any>;
  cslpText?: Record<string, any>;
}

export default function ServiceCardImage({
  image,
  tag,
  text,
  children,
  className = "",
  cslp,
  cslpTag,
  cslpText,
}: ServiceCardImageProps) {
  return (
    <div
      {...cslp}
      className={`flex flex-col h-full ${className}`}
    >
      {image?.url && (
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm bg-gray-100">
          <Image
            src={image.url}
            alt={image.title || (typeof tag === "string" ? tag : "Service card image")}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            {...(image?.$ && image?.$.url)}
          />
        </div>
      )}

      {tag && (
        <div className="mb-3">
          <ServiceCardTag cslp={cslpTag}>{tag}</ServiceCardTag>
        </div>
      )}

      {text && (
        <p
          {...cslpText}
          className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line"
        >
          {text}
        </p>
      )}

      {children}
    </div>
  );
}
