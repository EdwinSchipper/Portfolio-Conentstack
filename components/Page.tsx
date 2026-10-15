import Image from "next/image"; // Importing Next.js optimized Image component for better performance
import { Page } from "@/lib/types"; // Importing the Page type definition from our types file
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils"; // Importing Visual Builder class for empty block handling in Contentstack Live Preview
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Label from "@/components/ui/Label";

// Interface defining the props for the ContentDisplay component
interface ContentDisplayProps {
  page: Page | undefined; // Page data that may be undefined during loading
}

// Main component for displaying page content with Contentstack Live Preview support
export default function ContentDisplay({ page }: ContentDisplayProps) {
  // Breadcrumb visibility: enabled on subpages unless explicitly turned off
  const isHome = !page?.url || page.url === "/";
  const showBreadcrumbs = !isHome && page?.show_breadcrumbs !== false;
  const breadcrumbTitle = page?.breadcrumb_title || page?.title;

  return (
    <section className="">


      {/* Header */}
      <div className="relative w-full flex flex-col justify-end pt-36 md:pt-40 lg:pt-52 pb-10 md:pb-16 lg:pb-24 overflow-hidden border-b border-border-100/30 dark:border-border-200/5 -mt-[109px] mb-14 lg:mb-20 bg-gradient-to-tl from-accent7-200/30 to-accent7-500/60 dark:from-accent8-100 dark:via-accent8-100 dark:to-accent8-300 font-content">

        <div className="relative z-10 w-full max-w-4xl xl:max-w-6xl px-10 sm:px-14 md:px-20 lg:px-12 mx-auto flex flex-col items-start">

          {/* Display page description as UI Label if it exists */}
          {page?.description ? (
            <Label
              variant="brand"
              className="flex gap-3 items-center relative w-full mb-3 md:mb-3 xl:mb-3"
              cslp={page?.$ && page?.$.description}
            >
              {page.description}
            </Label>
          ) : null}


          {/* Display page title if it exists */}
          {page?.title ? (
            <h1
              className="text-title_1M sm:text-title_1 font-bold text-title-100 dark:text-title-200 tracking-tight text-balance max-w-4xl"
              {...(page?.$ && page?.$.title)}
            >
              {page?.title}
            </h1>
          ) : null}


        </div>


      </div>
      {/* Breadcrumbs within page content, above title */}
      {showBreadcrumbs && (
        <div className="mx-auto max-w-4xl xl:max-w-6xl w-full">
          <Breadcrumbs
            currentTitle={breadcrumbTitle}
            currentTitleAttr={
              page?.$ && (page?.$.breadcrumb_title || page?.$.title)
            }
          />
        </div>
      )}



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
      {/* {page?.rich_text ? (
        <div
          {...(page?.$ && page?.$.rich_text)}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(page?.rich_text), // Sanitize HTML to prevent XSS attacks
          }}
          className="prose mx-auto"
        />
      ) : null} */}

      {/* 
        Container for modular blocks with Visual Builder support
        Adds empty block class when no blocks exist for better editing experience
      */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-8 max-w-full ${!page?.blocks || page.blocks.length === 0
          ? VB_EmptyBlockParentClass // Special class for empty state in Visual Builder
          : ""
          }`}
        {...(page?.$ && page?.$.blocks)}
      >
        {/* Cleanly delegate each modular block to BlockRenderer */}
        {page?.blocks?.map((item, index) => {
          const blockKey =
            Object.values(item).find(
              (b) => b && typeof b === "object" && "_metadata" in b && (b as any)._metadata?.uid
            )?._metadata?.uid || `block-${index}`;

          return (
            <BlockRenderer
              key={blockKey}
              block={item}
              index={index}
              pagePreviewAttr={page?.$}
            />
          );
        })}
      </div>
    </section>
  );
}
