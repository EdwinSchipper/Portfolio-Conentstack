import DOMPurify from "isomorphic-dompurify"; // Importing DOMPurify for sanitizing HTML content to prevent XSS attacks
import Image from "next/image"; // Importing Next.js optimized Image component for better performance
import { Page } from "@/lib/types"; // Importing the Page type definition from our types file
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils"; // Importing Visual Builder class for empty block handling in Contentstack Live Preview
import BlockRenderer from "@/components/blocks/BlockRenderer";

// Interface defining the props for the ContentDisplay component
interface ContentDisplayProps {
  page: Page | undefined; // Page data that may be undefined during loading
}

// Main component for displaying page content with Contentstack Live Preview support
export default function ContentDisplay({ page }: ContentDisplayProps) {
  return (
    <section className="p-4">

      {/* Display page title if it exists */}
      {page?.title ? (
        <h1
          className="text-4xl font-bold mb-4 text-center"
          // Spread live preview attributes for editing capability in Contentstack
          {...(page?.$ && page?.$.title)}
        >
          {page?.title} with Next
        </h1>
      ) : null}

      {/* Display page description if it exists */}
      {page?.description ? (
        <p className="mb-4 text-center" {...(page?.$ && page?.$.description)}>
          {page?.description}
        </p>
      ) : null}

      {/* Display hero image if it exists */}
      {page?.image ? (
        <Image
          className="mb-4 mx-auto rounded-lg"
          width={768}
          height={414}
          src={page?.image.url}
          alt={page?.image.title}
          // Spread live preview attributes for the image field
          {...(page?.image?.$ && page?.image?.$.url)}
        />
      ) : null}

      {/* Display rich text content if it exists, sanitized for security */}
      {page?.rich_text ? (
        <div
          {...(page?.$ && page?.$.rich_text)}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(page?.rich_text), // Sanitize HTML to prevent XSS attacks
          }}
          className="prose mx-auto"
        />
      ) : null}

      {/* 
        Container for modular blocks with Visual Builder support
        Adds empty block class when no blocks exist for better editing experience
      */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-8 max-w-full mt-8 ${!page?.blocks || page.blocks.length === 0
          ? VB_EmptyBlockParentClass // Special class for empty state in Visual Builder
          : ""
          }`}
        {...(page?.$ && page?.$.blocks)}
      >
        {/* Cleanly delegate each modular block to BlockRenderer */}
        {page?.blocks?.map((item, index) => (
          <BlockRenderer
            key={
              item.service_card?._metadata?.uid ||
              item.block?._metadata?.uid ||
              item.featured_projects?._metadata?.uid ||
              item.experience_timeline?._metadata?.uid ||
              item.split_section?._metadata?.uid ||
              item.grid_section?._metadata?.uid ||
              item.layout?._metadata?.uid ||
              `block-${index}`
            }
            block={item}
            index={index}
            pagePreviewAttr={page?.$}
          />
        ))}
      </div>
    </section>
  );
}
