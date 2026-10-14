import { Blocks } from "@/lib/types";
import ServiceCardBlock from "./ServiceCardBlock";
import ContentBlock from "./ContentBlock";
import CtaBlock from "./CtaBlock";
import FeaturedProjectsBlock from "./FeaturedProjectsBlock";
import ExperienceTimelineBlock from "./ExperienceTimelineBlock";
import GridSection from "./GridSection";
import CardSection from "./CardSection";
import NumberedSection from "./NumberedSection";

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

  const ctaData =
    block.cta_resume || block.CTA_Resume || (block as any).c_t_a_resume || block.CtaBlock;
  if (ctaData) {
    return (
      <CtaBlock
        data={ctaData}
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
    return (
      <GridSection
        data={block.grid_section}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  if (block.card_section) {
    return (
      <CardSection
        data={block.card_section}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  if (block.numbered_section || block.numbered_list) {
    return (
      <NumberedSection
        data={(block.numbered_section || block.numbered_list)!}
        previewAttr={blockPreviewAttr}
      />
    );
  }

  return null;
}
