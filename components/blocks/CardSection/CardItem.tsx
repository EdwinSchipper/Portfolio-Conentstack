import React from "react";
import { CardSectionItem } from "@/lib/types";
import CardBox from "./ui/CardBox";
import CardImageTag from "./ui/CardImageTag";

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

export default function CardItem({
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
  const cardTag = tag || card?.tag || title || card?.title;
  const cardText = text || card?.text || description || card?.description;
  const cardButton = button || card?.button;
  const cardVariant = variant || card?.card_variant?.toLowerCase() || "";
  const meta = cslp || card?.$;

  const isDefaultBox = cardVariant === "default" && !cardImage?.url;

  if (isDefaultBox) {
    return (
      <CardBox
        title={cardTag}
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
