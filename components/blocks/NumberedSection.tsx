import Link from "next/link";
import { NumberedSectionBlock, CSLPAttribute } from "@/lib/types";

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
  "1": "grid-cols-1 max-w-3xl",
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

interface NumberedSectionProps {
  data: NumberedSectionBlock;
  previewAttr?: CSLPAttribute;
}

/**
 * Render label with special support for patterns like "02 — IMPACT" or "01 - VISIE":
 * Highlights the leading number in coral brand color (#f05a46), followed by a dash and the label.
 */
function renderLabelContent(rawLabel: string) {
  const match = rawLabel.match(/^(\d+)\s*[-—]\s*(.+)$/);
  if (match) {
    return (
      <span className="text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
        <span className="text-[#f05a46] font-mono">{match[1]}</span>
        <span className="text-gray-400">—</span>
        <span className="text-gray-700">{match[2]}</span>
      </span>
    );
  }
  return (
    <span className="text-xs font-bold tracking-widest text-[#f05a46] uppercase mb-4 block">
      {rawLabel}
    </span>
  );
}

/**
 * NumberedSection renders a clean, numbered list section with a label, prominent heading,
 * and numbered item cards in a 2-column or 3-column layout.
 */
export default function NumberedSection({
  data,
  previewAttr,
}: NumberedSectionProps) {
  const rawWidth = (data?.width || data?.container_width || "large").toLowerCase();
  const containerClass =
    containerWidths[rawWidth] ??
    containerWidths.large;

  const colorModeKey = data?.color_mode?.toLowerCase() ?? "default";
  const colorModeClass = colorModes[colorModeKey] ?? colorModes.default;

  // Extract columns (defaults to 2 for side-by-side list items)
  const colVal = String(data?.columns || "").match(/[123]/)?.[0] || "2";
  const colGridClass = colGrids[colVal] ?? colGrids["2"];

  const items = data?.items || data?.numbered_items || [];
  const rawLabel = data?.label || data?.section_label || data?.label_numbered;
  const sectionTitle = data?.section_title || data?.title;

  return (
    <section
      {...previewAttr}
      data-color-mode={colorModeKey}
      className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass}`}
    >
      <div className={`mx-auto px-6 sm:px-10 lg:px-12 ${containerClass}`}>
        {/* Section Header */}
        {(rawLabel || sectionTitle || data?.section_intro) && (
          <div className="mb-12 md:mb-16 max-w-3xl">
            {rawLabel && (
              <div
                {...(data?.$ &&
                  (data?.$.label ||
                    data?.$.section_label ||
                    data?.$.label_numbered))}
              >
                {renderLabelContent(rawLabel)}
              </div>
            )}
            {sectionTitle && (
              <h2
                {...(data?.$ && (data?.$.section_title || data?.$.title))}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4"
              >
                {sectionTitle}
              </h2>
            )}
            {data?.section_intro && (
              <p
                {...(data?.$ && data?.$.section_intro)}
                className="text-base sm:text-lg text-gray-600 leading-relaxed whitespace-pre-line"
              >
                {data.section_intro}
              </p>
            )}
          </div>
        )}

        {/* Numbered Items Grid */}
        {items.length > 0 && (
          <div
            {...(data?.$ && (data?.$.items || data?.$.numbered_items))}
            className={`grid ${colGridClass} gap-x-12 lg:gap-x-16 gap-y-10 md:gap-y-12 items-start`}
          >
            {items.map((item, idx) => {
              // Automatic zero-padded number (01, 02, etc.) or custom override
              const numStr = item.number
                ? String(item.number).padStart(2, "0")
                : String(idx + 1).padStart(2, "0");

              const itemTitle = item.title;
              const itemText = item.text || item.description;

              return (
                <div
                  key={item._metadata?.uid || `numbered-item-${idx}`}
                  className="flex items-start gap-4 sm:gap-5"
                >
                  {/* Number Badge */}
                  <div
                    {...(item?.$ && item?.$.number)}
                    className="shrink-0 flex items-center justify-center w-11 h-9 sm:w-12 sm:h-10 rounded-lg sm:rounded-xl bg-[#ededeb] text-gray-900 font-mono font-bold text-xs sm:text-sm tracking-tight select-none"
                  >
                    {numStr}
                  </div>

                  {/* Item Content */}
                  <div className="space-y-1.5 sm:space-y-2 grow">
                    {itemTitle && (
                      <h3
                        {...(item?.$ && item?.$.title)}
                        className="text-base sm:text-lg md:text-xl font-bold text-gray-900 tracking-tight"
                      >
                        {itemTitle}
                      </h3>
                    )}
                    {itemText && (
                      <p
                        {...(item?.$ && (item?.$.text || item?.$.description))}
                        className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line"
                      >
                        {itemText}
                      </p>
                    )}
                    {item.button?.href && (
                      <div className="pt-2">
                        <Link
                          href={item.button.href}
                          {...(item?.$ && item?.$.button)}
                          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#f05a46] hover:underline"
                        >
                          <span>{item.button.title || "Lees meer"}</span>
                          <span className="ml-1">→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
