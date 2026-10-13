import React from "react";
import ContentImage from "./ui/ContentImage";

export interface ContentBlockMediaProps {
  image?: { url: string; title?: string; $?: any };
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function ContentBlockMedia({
  image,
  children,
  className = "",
  cslp,
}: ContentBlockMediaProps) {
  return (
    <div className={`w-full md:w-1/2 ${className}`} {...cslp}>
      {image?.url ? (
        <ContentImage
          src={image.url}
          alt={image.title || "Content image"}
          cslp={image?.$ && image?.$.url}
        />
      ) : (
        children
      )}
    </div>
  );
}
