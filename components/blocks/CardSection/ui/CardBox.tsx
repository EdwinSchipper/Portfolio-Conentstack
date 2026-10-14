import React from "react";
import Button from "@/components/ui/Button";

export interface CardBoxProps {
  title?: React.ReactNode;
  tag?: React.ReactNode;
  text?: React.ReactNode;
  button?: { href: string; title?: string };
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function CardBox({
  title,
  tag,
  text,
  button,
  children,
  className = "",
  cslp,
}: CardBoxProps) {
  // Support tags passed as string with "/" separators (e.g. "Componenten / Vue.js / Nuxt")
  const rawTag = tag;
  const tagList =
    typeof rawTag === "string"
      ? rawTag.split("/").map((t) => t.trim()).filter(Boolean)
      : null;

  return (
    <div
      {...cslp}
      className={`services-card h-fit md:h-full group relative overflow-hidden flex flex-col p-8 md:p-12 xl:p-14 bg-transparent border-0 rounded-none ${className} font-content`}
    >
      <div className="relative z-10 flex flex-col h-auto md:h-full">
        <div className="flex gap-5 sm:gap-8 flex-col w-full">

          { /*  Circle Icon */}
          <div className="service-icon sm:w-[70px] sm:h-[70px] w-[60px] h-[60px] shrink-0 rounded-full border-[6px] border-accent7-300 dark:border-accent8-300 bg-accent7-900 dark:bg-accent8-900 flex items-center justify-center">
            {/* <UIcon
						v-if="mainIcon"
						:name="mainIcon"
						class="w-7 h-7 text-accent7-100 dark:text-accent8-100"
					/> */}
            Ic
          </div>


          {/* Titel & Tags */}
          <div className="flex flex-col justify-center gap-y-5 md:gap-y-3 lg:gap-y-1.5">

            {title && (
              <h4
                {...(cslp && (cslp.card_title || cslp.title || cslp.tag))}
                className="service-title text-title_4M sm:text-title_4 font-semibold text-title-100 dark:text-title-200 text-pretty"
              >
                {title}
              </h4>
            )}

            {tagList && tagList.length > 0 && (
              <div
                {...(cslp && cslp.tag)}
                className="service-tags flex flex-wrap items-center gap-1.5 text-label_smallM sm:text-label_small text-content-300 dark:text-content-300 uppercase"
              >
                {tagList.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className="service-tag">{item}</span>
                    {idx < tagList.length - 1 && <span>/</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            {!tagList && tag && (
              <div
                {...(cslp && cslp.tag)}
                className="service-tags flex flex-wrap items-center gap-1.5 text-label_smallM sm:text-label_small text-content-300 dark:text-content-300 uppercase"
              >
                {tag}
              </div>
            )}
          </div>

          {/* Beschrijving */}
          {text && (
            <div
              {...(cslp && (cslp.text || cslp.description))}
              className="service-desc flex flex-col text-mediumM sm:text-small text-content-100 dark:text-content-200 font-content flex-grow text-pretty leading-relaxed"
            >
              <p>{text}</p>
            </div>
          )}

          {button?.href && (
            <div className="pt-2 mt-auto">
              <Button
                href={button.href}
                variant="link-dark"
                arrow
                cslp={cslp && cslp.button}
              >
                {button.title || "Lees meer"}
              </Button>
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
