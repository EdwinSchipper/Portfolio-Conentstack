import React from "react";
import { ServiceCardBlock as ServiceCardBlockType, CSLPAttribute } from "@/lib/types";
import ServiceCardItem from "./ServiceCardItem";
import { ServiceCardBox, ServiceCardImage, ServiceCardTag } from "./ui";

/**
 * Maps Contentstack `grid_size` ('1', '2', '3') to Tailwind column span classes.
 * 1 = Full width (1 card per row)
 * 2 = Half width on medium+ screens (2 cards per row)
 * 3 = One-third width on medium+ screens (3 cards per row)
 */
export function getGridColSpan(gridSize?: string): string {
  const size = String(gridSize || "").trim();
  switch (size) {
    case "1":
      return "col-span-full";
    case "2":
      return "col-span-full md:col-span-6";
    case "3":
      return "col-span-full md:col-span-4";
    default:
      return "col-span-full md:col-span-4";
  }
}

export interface ServiceCardBlockProps {
  children?: React.ReactNode;
  data?: ServiceCardBlockType;
  previewAttr?: CSLPAttribute;
  gridSize?: "1" | "2" | "3" | string;
  className?: string;
}

export default function ServiceCardBlock({
  children,
  data,
  previewAttr,
  gridSize,
  className = "",
}: ServiceCardBlockProps) {
  const colSpanClass = getGridColSpan(gridSize || data?.grid_size);

  if (data && !children) {
    return (
      <div {...previewAttr} className={`${colSpanClass} ${className}`}>
        <ServiceCardItem data={data} />
      </div>
    );
  }

  return (
    <div {...previewAttr} className={`${colSpanClass} ${className}`}>
      {children}
    </div>
  );
}

// Namespaced Compound Components
ServiceCardBlock.Item = ServiceCardItem;
ServiceCardBlock.Box = ServiceCardBox;
ServiceCardBlock.Image = ServiceCardImage;
ServiceCardBlock.Tag = ServiceCardTag;

// Standalone Named Exports
export {
  ServiceCardItem,
  ServiceCardBox,
  ServiceCardImage,
  ServiceCardTag,
};
