import type { Metadata } from "next";
// Importing function to fetch homepage data and preview mode checker from Contentstack utilities
import { getHomePage, isPreview } from "@/lib/contentstack";
import { getHomePageMetadata } from "@/lib/metadata";
// Importing the HomePage component to render homepage content
import HomePage from "@/components/HomePage";
// Importing the Preview component to render live preview content
import Preview from "@/components/Preview";

// Ensure the page always fetches fresh content from Contentstack on production requests
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata();
}

// Home page component - serves as the main entry point for the application
// This is an async server component that can fetch data at build time or request time
export default async function Home() {
  // Fetch the entry on the server in both branches so the SSR'd HTML always
  // contains the real content. This is what makes browser Back navigation
  // restore the page correctly instead of a "Loading…" placeholder.
  const page = await getHomePage();

  // In preview mode, hand the entry to the client component so it can keep
  // syncing with the Visual Builder via the live-preview listener.
  if (isPreview) {
    return <Preview path="/" initialPage={page} isHome />;
  }

  return <HomePage page={page} />;
}
