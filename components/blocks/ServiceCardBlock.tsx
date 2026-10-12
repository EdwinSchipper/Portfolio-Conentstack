import { ServiceCardBlock as ServiceCardBlockType, CSLPAttribute } from "@/lib/types";

interface ServiceCardBlockProps {
  data: ServiceCardBlockType;
  previewAttr?: CSLPAttribute;
}

/**
 * Maps Contentstack `grid_size` ('1', '2', '3') to Tailwind column span classes.
 * 1 = Full width (1 card per row)
 * 2 = Half width on medium+ screens (2 cards per row)
 * 3 = One-third width on medium+ screens (3 cards per row)
 */
function getGridColSpan(gridSize?: string): string {
  const size = String(gridSize || "").trim();
  switch (size) {
    case "1":
      return "col-span-full";
    case "2":
      return "col-span-full md:col-span-6";
    case "3":
      return "col-span-full md:col-span-4";
    default:
      return "col-span-full md:col-span-4";
  }
}

export default function ServiceCardBlock({
  data,
  previewAttr,
}: ServiceCardBlockProps) {
  const colSpanClass = getGridColSpan(data.grid_size);

  return (
    <div
      {...previewAttr}
      className={`flex flex-col h-full p-6 md:p-8 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition ${colSpanClass}`}
    >
      {data.card_title && (
        <h3
          className="text-2xl font-bold text-gray-900 mb-2"
          {...(data?.$ && data?.$.card_title)}
        >
          {data.card_title}
        </h3>
      )}

      {data.card_text && (
        <p
          className="text-gray-600 leading-relaxed whitespace-pre-line"
          {...(data?.$ && data?.$.card_text)}
        >
          {data.card_text}
        </p>
      )}
    </div>
  );
}
