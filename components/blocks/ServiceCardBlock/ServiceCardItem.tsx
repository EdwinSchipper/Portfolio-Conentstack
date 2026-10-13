import React from "react";
import { ServiceCardBlock as ServiceCardBlockType } from "@/lib/types";
import ServiceCardBox from "./ui/ServiceCardBox";
import ServiceCardImage from "./ui/ServiceCardImage";

export interface ServiceCardItemProps {
  data?: ServiceCardBlockType;
  variant?: "default" | "image" | string;
  title?: React.ReactNode;
  text?: React.ReactNode;
  image?: { url: string; title?: string; $?: any };
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function ServiceCardItem({
  data,
  variant,
  title,
  text,
  image,
  children,
  className = "",
  cslp,
}: ServiceCardItemProps) {
  const cardTitle = title || data?.card_title;
  const cardText = text || data?.card_text;
  const cardImage = image || data?.image;
  const rawVariant = (variant || data?.card_variant || data?.variant || "").toLowerCase();

  const isImageVariant =
    rawVariant.includes("image") ||
    rawVariant.includes("tag") ||
    (Boolean(cardImage?.url) && rawVariant !== "default");

  const meta = cslp || data?.$;

  if (isImageVariant) {
    return (
      <ServiceCardImage
        image={cardImage as any}
        tag={cardTitle}
        text={cardText}
        className={className}
        cslpTag={meta && meta.card_title}
        cslpText={meta && meta.card_text}
      >
        {children}
      </ServiceCardImage>
    );
  }

  return (
    <ServiceCardBox
      title={cardTitle}
      text={cardText}
      className={className}
      cslpTitle={meta && meta.card_title}
      cslpText={meta && meta.card_text}
    >
      {children}
    </ServiceCardBox>
  );
}
