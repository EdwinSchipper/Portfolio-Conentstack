import type { ComponentType } from "react";
import CardSection from "./CardSection";
import ContentBlock from "./ContentBlock";
import CtaBlock from "./CtaBlock";
import ExperienceTimelineBlock from "./ExperienceTimelineBlock";
import FeaturedProjectsBlock from "./FeaturedProjectsBlock";
import GridSection from "./GridSection";
import NumberedSection from "./NumberedSection";
import ResumeSection from "./ResumeSection";
import ServiceCardBlock from "./ServiceCardBlock";
import HeroBlock from "./HeroBlock";

export {
  CardSection,
  ContentBlock,
  CtaBlock,
  ExperienceTimelineBlock,
  FeaturedProjectsBlock,
  GridSection,
  NumberedSection,
  ResumeSection,
  ServiceCardBlock,
  HeroBlock,
};

/**
 * Component Registry: Koppelt Contentstack modular block UIDs aan hun React component.
 * Nieuw blok toevoegen? Alleen hier registreren, BlockRenderer pakt hem automatisch op!
 */
export const BLOCK_COMPONENTS: Record<string, ComponentType<{ data: any; previewAttr?: any }>> = {
  // Hero
  hero: HeroBlock,
  hero_block: HeroBlock,
  hero_section: HeroBlock,
  Hero: HeroBlock,
  heroBlock: HeroBlock,

  // Featured Projects
  featured_projects: FeaturedProjectsBlock,

  // Service Card
  service_card: ServiceCardBlock,

  // Content Block
  block: ContentBlock,

  // CTA / Resume
  cta_resume: CtaBlock,
  CTA_Resume: CtaBlock,
  c_t_a_resume: CtaBlock,
  CtaBlock: CtaBlock,

  // Resume Section
  resume_section: ResumeSection,
  grid_section_resume: ResumeSection,
  resume_grid_section: ResumeSection,
  Resume_Section: ResumeSection,
  resumeSection: ResumeSection,

  // Experience Timeline
  experience_timeline: ExperienceTimelineBlock,

  // Grid Section
  grid_section: GridSection,

  // Card Section
  card_section: CardSection,
  Card_Section: CardSection,
  cardSection: CardSection,
  CardSection: CardSection,

  // Numbered Section
  numbered_section: NumberedSection,
  numbered_list: NumberedSection,
};
