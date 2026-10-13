import Image from "next/image";
import Link from "next/link";
import { CardSectionBlock, CSLPAttribute } from "@/lib/types";

/** Container widths - Contentstack (Mobile-first). */
const containerWidths: Record<string, string> = {
  small: "max-w-4xl",
  default: "max-w-4xl xl:max-w-5xl",
  large: "max-w-7xl",
  wide: "container",
};

/** Color modes - Contentstack (Default of Alt achtergrond). */
const colorModes: Record<string, string> = {
  default: "bg-transparent",
  alt: "bg-white py-16 md:py-24",
};

/** Column grids. */
const colGrids: Record<string, string> = {
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

interface CardSectionProps {
  data: CardSectionBlock;
  previewAttr?: CSLPAttribute;
}

/**
 * CardSection renders a unified section containing multiple cards in a responsive grid,
 * controlled by container width, background color mode, and column count.
 */
export default function CardSection({ data, previewAttr }: CardSectionProps) {
  const rawWidth = (data?.width || data?.container_width || "large").toLowerCase();
  const containerClass =
    containerWidths[rawWidth] ??
    containerWidths.large;

  const colorModeKey = data?.color_mode?.toLowerCase() ?? "default";
  const colorModeClass = colorModes[colorModeKey] ?? colorModes.default;

  const colVal = String(data?.columns || "").match(/[234]/)?.[0] || "3";
  const colGridClass = colGrids[colVal] ?? colGrids["3"];

  const cards = data?.cards || [];

  return (
    <section
      {...previewAttr}
      data-color-mode={colorModeKey}
      className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass}`}
    >
      <div className={`mx-auto px-6 sm:px-10 lg:px-12 ${containerClass}`}>
        {/* Optional Section Header */}
        {(data?.label_cards || data?.label || data?.section_title || data?.section_intro) && (
          <div className="mb-10 md:mb-14 max-w-3xl">
            {(data.label_cards || data.label) && (
              <span
                {...(data?.$ && (data?.$.label_cards || data?.$.label))}
                className="text-xs font-bold tracking-widest text-[#f05a46] uppercase mb-2 block"
              >
                {data.label_cards || data.label}
              </span>
            )}
            {data.section_title && (
              <h2
                {...(data?.$ && data?.$.section_title)}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3"
              >
                {data.section_title}
              </h2>
            )}
            {data.section_intro && (
              <p
                {...(data?.$ && data?.$.section_intro)}
                className="text-base sm:text-lg text-gray-600 leading-relaxed whitespace-pre-line"
              >
                {data.section_intro}
              </p>
            )}
          </div>
        )}

        {/* Cards Grid */}
        {cards.length > 0 && (
          <div
            {...(data?.$ && data?.$.cards)}
            className={`grid ${colGridClass} gap-8 items-stretch`}
          >
            {cards.map((card, idx) => {
              const cardTag = card.tag || card.title;
              const cardText = card.text || card.description;
              const isDefaultBox =
                card.card_variant?.toLowerCase() === "default" &&
                !card.image?.url;

              // Variant: Default (witte boxed kaart)
              if (isDefaultBox) {
                return (
                  <div
                    key={card._metadata?.uid || `card-${idx}`}
                    className="flex flex-col h-full p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition duration-200"
                  >
                    {cardTag && (
                      <h3
                        {...(card?.$ && (card?.$.tag || card?.$.title))}
                        className="text-xl font-bold text-gray-900 mb-2"
                      >
                        {cardTag}
                      </h3>
                    )}
                    {cardText && (
                      <p
                        {...(card?.$ && (card?.$.text || card?.$.description))}
                        className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line grow"
                      >
                        {cardText}
                      </p>
                    )}
                    {card.button?.href && (
                      <div className="pt-4 mt-auto">
                        <Link
                          href={card.button.href}
                          {...(card?.$ && card?.$.button)}
                          className="inline-flex items-center text-sm font-semibold text-black hover:text-[#f05a46] transition-colors"
                        >
                          <span>{card.button.title || "Lees meer"}</span>
                          <span className="ml-1">→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              // Variant: Image Tag (afgeronde foto + monospace pill badge + tekst)
              return (
                <div
                  key={card._metadata?.uid || `card-${idx}`}
                  className="flex flex-col h-full group"
                >
                  {/* Foto met rounded corners */}
                  {card.image?.url && (
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm bg-gray-100">
                      <Image
                        src={card.image.url}
                        alt={card.image.title || cardTag || "Card image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        {...(card.image?.$ && card.image?.$.url)}
                      />
                    </div>
                  )}

                  {/* Badge / Tag */}
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

                  {/* Omschrijving */}
                  {cardText && (
                    <p
                      {...(card?.$ && (card?.$.text || card?.$.description))}
                      className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line grow"
                    >
                      {cardText}
                    </p>
                  )}

                  {/* Optionele button / link */}
                  {card.button?.href && (
                    <div className="pt-3 mt-auto">
                      <Link
                        href={card.button.href}
                        {...(card?.$ && card?.$.button)}
                        className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#f05a46] hover:underline"
                      >
                        <span>{card.button.title || "Lees meer"}</span>
                        <span className="ml-1">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
