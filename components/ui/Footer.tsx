import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Button, Label } from "@/components/ui";
import ColorModeSelector from "./ColorModeSelector";

export const contactLinks = [
  {
    label: "edwin.schipper@gmail.com",
    href: "mailto:edwin.schipper@gmail.com",
    ariaLabel: "Stuur een e-mail naar edwin.schipper@gmail.com",
    external: false,
  },
  {
    label: "+31 (0)6 - 17165391",
    href: "tel:+31617165391",
    ariaLabel: "Bel +31 6 17165391",
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/edwin-schipper/",
    ariaLabel: "Bekijk LinkedIn profiel",
    external: true,
  },
];

export const pageLinks = [
  { href: "/overmij", label: "Over mij" },
  { href: "/resume", label: "Curriculum Vitae" },
  { href: "/portfolio", label: "Portfolio" },
];

export const expertiseLinks = [
  { href: "/expertise/development", label: "Web Development" },
  { href: "/expertise/vormgeving", label: "Grafisch Vormgeving" },
  { href: "/expertise/ux", label: "UX & Webdesign" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-content relative z-10" aria-label="Site footer">
      <div className="md:px-20 lg:px-12 pb-0 lg:pb-12">
        <div className="bg-background-200 dark:bg-background-900 md:rounded-md border border-border-100/50 dark:border-border-200/50 py-14 md:py-20 px-10 md:px-20 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* CTA Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-14 md:pb-20">
              <div>
                <Label variant="brand">Laten we kennismaken</Label>
                <h2 className="text-title_1M md:text-title_1 font-content text-title-100 dark:text-title-200 font-bold max-w-3xl mt-8 md:mt-10">
                  Benieuwd wat ik{" "}
                  <span className="font-serif italic text-accent7-900 dark:text-accent8-900 font-medium">
                    voor jouw project
                  </span>{" "}
                  kan betekenen?
                </h2>
              </div>
              <div className="shrink-0 mt-8 md:mt-14 lg:mt-0">
                <Button
                  href="/contact"
                  variant="primary"
                  aria-label="Contact opnemen"
                  className="w-full sm:w-fit"
                >
                  Plan een kennismaking
                </Button>
              </div>
            </div>

            {/* Separator */}
            <div className="w-full h-[1px] bg-border-100 dark:bg-border-200 mb-14 md:mb-20" />

            {/* Nav Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Optional Brand Column (kept hidden as in original Nuxt template) */}
              <div className="lg:col-span-5 xl:col-span-5 flex-col gap-6 lg:gap-6 hidden">
                <Link href="/" className="inline-block" aria-label="Home">
                  <Image
                    className="hidden h-10 lg:h-10 w-auto dark:block"
                    src="/img/logo-white.svg"
                    alt="Edwin Schipper logo"
                    width={140}
                    height={40}
                  />
                  <Image
                    className="block h-10 lg:h-10 w-auto dark:hidden"
                    src="/img/logo-black.svg"
                    alt="Edwin Schipper logo"
                    width={140}
                    height={40}
                  />
                </Link>
                <p className="text-mediumM sm:text-medium text-content-100 dark:text-content-200 text-pretty font-normal max-w-sm leading-relaxed">
                  Geen gescheiden werelden, maar één vloeiend proces waarin design en code elkaar versterken. Ik zet twintig jaar ervaring in om jouw visie technisch en visueel te realiseren.
                </p>
              </div>

              {/* Navigation Columns */}
              <div className="lg:col-span-9 xl:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8 lg:gap-4">
                  {/* Expertise */}
                  <div>
                    <span className="block font-content text-accent7-900 dark:text-accent8-900 text-label_smallM md:text-label_small font-semibold tracking-wider uppercase mb-4 lg:mb-5">
                      Expertise
                    </span>
                    <nav aria-label="Footer expertise navigatie">
                      <ul className="space-y-2 text-mediumM lg:text-medium font-normal text-content-100 dark:text-content-200">
                        {expertiseLinks.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-title-100 dark:hover:text-title-200 hover:underline"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  {/* Pagina's */}
                  <div>
                    <span className="block font-content text-accent7-900 dark:text-accent8-900 text-label_smallM md:text-label_small font-semibold tracking-wider uppercase mb-4 lg:mb-5">
                      Pagina&apos;s
                    </span>
                    <nav aria-label="Footer navigatie">
                      <ul className="space-y-2 text-mediumM lg:text-medium font-normal text-content-100 dark:text-content-200">
                        {pageLinks.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-title-100 dark:hover:text-title-200 hover:underline"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  {/* Contact */}
                  <div>
                    <span className="block font-content text-accent7-900 dark:text-accent8-900 text-label_smallM md:text-label_small font-semibold tracking-wider uppercase mb-4 lg:mb-5">
                      Contact
                    </span>
                    <ul className="space-y-2 text-mediumM lg:text-medium font-normal text-content-100 dark:text-content-200">
                      {contactLinks.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-title-100 dark:hover:text-title-200 hover:underline"
                            aria-label={item.ariaLabel}
                          >
                            <span>{item.label}</span>
                            {item.external && (
                              <ArrowUpRightIcon className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-200" />
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border-100 dark:border-border-200 pt-6 lg:pt-10 flex flex-col lg:flex-row items-start lg:items-center justify-start gap-3 lg:gap-3 mt-14 md:mt-20">
              <div>
                <p className="text-noteM md:text-note text-content-100/70 dark:text-content-200/50 font-normal">
                  <span>© {currentYear} Edwin Schipper</span>
                  <span className="hidden sm:inline mx-1.5 text-border-100 dark:text-border-200" />
                </p>
              </div>

              <div>
                <p className="text-noteM md:text-note text-content-100/70 dark:text-content-200/50 font-normal">
                  <Link
                    href="/privacy"
                    className="font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline"
                  >
                    Privacy
                  </Link>
                </p>
              </div>

              <div>
                <p className="text-noteM md:text-note text-content-100/70 dark:text-content-200/50 font-normal">
                  <Link
                    href="/algemene-voorwaarden"
                    className="font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline"
                  >
                    Algemene Voorwaarden
                  </Link>
                </p>
              </div>

              <div>
                <p className="text-noteM md:text-note text-content-100/70 dark:text-content-200/50 font-normal text-balance">
                  <span className="hidden sm:inline mx-1.5 text-border-100 dark:text-border-200" />
                  Ontworpen in{" "}
                  <a
                    href="https://www.figma.com/nl-nl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline"
                  >
                    Figma
                  </a>
                  , gebouwd met{" "}
                  <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline"
                  >
                    Next.js
                  </a>{" "}
                  &amp;{" "}
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline"
                  >
                    Tailwind
                  </a>
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 lg:ml-auto">
                <a
                  href="https://github.com/EdwinSchipper"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profiel"
                  className="text-content-100/70 dark:text-content-200/50 hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                <ColorModeSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}