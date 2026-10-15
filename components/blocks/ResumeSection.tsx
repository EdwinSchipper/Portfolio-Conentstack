import React from "react";
import DOMPurify from "isomorphic-dompurify";
import {
  ResumeSectionBlock,
  ExperienceCompany,
  ExperienceRole,
  CSLPAttribute,
} from "@/lib/types";
import { Label, Button } from "@/components/ui";
import { getContainerClass, getColorModeClass, colSpans } from "@/lib/layout";

// ============================================================================
// CONSTANTS & UTILITIES
// ============================================================================

/**
 * Returns the first letter of a company name to render as an avatar monogram.
 */
function getInitial(name?: string): string {
  if (!name) return "•";
  return name.trim().charAt(0).toUpperCase();
}

/**
 * Robust extractor for tech stack tags from Contentstack payloads.
 * Handles nested objects, repeatable tags, and ignores label/title keys.
 */
export function extractStackTags(stackData: any): string[] {
  if (!stackData) return [];
  const results: string[] = [];

  const addTag = (val: any) => {
    if (val === null || val === undefined) return;
    if (typeof val === "string") {
      const trimmed = val.trim();
      if (trimmed) results.push(trimmed);
    } else if (Array.isArray(val)) {
      val.forEach(addTag);
    } else if (typeof val === "object") {
      const tagVal = val.tag ?? val.Tag ?? val.name ?? val.value ?? val.title;
      if (tagVal !== undefined) {
        addTag(tagVal);
      }
    }
  };

  if (Array.isArray(stackData)) {
    stackData.forEach(addTag);
  } else if (typeof stackData === "object") {
    const rawTags =
      stackData.tag ??
      stackData.Tag ??
      stackData.tags ??
      stackData.Tags ??
      stackData.items;

    if (rawTags !== undefined) {
      addTag(rawTags);
    } else {
      Object.entries(stackData).forEach(([key, val]) => {
        const lowerKey = key.toLowerCase();
        if (
          !lowerKey.includes("label") &&
          !lowerKey.includes("title") &&
          !key.startsWith("_") &&
          key !== "$"
        ) {
          addTag(val);
        }
      });
    }
  } else if (typeof stackData === "string") {
    addTag(stackData);
  }

  return results;
}

// ============================================================================
// PROPS INTERFACES
// ============================================================================

export interface ResumeSectionProps {
  data?: ResumeSectionBlock;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  leftColSpan?: number | string;
  rightColSpan?: number | string;
  timelinePosition?: "left" | "right" | "full" | string;
  className?: string;
  children?: React.ReactNode;
}

