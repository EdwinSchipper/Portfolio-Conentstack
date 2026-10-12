import { Blocks } from "@/lib/types";
import ServiceCardBlock from "./ServiceCardBlock";
import ContentBlock from "./ContentBlock";
import FeaturedProjectsBlock from "./FeaturedProjectsBlock";
import ExperienceTimelineBlock from "./ExperienceTimelineBlock";

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

  return null;
}
