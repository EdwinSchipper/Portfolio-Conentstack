import React from "react";
import { Block, CSLPAttribute } from "@/lib/types";
import ContentBlockMedia from "./ContentBlockMedia";
import ContentBlockContent from "./ContentBlockContent";
import { ContentTitle, ContentCopy, ContentImage } from "./ui";

export interface ContentBlockProps {
  children?: React.ReactNode;
  data?: Block;
  previewAttr?: CSLPAttribute;
  layout?: "image_left" | "image_right";
  className?: string;
}

export default function ContentBlock({
  children,
  data,
  previewAttr,
  layout,
  className = "",
}: ContentBlockProps) {
  const chosenLayout = layout || data?.layout || "image_left";
  const isImageLeft = chosenLayout === "image_left";

  // CMS Auto-wiring if data is passed directly (e.g. from BlockRenderer)
  if (data && !children) {
    return (
      <section
        {...previewAttr}
        className={`col-span-full w-full py-8 md:py-16 bg-white ${className}`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${
            isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {data.image?.url && (
            <ContentBlockMedia
              image={data.image}
              cslp={data?.$ && data?.$.image}
            />
          )}

          <ContentBlockContent
            title={data.title}
            copy={data.copy}
            cslpTitle={data?.$ && data?.$.title}
            cslpCopy={data?.$ && data?.$.copy}
          />
        </div>
      </section>
    );
  }

  // Declarative Compound Rendering
  return (
    <section
      {...previewAttr}
      className={`col-span-full w-full py-8 md:py-16 bg-white ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${
          isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

// Namespaced Compound Components
ContentBlock.Media = ContentBlockMedia;
ContentBlock.Content = ContentBlockContent;
ContentBlock.Title = ContentTitle;
ContentBlock.Copy = ContentCopy;
ContentBlock.Image = ContentImage;

// Standalone Named Exports
export {
  ContentBlockMedia,
  ContentBlockContent,
  ContentTitle,
  ContentCopy,
  ContentImage,
};
