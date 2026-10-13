import React from "react";
import Image from "next/image";
import CardTag from "./CardTag";
import Button from "@/components/ui/Button";

export interface CardImageTagProps {
  image?: { url: string; title?: string; $?: any };
  tag?: React.ReactNode;
  text?: React.ReactNode;
  button?: { href: string; title?: string };
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function CardImageTag({
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
      className={`flex flex-col h-full group ${className}`}
    >
      {/* Foto met rounded corners */}
      {image?.url && (
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm bg-gray-100">
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
          <CardTag cslp={cslp && (cslp.tag || cslp.title)}>
            {tag}
          </CardTag>
        </div>
      )}

      {/* Omschrijving */}
      {text && (
        <p
          {...(cslp && (cslp.text || cslp.description))}
          className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line grow"
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

