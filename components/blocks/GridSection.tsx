import DOMPurify from "isomorphic-dompurify";
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

export default function GridSection({
  data,
  previewAttr,
}: {
  data: GridSectionBlock;
  previewAttr?: CSLPAttribute;
}) {
  const containerClass =
    containerWidths[data?.container_width?.toLowerCase() ?? "default"] ??
    containerWidths.default;
  const leftCol = colSpans[String(data?.left_col_span)] ?? colSpans["5"];
  const rightCol = colSpans[String(data?.right_col_span)] ?? colSpans["7"];

  const leftBlock = data?.modular_blocks?.find((b) => b.left_col_span)?.left_col_span;
  const rightBlock = data?.modular_blocks?.find((b) => b.right_col_span)?.right_col_span;

  return (
    <section {...previewAttr} className="col-span-full w-full mb-20 md:mb-40 lg:mb-40">
      <div
        className={`grid grid-cols-1 md:grid-cols-12 mx-auto z-20 ${containerClass} px-10 sm:px-14 lg:px-12 md:px-20 mb-16 gap-14 lg:gap-x-10 xl:gap-x-24`}
      >
        <div className={leftCol}>
          {leftBlock?.text_block_left && (
            <div
              {...(leftBlock?.$?.text_block_left)}
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(leftBlock.text_block_left),
              }}
            />
          )}
        </div>

        <div className={rightCol}>
          {rightBlock?.text_block_right && (
            <div
              {...(rightBlock?.$?.text_block_right)}
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(rightBlock.text_block_right),
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}