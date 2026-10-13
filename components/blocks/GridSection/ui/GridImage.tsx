import React from "react";
import Image from "next/image";

export interface GridImageProps {
  src?: string;
  alt?: string;
  aspect?: string;
  className?: string;
  cslp?: Record<string, any>;
}

export default function GridImage({
  src,
  alt = "Image",
  aspect = "aspect-[4/3]",
  className = "",
  cslp,
}: GridImageProps) {
  if (!src) return null;

  return (
    <div
      className={`relative w-full ${aspect} rounded-2xl overflow-hidden shadow-sm bg-gray-100 mt-4 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        {...cslp}
      />
    </div>
  );
}
