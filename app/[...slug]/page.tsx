/**
 * Dynamic Catch-All Route for Contentstack Pages
 * 
 * What it does:
 * - Catches any multi-segment or single-segment URL path (e.g., /over-ons, /portfolio/project-1).
 * - Queries Contentstack for an entry of content type 'page' matching that URL.
 * - Renders the page using SSR, handles 404s when an entry doesn't exist, and supports Live Preview.
 * 
 * How it works:
 * 1. Next.js App Router resolves dynamic URL parameters via `params` as a Promise.
 * 2. Joins slug array into an absolute path (e.g. ['portfolio', 'project-1'] -> '/portfolio/project-1').
 * 3. `getPage(path)` queries Contentstack SDK where the field 'url' equals the resolved path.
 * 4. If in preview mode, renders `<Preview />` with live listeners; otherwise renders static `<Page />`.
 */


import { getPage, isPreview } from "@/lib/contentstack"; // Importing Contentstack query function and preview mode flag
import Page from "@/components/Page"; // Importing the Page component to render static content
import Preview from "@/components/Preview"; // Importing the Preview component to handle real-time Live Preview updates
import { notFound } from "next/navigation"; // Importing Next.js official 404 navigation handler

// Ensure subpages always fetch fresh content from Contentstack in production
export const dynamic = "force-dynamic";

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  // Await the asynchronous params object (standard Next.js 15+ App Router)
  const { slug } = await params;

  // Reconstruct the URL path matching Contentstack's entry URL field (e.g., "/about")
  const path = `/${slug.join("/")}`;

  // Fetch the page entry from Contentstack by URL
  const page = await getPage(path);

  // Return a 404 page if no entry was found and we are not in preview mode
  if (!page && !isPreview) {
    notFound();
  }

  // In preview mode, render client Preview component to sync with Visual Builder
  if (isPreview) {
    return <Preview path={path} initialPage={page} />;
  }

  // Render the static page component
  return <Page page={page} />;
}

