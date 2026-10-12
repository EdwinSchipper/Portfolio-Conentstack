import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { Block, CSLPAttribute } from "@/lib/types";

interface ContentBlockProps {
  data: Block;
  previewAttr?: CSLPAttribute;
}

export default function ContentBlock({ data, previewAttr }: ContentBlockProps) {
  const isImageLeft = data.layout === "image_left";

  return (
    <div
      {...previewAttr}
      className={`col-span-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-white ${
        isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Image container */}
      <div className="w-full md:w-1/2">
        {data.image && (
          <Image
            src={data.image.url}
            alt={data.image.title}
            width={200}
            height={112}
            className="w-full"
            {...(data?.$ && data?.$.image)}
          />
        )}
      </div>

      {/* Content container */}
      <div className="w-full md:w-1/2 p-4">
        {data.title && (
          <h2
            className="text-2xl font-bold"
            {...(data?.$ && data?.$.title)}
          >
            {data.title}
          </h2>
        )}

        {data.copy && (
          <div
            {...(data?.$ && data?.$.copy)}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.copy),
            }}
            className="prose"
          />
        )}
      </div>
    </div>
  );
}
