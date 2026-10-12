import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import {
  SplitSectionBlock as SplitSectionBlockType,
  CSLPAttribute,
} from "@/lib/types";
import {
  ArrowUpRightIcon,
  LinkIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

/**
 * Maps a grid_size number or string ('1' through '12') to Tailwind column span class.
 */
function getColSpanClass(gridSize?: string | number): string | null {
  if (!gridSize) return null;
  const size = String(gridSize).trim();
  switch (size) {
    case "1":
      return "col-span-12 lg:col-span-1";
    case "2":
      return "col-span-12 lg:col-span-2";
    case "3":
      return "col-span-12 lg:col-span-3";
    case "4":
      return "col-span-12 lg:col-span-4";
    case "5":
      return "col-span-12 lg:col-span-5";
    case "6":
      return "col-span-12 lg:col-span-6";
    case "7":
      return "col-span-12 lg:col-span-7";
    case "8":
      return "col-span-12 lg:col-span-8";
    case "9":
      return "col-span-12 lg:col-span-9";
    case "10":
      return "col-span-12 lg:col-span-10";
    case "11":
      return "col-span-12 lg:col-span-11";
    case "12":
      return "col-span-12";
    default:
      return null;
  }
}

/**
 * Renders the content of an individual grid block (text, image, timeline, button, etc.)
 */
export function GridColumnContent({
  data,
}: {
  data: SplitSectionBlockType;
}) {
  const buttonUrl = data.button?.href || data.button_url || "#";
  const buttonText = data.button?.title || data.button_text;
  const showButton = Boolean(buttonText);

  return (
    <div className="space-y-6">
      {/* Category / Section Label */}
      {data.label && (
        <p
          className="text-xs font-bold tracking-widest text-[#f05a46] uppercase"
          {...(data?.$ && data?.$.label)}
        >
          {data.label}
        </p>
      )}

      {/* Main Title */}
      {data.title && (
        <h2
          className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-gray-900 tracking-tight leading-[1.2]"
          {...(data?.$ && data?.$.title)}
        >
          {data.title}
        </h2>
      )}

      {/* Intro / Metadata Text */}
      {data.intro && (
        <div
          className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line"
          {...(data?.$ && data?.$.intro)}
        >
          {data.intro}
        </div>
      )}

      {/* Optional Image */}
      {data.image?.url && (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm bg-gray-100">
          <Image
            src={data.image.url}
            alt={data.image.title || data.title || "Image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            {...(data?.image?.$ && data?.image?.$.url)}
          />
        </div>
      )}

      {/* Action Button */}
      {showButton && (
        <div className="pt-2">
          <Link
            href={buttonUrl}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1b1f24] hover:bg-black text-white text-sm font-semibold rounded-xl shadow-sm transition duration-200 group"
            {...(data?.$ && (data?.$.button_text || data?.$.button))}
          >
            <span>{buttonText}</span>
            <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      )}

      {/* Social / Connect Icons */}
      {data.show_social_links && (
        <div className="pt-2 flex items-center gap-3">
          <span className="text-xs text-gray-400 font-medium select-none">
            Connect
          </span>
          <div className="flex items-center gap-2">
            <a
              href={data.social_website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="w-9 h-9 rounded-full bg-[#f05a46] hover:bg-[#e04835] text-white flex items-center justify-center transition shadow-sm"
            >
              <LinkIcon className="w-4 h-4" />
            </a>
            {data.social_phone && (
              <a
                href={`tel:${data.social_phone}`}
                aria-label="Telefoon"
                className="w-9 h-9 rounded-full bg-[#f05a46] hover:bg-[#e04835] text-white flex items-center justify-center transition shadow-sm"
              >
                <PhoneIcon className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${data.social_email || "info@ontwerpbureauschipper.nl"}`}
              aria-label="E-mail"
              className="w-9 h-9 rounded-full bg-[#f05a46] hover:bg-[#e04835] text-white flex items-center justify-center transition shadow-sm"
            >
              <EnvelopeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Rich Text Body */}
      {data.body_text && (
        <div
          {...(data?.$ && data?.$.body_text)}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.body_text),
          }}
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed
            [&>p]:mb-6 [&>p:last-child]:mb-0
            [&>blockquote]:my-8 [&>blockquote]:pl-6 [&>blockquote]:border-l-2 [&>blockquote]:border-rose-300 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:font-serif [&>blockquote]:text-gray-900 [&>blockquote]:leading-relaxed"
        />
      )}

      {/* Compact Timeline (Screenshot 2 style) */}
      {data.timeline_items && data.timeline_items.length > 0 && (
        <div
          className="space-y-8 pt-4"
          {...(data?.$ && data?.$.timeline_items)}
        >
          {data.timeline_items.map((company, cIdx) => {
            const companyName = company.company_name || company.title || "";
            const roles = company.roles || [];

            return (
              <div
                key={company._metadata?.uid || `compact-comp-${cIdx}`}
                className="relative pl-7 pb-6 last:pb-0"
              >
                {/* Vertical line */}
                <div
                  aria-hidden="true"
                  className="absolute left-1.5 top-2.5 bottom-0 w-[2px] bg-rose-200 -translate-x-1/2 pointer-events-none"
                />

                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#f05a46] -translate-x-1/2 ring-4 ring-rose-50"
                />

                {/* Company Name */}
                {companyName && (
                  <h3
                    className="text-base sm:text-lg font-bold text-gray-900 mb-2"
                    {...(company?.$ && (company?.$.company_name || company?.$.title))}
                  >
                    {companyName}
                  </h3>
                )}

                {/* Roles under company */}
                <div className="space-y-2">
                  {roles.map((role, rIdx) => {
                    const roleTitle = role.role_title || role.title || "";

                    return (
                      <div
                        key={role._metadata?.uid || `comp-role-${rIdx}`}
                        className="flex items-baseline justify-between gap-4 py-1 border-b border-gray-100 last:border-b-0 text-sm"
                      >
                        <span
                          className="text-gray-600 font-normal"
                          {...(role?.$ && (role?.$.role_title || role?.$.title))}
                        >
                          {roleTitle}
                        </span>
                        {role.period && (
                          <span
                            className="text-xs text-gray-400 font-medium whitespace-nowrap"
                            {...(role?.$ && role?.$.period)}
                          >
                            {role.period}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * SplitSectionLayout renders a container holding multiple Grid blocks next to each other
 * (e.g. 1 left block and 1 right block, with optional grid_size per block).
 */
export function SplitSectionLayout({
  items,
  previewAttr,
}: {
  items: any[];
  previewAttr?: CSLPAttribute;
}) {
  const isTwoCols = items.length === 2;

  return (
    <section {...previewAttr} className="col-span-full py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {items.map((rawItem: any, idx: number) => {
          const colData = rawItem.grid || rawItem.split_section || rawItem;

          // Check for explicitly configured grid_size
          const explicitSpan = getColSpanClass(colData.grid_size);

          // Defaults when grid_size is not set yet:
          // 2 items: 5 cols on the left (sticky) and 7 cols on the right
          // 3 items: 4 cols each
          // 1 item: 12 cols
          const defaultSpan = isTwoCols
            ? idx === 0
              ? "col-span-12 lg:col-span-5 lg:sticky lg:top-8"
              : "col-span-12 lg:col-span-7"
            : items.length === 3
            ? "col-span-12 lg:col-span-4"
            : "col-span-12";

          const spanClass = explicitSpan || defaultSpan;

          return (
            <div
              key={rawItem._metadata?.uid || colData._metadata?.uid || `grid-col-${idx}`}
              className={spanClass}
            >
              <GridColumnContent data={colData} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Default export handles single-block usage or direct delegation.
 */
export default function SplitSectionBlock({
  data,
  previewAttr,
}: {
  data: SplitSectionBlockType;
  previewAttr?: CSLPAttribute;
}) {
  return <SplitSectionLayout items={[data]} previewAttr={previewAttr} />;
}
