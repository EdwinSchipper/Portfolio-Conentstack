import { Blocks } from "@/lib/types";
import ServiceCardBlock from "./ServiceCardBlock";
import ContentBlock from "./ContentBlock";
import FeaturedProjectsBlock from "./FeaturedProjectsBlock";
import ExperienceTimelineBlock from "./ExperienceTimelineBlock";
import SplitSectionBlock, { SplitSectionLayout } from "./SplitSectionBlock";

interface BlockRendererProps {
  block: Blocks;
  index: number;
  pagePreviewAttr?: Record<string, any>;
}

/**
 * BlockRenderer delegates each modular block to its dedicated React component.
 * Follows React component decomposition and preserves Contentstack Live Preview attributes.
 */
export default function BlockRenderer({
  block,
  index,
  pagePreviewAttr,
}: BlockRendererProps) {
  const blockPreviewAttr = pagePreviewAttr?.[`blocks__${index}`];

  if (block.featured_projects) {
    return (
      <FeaturedProjectsBlock
        data={block.featured_projects}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  if (block.service_card) {
    return (
      <ServiceCardBlock
        data={block.service_card}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  if (block.block) {
    return (
      <ContentBlock
        data={block.block}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  if (block.experience_timeline) {
    return (
      <ExperienceTimelineBlock
        data={block.experience_timeline}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  if (block.grid_section) {
    const raw =
      block.grid_section.grid ||
      block.grid_section.split_section ||
      block.grid_section;
    const items = Array.isArray(raw) ? raw : [raw];

    return (
      <SplitSectionLayout
        items={items}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  if (block.split_section) {
    const raw: any =
      (block.split_section as any).grid ||
      (block.split_section as any).grid_section ||
      block.split_section;
    const items = Array.isArray(raw) ? raw : [raw];

    return (
      <SplitSectionLayout
        items={items}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  if (block.layout) {
    const raw =
      block.layout.grid_section ||
      block.layout.split_section ||
      block.layout.grid ||
      block.layout;
    const items = Array.isArray(raw) ? raw : [raw];

    return (
      <SplitSectionLayout
        items={items}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  return null;
}
