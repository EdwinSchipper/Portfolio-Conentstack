import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import { CSLPAttribute, GridSectionBlock } from "@/lib/types";

/** Container widths - Contentstack (Mobile-first). */
const containerWidths: Record<string, string> = {
  small: "max-w-4xl",
  default: "max-w-4xl xl:max-w-5xl",
  large: "max-w-7xl",
  wide: "container",
};

/** Column spans - Contentstack (1 t/m 12). */
const colSpans: Record<string, string> = {
  "1": "col-span-12 lg:col-span-1",
  "2": "col-span-12 lg:col-span-2",
  "3": "col-span-12 lg:col-span-3",
  "4": "col-span-12 lg:col-span-4",
  "5": "col-span-12 lg:col-span-5",
  "6": "col-span-12 lg:col-span-6",
  "7": "col-span-12 lg:col-span-7",
  "8": "col-span-12 lg:col-span-8",
  "9": "col-span-12 lg:col-span-9",
  "10": "col-span-12 lg:col-span-10",
  "11": "col-span-12 lg:col-span-11",
  "12": "col-span-12",
};

/** Color modes - Contentstack (Default of Alt achtergrond). */
const colorModes: Record<string, string> = {
  default: "bg-transparent",
  alt: "bg-white py-16 md:py-24",
};

