import {
  ExperienceTimelineBlock as ExperienceTimelineBlockType,
  CSLPAttribute,
} from "@/lib/types";

interface ExperienceTimelineBlockProps {
  data: ExperienceTimelineBlockType;
  previewAttr?: CSLPAttribute;
}

/**
 * Returns the first letter of a company name to render as an avatar monogram.
 */
function getInitial(name?: string): string {
  if (!name) return "•";
  return name.trim().charAt(0).toUpperCase();
}

export default function ExperienceTimelineBlock({
  data,
  previewAttr,
}: ExperienceTimelineBlockProps) {
  // Gracefully support both direct properties and nested modular block instances
  const timelineData: ExperienceTimelineBlockType =
    data.companies || data.section_title
      ? data
      : Array.isArray(data.experience_timeline)
      ? data.experience_timeline[0]?.experience_timeline ||
        data.experience_timeline[0] ||
        data
      : data.experience_timeline || data;

  const companies = timelineData.companies || [];

  return (
    <section {...previewAttr} className="col-span-full py-8">
      {/* Optional Section Title */}
      {timelineData.section_title && (
        <div className="mb-10">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
            {...((timelineData?.$ && timelineData?.$.section_title) ||
              (data?.$ && data?.$.section_title))}
          >
            {timelineData.section_title}
          </h2>
        </div>
      )}

      {/* Companies Timeline */}
      <div className="space-y-12">
        {companies.map((company, cIdx) => {
          const roles = company.roles || [];
          const coreRoles = roles.filter(
            (r) => (r.role_type || "").toLowerCase() !== "secondary"
          );
          const secondaryRoles = roles.filter(
            (r) => (r.role_type || "").toLowerCase() === "secondary"
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
                  className="absolute left-6 md:left-8 top-14 md:top-18 bottom-4 w-[2px] bg-rose-200 -translate-x-1/2 pointer-events-none"
                />
              )}

              {/* Company Logo Monogram Box */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center font-black text-2xl md:text-3xl text-gray-900 select-none z-10"
              >
                {getInitial(company.company_name)}
              </div>

              {/* Company Header */}
              <div className="mb-6 pt-1 md:pt-2">
                {company.company_name && (
                  <h3
                    className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight"
                    {...(company?.$ && company?.$.company_name)}
                  >
                    {company.company_name}
                  </h3>
                )}
                {company.company_period && (
                  <p
                    className="text-sm md:text-base font-semibold text-[#f05a46] mt-1"
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
                        className="absolute -left-6 md:-left-12 top-2.5 w-3.5 h-3.5 rounded-full border-2 border-[#f05a46] bg-white -translate-x-1/2 z-10"
                      />

                      {isCard ? (
                        /* Prominent Primary Role Card */
                        <div className="bg-white rounded-2xl border border-gray-200/90 p-6 md:p-8 shadow-sm hover:shadow-md transition duration-200">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                            {role.title && (
                              <h4
                                className="text-xl md:text-2xl font-bold text-gray-900"
                                {...(role?.$ && role?.$.title)}
                              >
                                {role.title}
                              </h4>
                            )}
                            {role.badge && (
                              <span
                                className="px-3.5 py-1 text-xs md:text-sm font-semibold text-[#f05a46] bg-[#fff1ef] border border-[#fddbd6] rounded-full whitespace-nowrap"
                                {...(role?.$ && role?.$.badge)}
                              >
                                {role.badge}
                              </span>
                            )}
                          </div>

                          {role.period && (
                            <p
                              className="text-sm md:text-base font-semibold text-[#f05a46] mb-3"
                              {...(role?.$ && role?.$.period)}
                            >
                              {role.period}
                            </p>
                          )}

                          {role.description && (
                            <p
                              className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line"
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
                            <h4
                              className="text-lg md:text-xl font-bold text-gray-900"
                              {...(role?.$ && role?.$.title)}
                            >
                              {role.title}
                            </h4>
                          )}
                          {role.period && (
                            <p
                              className="text-sm font-semibold text-[#f05a46] mt-0.5 mb-2"
                              {...(role?.$ && role?.$.period)}
                            >
                              {role.period}
                            </p>
                          )}
                          {role.description && (
                            <p
                              className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line"
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
                      className="absolute -left-6 md:-left-12 top-6 w-3.5 h-3.5 rounded-full border-2 border-[#f05a46] bg-white -translate-x-1/2 z-10"
                    />

                    <h4 className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-4">
                      Aanvullende Disciplines
                    </h4>

                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {displaySecondaryRoles.map((secRole, sIdx) => (
                        <div
                          key={secRole._metadata?.uid || `sec-role-${sIdx}`}
                          className="bg-white rounded-2xl border border-gray-200/90 p-5 md:p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col"
                        >
                          {secRole.title && (
                            <h5
                              className="text-base md:text-lg font-bold text-gray-900 mb-1"
                              {...(secRole?.$ && secRole?.$.title)}
                            >
                              {secRole.title}
                            </h5>
                          )}

                          {secRole.period && (
                            <p
                              className="text-xs md:text-sm font-semibold text-[#f05a46] mb-3"
                              {...(secRole?.$ && secRole?.$.period)}
                            >
                              {secRole.period}
                            </p>
                          )}

                          {secRole.description && (
                            <p
                              className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line"
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
    </section>
  );
}
