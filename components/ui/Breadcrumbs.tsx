import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  currentTitle?: string;
  currentTitleAttr?: Record<string, any>;
  className?: string;
}

/**
 * Modern Breadcrumbs component with Google Schema.org BreadcrumbList SEO support.
 * Designed in the clean Ontwerpbureau Schipper visual aesthetic.
 */
export default function Breadcrumbs({
  items,
  currentTitle,
  currentTitleAttr,
  className = "",
}: BreadcrumbsProps) {
  // Construct list of breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] =
    items && items.length > 0
      ? items
      : [
          { label: "Home", href: "/" },
          ...(currentTitle ? [{ label: currentTitle, active: true }] : []),
        ];

  // Don't render if there's only Home or empty
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  // Schema.org BreadcrumbList for rich Google Search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <nav
      aria-label="Kruimelpad"
      className={`flex items-center text-xs sm:text-sm text-gray-500 mb-6 ${className}`}
    >
      {/* SEO structured microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {breadcrumbItems.map((item, idx) => {
          const isLast = idx === breadcrumbItems.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1.5 sm:gap-2">
              {idx > 0 && (
                <ChevronRightIcon
                  className="w-3.5 h-3.5 text-gray-400 stroke-2 shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                <span
                  className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs select-none"
                  aria-current="page"
                  {...(isLast ? currentTitleAttr : undefined)}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-black transition-colors flex items-center gap-1.5 no-underline text-gray-500 hover:underline"
                >
                  {idx === 0 && <HomeIcon className="w-3.5 h-3.5 shrink-0" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
