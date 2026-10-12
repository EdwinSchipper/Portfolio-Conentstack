import Image from "next/image";
import Link from "next/link";
import { FeaturedProjectsBlock as FeaturedProjectsBlockType, CSLPAttribute } from "@/lib/types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface FeaturedProjectsBlockProps {
  data: FeaturedProjectsBlockType;
  previewAttr?: CSLPAttribute;
}

export default function FeaturedProjectsBlock({
  data,
  previewAttr,
}: FeaturedProjectsBlockProps) {
  const projects = data.projects || [];

  return (
    <section {...previewAttr} className="py-8">
      {/* Section Title */}
      {data.section_title && (
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
            {...(data?.$ && data?.$.section_title)}
          >
            {data.section_title}
          </h2>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const categories = Array.isArray(project.category)
              ? project.category
              : project.category
              ? [project.category]
              : [];

            return (
              <article
                key={project.uid || `project-${idx}`}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-300 transition duration-300"
              >
                {/* Image */}
                {project.featured_image?.url && (
                  <Link
                    href={project.url || "#"}
                    className="relative w-full h-52 overflow-hidden bg-gray-100 block"
                  >
                    <Image
                      src={project.featured_image.url}
                      alt={project.featured_image.title || project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {project.project_tag && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {project.project_tag}
                      </span>
                    )}
                    {categories.map((cat, catIdx) => (
                      <span
                        key={catIdx}
                        className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    <Link href={project.url || "#"}>
                      {project.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  {project.description && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  {/* Link action */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={project.url || "#"}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-700"
                    >
                      Bekijk project
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic">
          Nog geen projecten geselecteerd voor deze sectie.
        </p>
      )}
    </section>
  );
}