export default function GridSection({
  data,
  previewAttr,
}: {
  data: GridSectionBlock;
  previewAttr?: CSLPAttribute;
}) {
  const containerClass = containerWidths[data?.container_width?.toLowerCase() ?? "default"] ?? containerWidths.default;
  const colorModeKey = data?.color_mode?.toLowerCase() ?? "default";
  const colorModeClass = colorModes[colorModeKey] ?? colorModes.default;
  const leftCol = colSpans[String(data?.left_col_span)] ?? colSpans["5"];
  const rightCol = colSpans[String(data?.right_col_span)] ?? colSpans["7"];

  // Direct group lookup: content_left & content_right
  const contentLeft = data?.content_left;
  const contentRight = data?.content_right;

  return (
    <section
      {...previewAttr}
      data-color-mode={colorModeKey}
      className={`col-span-full w-full mb-20 md:mb-40 lg:mb-40 ${colorModeClass}`}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-12 mx-auto z-20 ${containerClass} px-10 sm:px-14 lg:px-12 md:px-20 mb-16 gap-14 lg:gap-x-10 xl:gap-x-24`}
      >
        <div className={leftCol}>
          {contentLeft && (
            <div className="space-y-4">
              {contentLeft.label_left && (
                <span
                  {...(contentLeft?.$?.label_left)}
                  className="text-xs font-bold tracking-widest text-[#f05a46] uppercase mb-2 block"
                >
                  {contentLeft.label_left}
                </span>
              )}

              {contentLeft.title_h1 && (
                <h1
                  {...(contentLeft?.$?.title_h1)}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4"
                >
                  {contentLeft.title_h1}
                </h1>
              )}

              {contentLeft.text_left && (
                <div
                  {...(contentLeft?.$?.text_left)}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(contentLeft.text_left),
                  }}
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                />
              )}

              {contentLeft.image_left?.url && (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-gray-100 mt-4">
                  <Image
                    src={contentLeft.image_left.url}
                    alt={contentLeft.image_left.title || contentLeft.title_h1 || "Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    {...(contentLeft.image_left?.$?.url || contentLeft?.$?.image_left)}
                  />
                </div>
              )}

              {contentLeft.quote_left && (
                <blockquote
                  {...(contentLeft?.$?.quote_left)}
                  className="border-l-2 border-[#f05a46] pl-4 py-1 italic text-lg sm:text-xl font-serif text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(contentLeft.quote_left),
                  }}
                />
              )}

              {contentLeft.button_left?.href && contentLeft.button_left?.title && (
                <div className="pt-2">
                  <Link
                    href={contentLeft.button_left.href}
                    {...(contentLeft?.$?.button_left)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1b1f24] hover:bg-black text-white text-sm font-semibold rounded-xl shadow-sm transition duration-200"
                  >
                    <span>{contentLeft.button_left.title}</span>
                  </Link>
                </div>
              )}

              {/* Cards grid (Multiple) */}
              {contentLeft.cards && contentLeft.cards.length > 0 && (
                <div
                  {...(contentLeft?.$?.cards)}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6"
                >
                  {contentLeft.cards.map((card, cardIdx) => {
                    const cardTag = card.tag || card.title;
                    const cardText = card.text || card.description;

                    return (
                      <div
                        key={card._metadata?.uid || `left-card-${cardIdx}`}
                        className="flex flex-col h-full"
                      >
                        {card.image?.url && (
                          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm bg-gray-100">
                            <Image
                              src={card.image.url}
                              alt={card.image.title || cardTag || "Image"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                              {...(card.image?.$ && card.image?.$.url)}
                            />
                          </div>
                        )}

                        {cardTag && (
                          <div className="mb-3">
                            <span
                              {...(card?.$ && (card?.$.tag || card?.$.title))}
                              className="inline-block px-3 py-1 bg-white border border-gray-200/90 rounded-lg text-xs font-mono font-medium text-gray-800 shadow-2xs"
                            >
                              {cardTag}
                            </span>
                          </div>
                        )}

                        {cardText && (
                          <p
                            {...(card?.$ && (card?.$.text || card?.$.description))}
                            className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line"
                          >
                            {cardText}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={rightCol}>
          {contentRight && (
            <div className="space-y-4">
              {contentRight.label_right && (
                <span
                  {...(contentRight?.$?.label_right)}
                  className="text-xs font-bold tracking-widest text-[#f05a46] uppercase mb-2 block"
                >
                  {contentRight.label_right}
                </span>
              )}

              {contentRight.title_h1r && (
                <h1
                  {...(contentRight?.$?.title_h1r)}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4"
                >
                  {contentRight.title_h1r}
                </h1>
              )}

              {contentRight.text_right && (
                <div
                  {...(contentRight?.$?.text_right)}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(contentRight.text_right),
                  }}
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                />
              )}

              {contentRight.image_right?.url && (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-gray-100 mt-4">
                  <Image
                    src={contentRight.image_right.url}
                    alt={contentRight.image_right.title || contentRight.title_h1r || "Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    {...(contentRight.image_right?.$?.url || contentRight?.$?.image_right)}
                  />
                </div>
              )}

              {contentRight.quote_right && (
                <blockquote
                  {...(contentRight?.$?.quote_right)}
                  className="border-l-2 border-[#f05a46] pl-4 py-1 italic text-lg sm:text-xl font-serif text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(contentRight.quote_right),
                  }}
                />
              )}

              {contentRight.text_right_extended && (
                <div
                  {...(contentRight?.$?.text_right_extended)}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(contentRight.text_right_extended),
                  }}
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                />
              )}

              {contentRight.button_right?.href && contentRight.button_right?.title && (
                <div className="pt-2">
                  <Link
                    href={contentRight.button_right.href}
                    {...(contentRight?.$?.button_right)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1b1f24] hover:bg-black text-white text-sm font-semibold rounded-xl shadow-sm transition duration-200"
                  >
                    <span>{contentRight.button_right.title}</span>
                  </Link>
                </div>
              )}

              {/* Cards grid (Multiple) */}
              {contentRight.cards && contentRight.cards.length > 0 && (
                <div
                  {...(contentRight?.$?.cards)}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6"
                >
                  {contentRight.cards.map((card, cardIdx) => {
                    const cardTag = card.tag || card.title;
                    const cardText = card.text || card.description;

                    return (
                      <div
                        key={card._metadata?.uid || `right-card-${cardIdx}`}
                        className="flex flex-col h-full"
                      >
                        {card.image?.url && (
                          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm bg-gray-100">
                            <Image
                              src={card.image.url}
                              alt={card.image.title || cardTag || "Image"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                              {...(card.image?.$ && card.image?.$.url)}
                            />
                          </div>
                        )}

                        {cardTag && (
                          <div className="mb-3">
                            <span
                              {...(card?.$ && (card?.$.tag || card?.$.title))}
                              className="inline-block px-3 py-1 bg-white border border-gray-200/90 rounded-lg text-xs font-mono font-medium text-gray-800 shadow-2xs"
                            >
                              {cardTag}
                            </span>
                          </div>
                        )}

                        {cardText && (
                          <p
                            {...(card?.$ && (card?.$.text || card?.$.description))}
                            className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line"
                          >
                            {cardText}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}