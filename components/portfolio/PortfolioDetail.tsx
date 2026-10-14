import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { PortfolioItem } from "@/lib/types";
import { Breadcrumbs, Button, Label, Icon } from "@/components/ui";

interface PortfolioDetailProps {
  item: PortfolioItem;
}

export default function PortfolioDetail({ item }: PortfolioDetailProps) {
  const categories = Array.isArray(item.category)
    ? item.category
    : item.category
    ? [item.category]
    : [];

  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/#portfolio" },
          { label: item.title, active: true },
        ]}
        currentTitleAttr={item?.$ && item?.$.title}
        className="mb-6"
      />

      {/* Back button */}
      <div className="mb-8">
        <Button
          href="/"
          variant="link-dark"
          size="sm"
        >
          ← Terug naar overzicht
        </Button>
      </div>

      {/* Meta tags & date */}
      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-medium text-gray-500">
        {item.project_tag && (
          <Label
            variant="pill"
            cslp={item?.$ && item?.$.project_tag}
            className="inline-flex items-center gap-1.5"
          >
            <Icon
              name="tag"
              size="xs"
              className="text-accent7-900 dark:text-accent8-900"
            />
            {item.project_tag}
          </Label>
        )}

        {categories.map((cat, idx) => (
          <Label
            key={idx}
            variant="pill"
            cslp={item?.$ && item?.$.category}
          >
            {cat}
          </Label>
        ))}

        {item.date && (
          <span className="inline-flex items-center gap-1.5 text-content-300 dark:text-content-300 ml-auto font-playfull">
            <Icon
              name="calendar"
              size="xs"
            />
            {item.date}
          </span>
        )}
      </div>

      {/* Title */}
      <h1
        {...(item?.$ && item?.$.title)}
        className="text-title_1M sm:text-title_1 font-bold text-title-100 dark:text-title-200 tracking-tight font-content mb-4"
      >
        {item.title}
      </h1>

      {/* Description / Summary */}
      {item.description && (
        <p
          {...(item?.$ && item?.$.description)}
          className="text-mediumM sm:text-medium text-content-100 dark:text-content-200 mb-8 leading-relaxed font-content"
        >
          {item.description}
        </p>
      )}

      {/* Featured Image */}
      {item.featured_image?.url && (
        <div className="relative w-full h-[280px] sm:h-[400px] md:h-[480px] rounded-2xl overflow-hidden mb-12 shadow-md">
          <Image
            src={item.featured_image.url}
            alt={item.featured_image.title || item.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
            {...(item?.featured_image?.$ && item?.featured_image?.$.url)}
          />
        </div>
      )}

      {/* Rich Text Case Study Content */}
      {item.content && (
        <div
          {...(item?.$ && item?.$.content)}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(item.content),
          }}
          className="prose prose-slate max-w-none text-gray-700 leading-relaxed"
        />
      )}
    </article>
  );
}
