import { cache } from "react";
import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { getContentstackEndpoint, type ContentstackEndpoints } from "@contentstack/utils";
import type { Page, Homepage, PortfolioItem } from "./types";

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

const apiKey = (process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "").trim();
const deliveryToken = (process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || "").trim();
const environment = (process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "").trim();
const previewToken = (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN || "").trim();
const region = (process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "NA").trim();
const endpoints = getContentstackEndpoint(region, "", true) as ContentstackEndpoints;

export const stack = contentstack.stack({
  apiKey: apiKey || "missing-api-key",
  deliveryToken: deliveryToken || "missing-delivery-token",
  environment: environment || "missing-environment",
  region: region as any,
  host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY || (endpoints.contentDelivery as string),
  live_preview: {
    enable: isPreview,
    preview_token: previewToken,
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST || (endpoints.preview as string),
  },
});

/**
 * Initializes Contentstack Live Preview / Visual Builder listeners.
 * Configured for client-side mode with visual builder endpoints.
 */
export function initLivePreview(): void {
  ContentstackLivePreview.init({
    ssr: false,
    enable: isPreview,
    mode: "builder",
    stackSdk: stack.config as IStackSdk,
    stackDetails: {
      apiKey,
      environment,
    },
    clientUrlParams: {
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION || (endpoints.application as string),
    },
    editButton: {
      enable: false,
    },
  });
}

/**
 * Fetches the singleton homepage entry and resolves referenced modular blocks.
 * Memoized with React cache() to prevent duplicate requests when used in generateMetadata and page.
 */
export const getHomePage = cache(async function getHomePage(): Promise<Homepage | undefined> {
  if (!apiKey || !deliveryToken || !environment) {
    console.error("[Contentstack] Missing required environment variables on server:", {
      apiKey: Boolean(apiKey),
      deliveryToken: Boolean(deliveryToken),
      environment: Boolean(environment),
    });
    return undefined;
  }

  try {
    const result = await stack
      .contentType("homepage")
      .entry()
      .includeReference(["blocks.featured_projects.projects"])
      .find<Homepage>();

    const entry = result.entries?.[0];
    if (entry) {
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "homepage", true);
      }
      return entry;
    }
  } catch (error) {
    console.error("[Contentstack] Failed to fetch homepage entry:", error);
    return undefined;
  }
});

/**
 * Fetches a single page entry matching the provided URL path.
 * Memoized with React cache() to prevent duplicate requests when used in generateMetadata and page.
 */
export const getPage = cache(async function getPage(url: string): Promise<Page | undefined> {
  if (!apiKey || !deliveryToken || !environment) {
    console.error("[Contentstack] Missing required environment variables on server for getPage");
    return undefined;
  }

  try {
    const result = await stack
      .contentType("page")
      .entry()
      .includeReference(["blocks.featured_projects.projects"])
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<Page>();

    const entry = result.entries?.[0];
    if (entry) {
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "page", true);
      }
      return entry;
    }
  } catch (error) {
    console.error(`[Contentstack] Failed to fetch page entry for url "${url}":`, error);
    return undefined;
  }
});

/**
 * Fetches a single portfolio item entry matching the provided URL slug.
 * Memoized with React cache() to prevent duplicate requests when used in generateMetadata and page.
 */
export const getPortfolioItemByUrl = cache(async function getPortfolioItemByUrl(url: string): Promise<PortfolioItem | undefined> {
  if (!apiKey || !deliveryToken || !environment) {
    console.error("[Contentstack] Missing required environment variables on server for getPortfolioItemByUrl");
    return undefined;
  }

  try {
    const result = await stack
      .contentType("portfolio_item")
      .entry()
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<PortfolioItem>();

    const entry = result.entries?.[0];
    if (entry) {
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "portfolio_item", true);
      }
      return entry;
    }
  } catch (error) {
    console.error(`[Contentstack] Failed to fetch portfolio item for url "${url}":`, error);
    return undefined;
  }
});

export interface GetPortfolioItemsOptions {
  limit?: number;
  skip?: number;
  category?: string;
}

export interface GetPortfolioItemsResult {
  items: PortfolioItem[];
  total: number;
}

/**
 * Fetches multiple portfolio item entries with optional pagination and category filtering.
 */
export async function getPortfolioItems({
  limit = 9,
  skip = 0,
  category,
}: GetPortfolioItemsOptions = {}): Promise<GetPortfolioItemsResult> {
  if (!apiKey || !deliveryToken || !environment) {
    console.error("[Contentstack] Missing required environment variables on server for getPortfolioItems");
    return { items: [], total: 0 };
  }

  try {
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
  } catch (error) {
    console.error("[Contentstack] Failed to fetch portfolio items list:", error);
    return { items: [], total: 0 };
  }
}