export interface ResumeStackBlockProps {
  tags?: string[];
  label?: string;
  title?: string;
  labelCslp?: Record<string, any>;
  titleCslp?: Record<string, any>;
  meta?: Record<string, any>;
  className?: string;
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Renders individual pill badge tags with Cascadia Mono styling and micro-interactions.
 */
export function ResumeStackTags({
  tags = [],
  meta,
  className = "",
}: {
  tags: string[];
  meta?: Record<string, any>;
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;

  return (
    <div
      {...(meta && (meta.stack || meta.Stack))}
      className={`flex flex-wrap gap-2.5 sm:gap-3.5 ${className}`}
    >
      {tags.map((tag, idx) => (
        <span
          key={`${tag}-${idx}`}
          className="badge-item inline-flex items-center justify-center whitespace-nowrap w-fit border rounded-lg font-playfull text-xs sm:text-[13px] border-border-100 dark:border-border-200 text-title-100 dark:text-title-200 bg-background-200 dark:bg-background-900 px-4 py-2.5 hover:border-accent7-900/40 dark:hover:border-accent8-900/40 hover:-translate-y-0.5 transition-all duration-150 shadow-2xs select-none"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/**
 * Consolidated Stack Block pairing a section divider, optional overline label,
 * optional title, and the tag pill cloud.
 */
export function ResumeStackBlock({
  tags = [],
  label,
  title,
  labelCslp,
  titleCslp,
  meta,
  className = "",
}: ResumeStackBlockProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div
      className={`pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-border-100/50 dark:border-border-200/40 space-y-4 ${className}`}
    >
      {label && (
        <div>
          <Label variant="brand" cslp={labelCslp}>
            {label}
          </Label>
        </div>
      )}
      {title && (
        <h3
          className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 tracking-tight font-content"
          {...titleCslp}
        >
          {title}
        </h3>
      )}
      <ResumeStackTags tags={tags} meta={meta} />
    </div>
  );
}

/**
 * Renders the list of companies, roles, and dates in the timeline format.
 */
export function ExperienceTimelineList({
  companies = [],
  sectionTitle,
  meta,
}: {
  companies: ExperienceCompany[];
  sectionTitle?: string;
  meta?: Record<string, any>;
}) {
  return (
    <div className="w-full">
      {/* Optional Subtitle for the Timeline itself */}
      {sectionTitle && (
        <div className="mb-10">
          <h3
            className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 tracking-tight font-content"
            {...(meta && meta.section_title)}
          >
            {sectionTitle}
          </h3>
        </div>
      )}

      {/* Companies Timeline */}
      <div className="space-y-12">
        {companies.map((company, cIdx) => {
          const rawRoles = company.roles || (company as any).Roles;
          const roles: ExperienceRole[] = Array.isArray(rawRoles)
            ? rawRoles
            : rawRoles
              ? [rawRoles]
              : [];
          const coreRoles = roles.filter(
            (r) => (r.role_type || (r as any).roleType || "").toLowerCase() !== "secondary"
          );
          const secondaryRoles = roles.filter(
            (r) => (r.role_type || (r as any).roleType || "").toLowerCase() === "secondary"
          );

          // If all roles happen to be secondary, fall back gracefully
          const displayCoreRoles =
            coreRoles.length > 0
              ? coreRoles
              : secondaryRoles.length === 0
                ? roles
                : [];
          const displaySecondaryRoles =
            coreRoles.length > 0 ? secondaryRoles : [];

          return (
            <div
              key={company._metadata?.uid || `company-${cIdx}`}
              className="relative pl-12 md:pl-20 pb-12 last:pb-0"
            >
              {/* Vertical timeline line connecting nodes down this company */}
              {roles.length > 0 && (
                <div
                  aria-hidden="true"
                  className="absolute left-6 md:left-8 top-14 md:top-18 bottom-4 w-[2px] bg-accent7-300 dark:bg-accent8-300 -translate-x-1/2 pointer-events-none"
                />
              )}

              {/* Company Logo Monogram Box */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200 shadow-sm flex items-center justify-center font-playfull font-black text-2xl md:text-3xl text-title-100 dark:text-title-200 select-none z-10"
              >
                {getInitial(company.company_name)}
              </div>

              {/* Company Header */}
              <div className="mb-6 pt-1 md:pt-2">
                {company.company_name && (
                  <h4
                    className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 tracking-tight"
                    {...(company?.$ && company?.$.company_name)}
                  >
                    {company.company_name}
                  </h4>
                )}
                {company.company_period && (
                  <p
                    className="text-smallM md:text-small font-semibold text-accent7-900 dark:text-accent8-900 font-playfull mt-1"
                    {...(company?.$ && company?.$.company_period)}
                  >
                    {company.company_period}
                  </p>
                )}
              </div>

              {/* Roles Content */}
              <div className="space-y-6">
                {/* Core / Primary Roles */}
                {displayCoreRoles.map((role, rIdx) => {
                  const hasSecondary = displaySecondaryRoles.length > 0;
                  const isCard = Boolean(role.badge) || hasSecondary;

                  return (
                    <div
                      key={role._metadata?.uid || `core-role-${rIdx}`}
                      className="relative"
                    >
                      {/* Timeline node circle */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-6 md:-left-12 top-2.5 w-3.5 h-3.5 rounded-full border-2 border-accent7-900 dark:border-accent8-900 bg-background-100 dark:bg-background-800 -translate-x-1/2 z-10"
                      />

                      {isCard ? (
                        /* Prominent Primary Role Card */
                        <div className="bg-background-200 dark:bg-background-900 rounded-2xl border border-border-100 dark:border-border-200 p-6 md:p-8 shadow-sm hover:shadow-md transition duration-200">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                            {role.title && (
                              <h5
                                className="text-title_4M sm:text-title_4 font-bold text-title-100 dark:text-title-200"
                                {...(role?.$ && role?.$.title)}
                              >
                                {role.title}
                              </h5>
                            )}
                            {role.badge && (
                              <Label
                                variant="pill"
                                cslp={role?.$ && role?.$.badge}
                              >
                                {role.badge}
                              </Label>
                            )}
                          </div>

                          {role.period && (
                            <p
                              className="text-smallM md:text-small font-semibold text-accent7-900 dark:text-accent8-900 font-playfull mb-3"
                              {...(role?.$ && role?.$.period)}
                            >
                              {role.period}
                            </p>
                          )}

                          {role.description && (
                            <p
                              className="text-mediumM sm:text-small text-content-100 dark:text-content-200 leading-relaxed whitespace-pre-line"
                              {...(role?.$ && role?.$.description)}
                            >
                              {role.description}
                            </p>
                          )}
                        </div>
                      ) : (
                        /* Minimalist Single Role (e.g. Freelance style) */
                        <div className="max-w-3xl">
                          {role.title && (
                            <h5
                              className="text-title_4M sm:text-title_4 font-bold text-title-100 dark:text-title-200"
                              {...(role?.$ && role?.$.title)}
                            >
                              {role.title}
                            </h5>
                          )}
                          {role.period && (
                            <p
                              className="text-smallM md:text-small font-semibold text-accent7-900 dark:text-accent8-900 font-playfull mt-0.5 mb-2"
                              {...(role?.$ && role?.$.period)}
                            >
                              {role.period}
                            </p>
                          )}
                          {role.description && (
                            <p
                              className="text-mediumM sm:text-small text-content-100 dark:text-content-200 leading-relaxed whitespace-pre-line"
                              {...(role?.$ && role?.$.description)}
                            >
                              {role.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Secondary Roles / Aanvullende Disciplines */}
                {displaySecondaryRoles.length > 0 && (
                  <div className="relative pt-4">
                    {/* Timeline node for the secondary disciplines section */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-6 md:-left-12 top-6 w-3.5 h-3.5 rounded-full border-2 border-accent7-900 dark:border-accent8-900 bg-background-100 dark:bg-background-800 -translate-x-1/2 z-10"
                    />

                    <h5 className="text-noteM md:text-note font-bold tracking-wider text-content-300 dark:text-content-300 uppercase mb-4">
                      Aanvullende Disciplines
                    </h5>

                    {/* Responsive Grid for Secondary Roles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {displaySecondaryRoles.map((secRole, sIdx) => (
                        <div
                          key={secRole._metadata?.uid || `sec-role-${sIdx}`}
                          className="bg-background-200 dark:bg-background-900 rounded-2xl border border-border-100 dark:border-border-200 p-5 md:p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col"
                        >
                          {secRole.title && (
                            <h6
                              className="text-title_5M sm:text-title_5 font-bold text-title-100 dark:text-title-200 mb-1"
                              {...(secRole?.$ && secRole?.$.title)}
                            >
                              {secRole.title}
                            </h6>
                          )}

                          {secRole.period && (
                            <p
                              className="text-smallM md:text-small font-semibold text-accent7-900 dark:text-accent8-900 font-playfull mb-3"
                              {...(secRole?.$ && secRole?.$.period)}
                            >
                              {secRole.period}
                            </p>
                          )}

                          {secRole.description && (
                            <p
                              className="text-smallM md:text-small text-content-100 dark:text-content-200 leading-relaxed whitespace-pre-line"
                              {...(secRole?.$ && secRole?.$.description)}
                            >
                              {secRole.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ResumeSection: 2-column modular grid section pairing an intro sidebar with an interactive timeline or stack tags.
 * Supports flexible timeline placement ("right", "left", or "full"), container widths, color modes, and sticky scrolling.
 */
export default function ResumeSection({
  data,
  previewAttr,
  width,
  colorMode,
  leftColSpan,
  rightColSpan,
  timelinePosition,
  className = "",
  children,
}: ResumeSectionProps) {
  // Normalize nested block data
  const sectionData: ResumeSectionBlock = (data?.resume_section ||
    data?.Resume_Section ||
    data?.ResumeSection ||
    data?.grid_section_resume ||
    data?.experience_timeline ||
    data) as ResumeSectionBlock;

  // Layout Tokens
  const rawWidth = width || sectionData?.container_width || sectionData?.width;
  const containerClass = getContainerClass(rawWidth, "large");

  const colorModeKey = colorMode || sectionData?.color_mode;
  const colorModeClass = getColorModeClass(colorModeKey);

  // Raw Content Extraction
  const rawPosition = (
    timelinePosition ||
    sectionData?.timeline_position ||
    sectionData?.timeline_placement ||
    ""
  )
    .trim()
    .toLowerCase();

  const isPositionFull =
    rawPosition === "full" ||
    rawPosition === "center" ||
    rawPosition === "full width" ||
    rawPosition === "volledig";

  const isTimelineLeft = rawPosition === "left" || rawPosition === "links";

  const rawCompanies =
    sectionData?.companies || (sectionData as any)?.Companies;
  const companies: ExperienceCompany[] = Array.isArray(rawCompanies)
    ? rawCompanies
    : rawCompanies
      ? [rawCompanies]
      : [];

  const rawStack = sectionData?.stack || (sectionData as any)?.Stack;
  const tags = extractStackTags(rawStack);
  const hasStack = tags.length > 0;

  const stackLabel =
    (typeof rawStack === "object" && !Array.isArray(rawStack)
      ? rawStack?.stack_label || rawStack?.Stack_label || rawStack?.stackLabel || rawStack?.label
      : undefined) ||
    sectionData?.stack_label ||
    (sectionData as any)?.Stack_label ||
    (sectionData as any)?.stackLabel;

  const stackLabelCslp =
    (typeof rawStack === "object" &&
      rawStack?.$ &&
      (rawStack.$.stack_label || rawStack.$.Stack_label || rawStack.$.stackLabel || rawStack.$.label)) ||
    sectionData?.$?.stack_label ||
    sectionData?.$?.["stack.stack_label"];

  const stackTitle =
    (typeof rawStack === "object" && !Array.isArray(rawStack)
      ? rawStack?.stack_title || rawStack?.Stack_title || rawStack?.stackTitle || rawStack?.title
      : undefined) ||
    sectionData?.stack_title ||
    (sectionData as any)?.Stack_title ||
    (sectionData as any)?.stackTitle;

  const stackTitleCslp =
    (typeof rawStack === "object" &&
      rawStack?.$ &&
      (rawStack.$.stack_title || rawStack.$.Stack_title || rawStack.$.stackTitle || rawStack.$.title)) ||
    sectionData?.$?.stack_title ||
    sectionData?.$?.["stack.stack_title"];

  const label = sectionData?.label || sectionData?.section_label;
  const title = sectionData?.title || sectionData?.section_title_main;
  const description =
    sectionData?.description || sectionData?.text || sectionData?.intro;
  const button = sectionData?.button || sectionData?.button_cta;
  const buttonHref = button?.href || (button as any)?.url;
  const buttonTitle = button?.title || (button as any)?.text;

  const timelineSubtitle = sectionData?.section_title;
  const meta = sectionData?.$;

  const hasIntroContent = Boolean(
    label || title || description || (buttonHref && buttonTitle)
  );

  // Full-width applies if explicitly configured or if single-column without column split
  const isFullWidth =
    isPositionFull ||
    (!rawPosition &&
      companies.length === 0 &&
      !sectionData?.left_col_span &&
      !sectionData?.right_col_span) ||
    !hasIntroContent;

  const isHtml =
    typeof description === "string" && /<[a-z][\s\S]*>/i.test(description);

  // Custom children wrapper override
  if (children) {
    return (
      <section
        {...previewAttr}
        data-color-mode={colorModeKey}
        className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass} ${className}`}
      >
        <div className={`mx-auto px-10 sm:px-14 lg:px-12 md:px-20 ${containerClass}`}>
          {children}
        </div>
      </section>
    );
  }

  // 1. Full-width / Centered Layout
  if (isFullWidth) {
    return (
      <section
        {...previewAttr}
        data-color-mode={colorModeKey}
        className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass} ${className}`}
      >
        <div className={`mx-auto px-10 sm:px-14 lg:px-12 md:px-20 ${containerClass}`}>
          <div className="w-full">
            {label && (
              <div className="mb-3">
                <Label variant="brand" cslp={meta && meta.label}>
                  {label}
                </Label>
              </div>
            )}
            {title && (
              <h2
                className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 tracking-tight font-content mb-8 sm:mb-10"
                {...(meta && meta.title)}
              >
                {title}
              </h2>
            )}
            {description && (
              <div
                {...(meta && (meta.description || meta.text))}
                className="text-baseM sm:text-base text-content-100 dark:text-content-200 mb-8 font-content max-w-3xl"
              >
                {isHtml ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(description),
                    }}
                  />
                ) : (
                  <p className="whitespace-pre-line">{description}</p>
                )}
              </div>
            )}
            {buttonHref && buttonTitle && (
              <div className="mb-8">
                <Button
                  href={buttonHref}
                  variant="primary"
                  cslp={meta && meta.button}
                >
                  {buttonTitle}
                </Button>
              </div>
            )}
            {hasStack && (
              <ResumeStackBlock
                tags={tags}
                label={stackLabel}
                title={stackTitle}
                labelCslp={stackLabelCslp}
                titleCslp={stackTitleCslp}
                meta={meta}
                className={companies.length > 0 ? "mb-12" : ""}
              />
            )}
            {companies.length > 0 && (
              <ExperienceTimelineList
                companies={companies}
                sectionTitle={timelineSubtitle}
                meta={meta}
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  // 2. Column Grid Layout (Intro Sidebar + Timeline)
  const rawLeftCol =
    leftColSpan ||
    sectionData?.left_col_span ||
    (sectionData as any)?.left_col ||
    (sectionData as any)?.leftCol;
  const rawRightCol =
    rightColSpan ||
    sectionData?.right_col_span ||
    (sectionData as any)?.right_col ||
    (sectionData as any)?.rightCol;

  const defaultLeft = isTimelineLeft ? "8" : "4";
  const defaultRight = isTimelineLeft ? "4" : "8";

  const leftSpanClass =
    colSpans[String(rawLeftCol || defaultLeft)] ||
    colSpans[defaultLeft] ||
    "col-span-12 lg:col-span-4";
  const rightSpanClass =
    colSpans[String(rawRightCol || defaultRight)] ||
    colSpans[defaultRight] ||
    "col-span-12 lg:col-span-8";

  const introColClass = isTimelineLeft
    ? `${rightSpanClass} order-1 lg:order-2`
    : `${leftSpanClass} order-1`;

  const timelineColClass = isTimelineLeft
    ? `${leftSpanClass} order-2 lg:order-1`
    : `${rightSpanClass} order-2`;

  return (
    <section
      {...previewAttr}
      data-color-mode={colorModeKey}
      className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass} ${className}`}
    >
      <div className={`mx-auto px-10 sm:px-14 lg:px-12 md:px-20 ${containerClass}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Intro / Sidebar Column */}
          <div className={introColClass}>
            <div className="lg:sticky lg:top-28 space-y-6">
              {label && (
                <div>
                  <Label variant="brand" cslp={meta && meta.label}>
                    {label}
                  </Label>
                </div>
              )}

              {title && (
                <h2
                  className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 tracking-tight font-content text-balance"
                  {...(meta && meta.title)}
                >
                  {title}
                </h2>
              )}

              {description && (
                <div
                  {...(meta && (meta.description || meta.text))}
                  className="text-baseM sm:text-base text-content-100 dark:text-content-200 font-normal leading-relaxed text-pretty font-content"
                >
                  {isHtml ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(description),
                      }}
                    />
                  ) : (
                    <p className="whitespace-pre-line">{description}</p>
                  )}
                </div>
              )}

              {buttonHref && buttonTitle && (
                <div className="pt-2">
                  <Button
                    href={buttonHref}
                    variant="primary"
                    cslp={meta && meta.button}
                  >
                    {buttonTitle}
                  </Button>
                </div>
              )}

              {hasStack && (
                <ResumeStackBlock
                  tags={tags}
                  label={stackLabel}
                  title={stackTitle}
                  labelCslp={stackLabelCslp}
                  titleCslp={stackTitleCslp}
                  meta={meta}
                />
              )}
            </div>
          </div>

          {/* Timeline / Content Column */}
          <div className={timelineColClass}>
            {companies.length > 0 && (
              <ExperienceTimelineList
                companies={companies}
                sectionTitle={timelineSubtitle}
                meta={meta}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

ResumeSection.Timeline = ExperienceTimelineList;
ResumeSection.StackBlock = ResumeStackBlock;
ResumeSection.StackTags = ResumeStackTags;
