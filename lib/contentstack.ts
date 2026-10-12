// Importing Contentstack SDK and specific types for region and query operations
import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";

// Importing Contentstack Live Preview utilities and stack SDK
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";

// Importing Page and PortfolioItem type definitions
import { Page, PortfolioItem } from "./types";

// helper functions to retrieve Contentstack endpoints for a given region
import { getContentstackEndpoint, type ContentstackEndpoints } from "@contentstack/utils";

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

// object with all endpoints for region.
const endpoints = getContentstackEndpoint(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || 'NA', '', true) as ContentstackEndpoints

export const stack = contentstack.stack({
  // Setting the API key from environment variables
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,

  // Setting the delivery token from environment variables
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,

  // Setting the environment based on environment variables
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,

  // Setting the region
  // for custom or dedicated Contentstack environments, override each endpoint individually using environment variables.
  // You can omit this if you have set a region above. Use @contentstack/utils getContentstackEndpoint to get the right urls for your region.
  region: process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as any,

  // Setting the host for content delivery based on the region or environment variables
  // for custom or dedicated Contentstack environments, override each endpoint individually using environment variables.
  host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY || endpoints.contentDelivery as string,

  live_preview: {
    // Enabling live preview if specified in environment variables
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true',

    // Setting the preview token from environment variables
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,

    // Setting the host for live preview based on the region
    // for custom or dedicated Contentstack environments, override each endpoint individually using environment variables.
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST || endpoints.preview as string
  }
});

// Initialize live preview functionality
export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false, // Disabling server-side rendering for live preview
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true', // Enabling live preview if specified in environment variables
    mode: "builder", // Setting the mode to "builder" for visual builder
    stackSdk: stack.config as IStackSdk, // Passing the stack configuration
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string, // Setting the API key from environment variables
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string, // Setting the environment from environment variables
    },
    clientUrlParams: {
      // Setting the client URL parameters for live preview
      // for custom or dedicated Contentstack environments, override each endpoint individually using environment variables.
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION || endpoints.application as string
    },
    editButton: {
      enable: true, // Enabling the edit button for live preview
      exclude: ["outsideLivePreviewPortal"] // Excluding the edit button from the live preview portal
    },
  });
}
// Function to fetch page data based on the URL
export async function getPage(url: string) {
  const result = await stack
    .contentType("page") // Specifying the content type as "page"
    .entry() // Accessing the entry
    .query() // Creating a query
    .where("url", QueryOperation.EQUALS, url) // Filtering entries by URL
    .find<Page>(); // Executing the query and expecting a result of type Page

  if (result.entries) {
    const entry = result.entries[0]; // Getting the first entry from the result

    if (isPreview) {
      contentstack.Utils.addEditableTags(entry, 'page', true); // Adding editable tags for live preview if enabled
    }

    return entry; // Returning the fetched entry
  }
}

// Function to fetch a single portfolio item by URL
export async function getPortfolioItemByUrl(url: string) {
  const result = await stack
    .contentType("portfolio_item")
    .entry()
    .query()
    .where("url", QueryOperation.EQUALS, url)
    .find<PortfolioItem>();

  if (result.entries && result.entries.length > 0) {
    const entry = result.entries[0];

    if (isPreview) {
      contentstack.Utils.addEditableTags(entry, "portfolio_item", true);
    }

    return entry;
  }
}

// Function to fetch multiple portfolio items with optional pagination and category filtering
export async function getPortfolioItems({
  limit = 9,
  skip = 0,
  category,
}: {
  limit?: number;
  skip?: number;
  category?: string;
} = {}) {
  let query = stack
    .contentType("portfolio_item")
    .entry()
    .query()
    .limit(limit)
    .skip(skip)
    .includeCount();

  if (category && category !== "Alles") {
    query = query.where("category", QueryOperation.EQUALS, category);
  }

  const result = await query.find<PortfolioItem>();

  if (isPreview && result.entries) {
    result.entries.forEach((entry) => {
      contentstack.Utils.addEditableTags(entry, "portfolio_item", true);
    });
  }

  return {
    items: result.entries || [],
    total: result.count || 0,
  };
}