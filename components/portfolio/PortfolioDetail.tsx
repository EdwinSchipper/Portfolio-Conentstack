import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { PortfolioItem } from "@/lib/types";
import { ArrowLeftIcon, CalendarIcon, TagIcon } from "@heroicons/react/24/outline";

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
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Terug naar overzicht
        </Link>
      </div>

      {/* Meta tags & date */}
      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-medium text-gray-500">
        {item.project_tag && (
          <span
            {...(item?.$ && item?.$.project_tag)}
            className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold"
          >
            <TagIcon className="w-3.5 h-3.5" />
            {item.project_tag}
          </span>
        )}

        {categories.map((cat, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full uppercase tracking-wider"
          >
            {cat}
          </span>
        ))}

        {item.date && (
          <span className="inline-flex items-center gap-1 text-gray-400 ml-auto">
            <CalendarIcon className="w-3.5 h-3.5" />
            {item.date}
          </span>
        )}
      </div>

      {/* Title */}
      <h1
        {...(item?.$ && item?.$.title)}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
      >
        {item.title}
      </h1>

      {/* Description / Summary */}
      {item.description && (
        <p
          {...(item?.$ && item?.$.description)}
          className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed font-light"
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
