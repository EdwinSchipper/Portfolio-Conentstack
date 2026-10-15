import { Blocks } from "@/lib/types";
import ServiceCardBlock from "./ServiceCardBlock";
import ContentBlock from "./ContentBlock";
import CtaBlock from "./CtaBlock";
import FeaturedProjectsBlock from "./FeaturedProjectsBlock";
import ExperienceTimelineBlock from "./ExperienceTimelineBlock";
import ResumeSection from "./ResumeSection";
import GridSection from "./GridSection";
import CardSection from "./CardSection";
import NumberedSection from "./NumberedSection";
import HeroBlock from "./HeroBlock";

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

  const heroData =
    block.hero ||
    block.hero_block ||
    block.hero_section ||
    (block as any).Hero ||
    (block as any).heroBlock;
  if (heroData) {
    return (
      <HeroBlock
        data={heroData}
        previewAttr={blockPreviewAttr}
      />
    );
  }

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

  const resumeData =
    block.resume_section ||
    block.grid_section_resume ||
    block.resume_grid_section ||
    (block as any).Resume_Section ||
    (block as any).resumeSection;
  if (resumeData) {
    return (
      <ResumeSection
        data={resumeData}
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

  const cardData =
    block.card_section ||
    (block as any).Card_Section ||
    (block as any).cardSection ||
    (block as any).CardSection;
  if (cardData) {
    return (
      <CardSection
        data={cardData}
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
