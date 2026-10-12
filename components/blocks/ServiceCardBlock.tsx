import { ServiceCardBlock as ServiceCardBlockType, CSLPAttribute } from "@/lib/types";

interface ServiceCardBlockProps {
  data: ServiceCardBlockType;
  previewAttr?: CSLPAttribute;
}

export default function ServiceCardBlock({
  data,
  previewAttr,
}: ServiceCardBlockProps) {
  return (
    <div
      {...previewAttr}
      className="p-6 md:p-8 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition"
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
