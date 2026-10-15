export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[] | object;
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  _metadata?: object;
  description?: string;
  dimension?: {
    height: number;
    width: number;
  };
  publish_details: PublishDetails;
  /** CSLP mapping for editable fields */
  $?: {
    url?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    filename?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
  };
}

export interface Link {
  title: string;
  href: string;
}

export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export interface CSLPAttribute {
  "data-cslp"?: string;
  "data-cslp-parent-field"?: string;
}
export type CSLPFieldMapping = CSLPAttribute;

export interface SystemFields {
  uid?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  _content_type_uid?: string;
  tags?: string[];
  ACL?: any[];
  _version?: number;
  _in_progress?: boolean;
  locale?: string;
  publish_details?: PublishDetails;
  title?: string;
}

/** A block! */
export interface Block {
  /** Version */
  _version?: number;
  /** Title */
  title?: string;
  /** Copy */
  copy?: string;
  /** Image */
  image?: File | null;
  /** Layout */
  layout?: ("image_left" | "image_right") | null;
  /** Metadata */
  _metadata?: { uid: string };
  /** CSLP mapping for editable fields */
  $?: {
    title?: CSLPFieldMapping;
    copy?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    layout?: CSLPFieldMapping;
  };
}

export interface CtaBlock {
  title?: string;
  label?: string;
  text_cta?: string;
  description?: string;
  text?: string;
  image?: File | null;
  image_light?: File | null;
  image_dark?: File | null;
  image_alt?: string;
  button_cta?: Link;
  button_to?: string;
  button_text?: string;
  _metadata?: { uid: string };
  $?: {
    title?: CSLPFieldMapping;
    label?: CSLPFieldMapping;
    text_cta?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    text?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    image_light?: CSLPFieldMapping;
    image_dark?: CSLPFieldMapping;
    button_cta?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ServiceCardBlock {
  _version?: number;
  card_title?: string;
  card_text?: string;
  grid_size?: "1" | "2" | "3" | string;
  card_variant?: "Default" | "Image Tag" | string;
  variant?: string;
  image?: File;
  _metadata?: { uid: string };
  $?: {
    card_title?: CSLPFieldMapping;
    card_text?: CSLPFieldMapping;
    grid_size?: CSLPFieldMapping;
    card_variant?: CSLPFieldMapping;
    variant?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
  };
}

export interface FeaturedProjectsBlock {
  _version?: number;
  label?: string;
  label_projects?: string;
  section_title?: string;
  title?: string;
  section_intro?: string;
  intro?: string;
  projects?: PortfolioItem[];
  _metadata?: { uid: string };
  $?: {
    label?: CSLPFieldMapping;
    label_projects?: CSLPFieldMapping;
    section_title?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    section_intro?: CSLPFieldMapping;
    intro?: CSLPFieldMapping;
    projects?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ExperienceRole {
  title?: string;
  period?: string;
  role_type?: "core" | "secondary" | string;
  badge?: string;
  description?: string;
  _metadata?: { uid: string };
  $?: {
    title?: CSLPFieldMapping;
    period?: CSLPFieldMapping;
    role_type?: CSLPFieldMapping;
    badge?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
  };
}

export interface ExperienceCompany {
  company_name?: string;
  company_period?: string;
  roles?: ExperienceRole[];
  _metadata?: { uid: string };
  $?: {
    company_name?: CSLPFieldMapping;
    company_period?: CSLPFieldMapping;
    roles?: CSLPFieldMapping;
  };
}

export interface ExperienceTimelineBlock {
  _version?: number;
  section_title?: string;
  companies?: ExperienceCompany[];
  experience_timeline?: any;
  _metadata?: { uid: string };
  $?: {
    section_title?: CSLPFieldMapping;
    companies?: CSLPFieldMapping;
    [key: string]: any;
  };
}

export interface ResumeStack {
  stack_label?: string;
  stackLabel?: string;
  stack_title?: string;
  stackTitle?: string;
  label?: string;
  title?: string;
  tag?: string[];
  tags?: string[];
  Tag?: string[];
  Tags?: string[];
  _metadata?: { uid: string };
  $?: {
    stack_label?: CSLPFieldMapping;
    stackLabel?: CSLPFieldMapping;
    stack_title?: CSLPFieldMapping;
    stackTitle?: CSLPFieldMapping;
    label?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    tag?: CSLPFieldMapping;
    tags?: CSLPFieldMapping;
    Tag?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ResumeSectionBlock {
  _version?: number;
  container_width?: string; /** "small" | "default" | "large" | "wide" */
  width?: string;
  color_mode?: "Default" | "Alt" | "default" | "alt" | string;
  left_col_span?: number | string; /** Col span 1-12 for left column */
  right_col_span?: number | string; /** Col span 1-12 for right column */
  timeline_position?: "right" | "left" | "full" | "Right" | "Left" | "Full" | "rechts" | "links" | string;
  timeline_placement?: string;
  label?: string;
  section_label?: string;
  title?: string;
  section_title_main?: string;
  section_title?: string;
  description?: string;
  text?: string;
  intro?: string;
  button?: Link;
  button_cta?: Link;
  companies?: ExperienceCompany[];
  stack_label?: string;
  stackLabel?: string;
  stack_title?: string;
  stackTitle?: string;
  stack?: ResumeStack | { tag?: string[]; Tag?: string[]; stack_label?: string; stack_title?: string } | string[] | any;
  Stack?: ResumeStack | { tag?: string[]; Tag?: string[]; stack_label?: string; stack_title?: string } | string[] | any;
  _metadata?: { uid: string };
  $?: {
    container_width?: CSLPFieldMapping;
    width?: CSLPFieldMapping;
    color_mode?: CSLPFieldMapping;
    left_col_span?: CSLPFieldMapping;
    right_col_span?: CSLPFieldMapping;
    timeline_position?: CSLPFieldMapping;
    label?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    text?: CSLPFieldMapping;
    button?: CSLPFieldMapping;
    section_title?: CSLPFieldMapping;
    companies?: CSLPFieldMapping;
    stack_label?: CSLPFieldMapping;
    stack_title?: CSLPFieldMapping;
    stack?: CSLPFieldMapping;
    Stack?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}


export interface GridCard {
  image?: File;
  tag?: string;
  title?: string;
  text?: string;
  description?: string;
  _metadata?: { uid: string };
  $?: {
    image?: CSLPFieldMapping;
    tag?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    text?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface TimelineRole {
  title?: string;
  period?: string;
  _metadata?: { uid: string };
  $?: {
    title?: CSLPFieldMapping;
    period?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface TimelineCompany {
  company?: string;
  company_name?: string;
  website?: string | Link;
  roles?: TimelineRole[];
  _metadata?: { uid: string };
  $?: {
    company?: CSLPFieldMapping;
    company_name?: CSLPFieldMapping;
    website?: CSLPFieldMapping;
    roles?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface SocialLink {
  icon?: string;
  link?: string | Link;
  title?: string;
  _metadata?: { uid: string };
  $?: {
    icon?: CSLPFieldMapping;
    link?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface GridSocials {
  label?: string;
  links?: SocialLink[];
  items?: SocialLink[];
  _metadata?: { uid: string };
  $?: {
    label?: CSLPFieldMapping;
    links?: CSLPFieldMapping;
    items?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface GridContentLeft {
  label_left?: string;
  title_h1?: string;
  heading_type?: string;
  quote_left?: string;
  text_left?: string;
  image_left?: File;
  button_left?: Link;
  cards?: GridCard[];
  resume_timeline?: TimelineCompany[] | { companies?: TimelineCompany[] } | any;
  socials?: GridSocials | SocialLink[] | any;
  _metadata?: { uid: string };
  $?: {
    label_left?: CSLPFieldMapping;
    title_h1?: CSLPFieldMapping;
    heading_type?: CSLPFieldMapping;
    quote_left?: CSLPFieldMapping;
    text_left?: CSLPFieldMapping;
    image_left?: CSLPFieldMapping;
    button_left?: CSLPFieldMapping;
    cards?: CSLPFieldMapping;
    resume_timeline?: CSLPFieldMapping;
    socials?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface GridContentRight {
  label_right?: string;
  title_h1r?: string;
  heading_type?: string;
  text_right?: string;
  image_right?: File;
  quote_right?: string;
  text_right_extended?: string;
  button_right?: Link;
  cards?: GridCard[];
  resume_timeline?: TimelineCompany[] | { companies?: TimelineCompany[] } | any;
  socials?: GridSocials | SocialLink[] | any;
  _metadata?: { uid: string };
  $?: {
    label_right?: CSLPFieldMapping;
    title_h1r?: CSLPFieldMapping;
    heading_type?: CSLPFieldMapping;
    text_right?: CSLPFieldMapping;
    image_right?: CSLPFieldMapping;
    quote_right?: CSLPFieldMapping;
    text_right_extended?: CSLPFieldMapping;
    button_right?: CSLPFieldMapping;
    cards?: CSLPFieldMapping;
    resume_timeline?: CSLPFieldMapping;
    socials?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface GridSectionBlock {
  container_width?: string; /** "small" | "Default" | "Large" | "Wide" */
  color_mode?: "Default" | "Alt" | string; /** "Default" | "Alt" */
  left_col_span?: number | string; /** Col span 1-12 for left column */
  right_col_span?: number | string; /** Col span 1-12 for right column */
  content_left?: GridContentLeft;
  content_right?: GridContentRight;
  _metadata?: { uid: string };
  $?: {
    container_width?: CSLPFieldMapping;
    color_mode?: CSLPFieldMapping;
    left_col_span?: CSLPFieldMapping;
    right_col_span?: CSLPFieldMapping;
    content_left?: CSLPFieldMapping;
    content_right?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface CardSectionItem {
  image?: File;
  card_title?: string;
  title?: string;
  tag?: string;
  text?: string;
  description?: string;
  button?: Link;
  card_variant?: "Default" | "Image Tag" | string;
  _metadata?: { uid: string };
  $?: {
    image?: CSLPFieldMapping;
    card_title?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    tag?: CSLPFieldMapping;
    text?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    button?: CSLPFieldMapping;
    card_variant?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface CardSectionBlock {
  width?: string; /** "small" | "Default" | "Large" | "Wide" */
  container_width?: string; /** "small" | "Default" | "Large" | "Wide" */
  color_mode?: "Default" | "Alt" | string; /** "Default" | "Alt" */
  label?: string;
  label_cards?: string;
  section_title?: string;
  section_intro?: string;
  columns?: "2" | "3" | "4" | string;
  cards?: CardSectionItem[];
  _metadata?: { uid: string };
  $?: {
    width?: CSLPFieldMapping;
    container_width?: CSLPFieldMapping;
    color_mode?: CSLPFieldMapping;
    label?: CSLPFieldMapping;
    label_cards?: CSLPFieldMapping;
    section_title?: CSLPFieldMapping;
    section_intro?: CSLPFieldMapping;
    columns?: CSLPFieldMapping;
    cards?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface NumberedItem {
  number?: string;
  title?: string;
  text?: string;
  description?: string;
  button?: Link;
  _metadata?: { uid: string };
  $?: {
    number?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    text?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    button?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface NumberedSectionBlock {
  width?: string; /** "small" | "Default" | "Large" | "Wide" */
  container_width?: string; /** "small" | "Default" | "Large" | "Wide" */
  color_mode?: "Default" | "Alt" | string; /** "Default" | "Alt" */
  label?: string;
  section_label?: string;
  label_numbered?: string;
  section_title?: string;
  title?: string;
  section_intro?: string;
  columns?: "1" | "2" | "3" | string;
  items?: NumberedItem[];
  numbered_items?: NumberedItem[];
  _metadata?: { uid: string };
  $?: {
    width?: CSLPFieldMapping;
    container_width?: CSLPFieldMapping;
    color_mode?: CSLPFieldMapping;
    label?: CSLPFieldMapping;
    section_label?: CSLPFieldMapping;
    label_numbered?: CSLPFieldMapping;
    section_title?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    section_intro?: CSLPFieldMapping;
    columns?: CSLPFieldMapping;
    items?: CSLPFieldMapping;
    numbered_items?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface HeroMicroLink {
  title?: string;
  label?: string;
  to?: string;
  href?: string;
  link?: string | Link;
  external?: boolean;
  title_attr?: string;
  _metadata?: { uid: string };
  $?: {
    title?: CSLPFieldMapping;
    label?: CSLPFieldMapping;
    to?: CSLPFieldMapping;
    href?: CSLPFieldMapping;
    link?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface HeroBlock {
  label?: string;
  title?: string;
  text?: string;
  description?: string;
  micro_links?: HeroMicroLink[];
  stats?: HeroMicroLink[];
  cta_button?: Link;
  button?: Link;
  cta_note?: string;
  image_1?: File;
  image_ux?: File;
  image_2?: File;
  image_vormgeving?: File;
  image_3?: File;
  image_development?: File;
  _metadata?: { uid: string };
  $?: {
    label?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    text?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    micro_links?: CSLPFieldMapping;
    stats?: CSLPFieldMapping;
    cta_button?: CSLPFieldMapping;
    button?: CSLPFieldMapping;
    cta_note?: CSLPFieldMapping;
    image_1?: CSLPFieldMapping;
    image_ux?: CSLPFieldMapping;
    image_2?: CSLPFieldMapping;
    image_vormgeving?: CSLPFieldMapping;
    image_3?: CSLPFieldMapping;
    image_development?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface Blocks extends SystemFields {
  hero?: HeroBlock;
  hero_block?: HeroBlock;
  Hero?: HeroBlock;
  hero_section?: HeroBlock;
  block?: Block;
  service_card?: ServiceCardBlock;
  featured_projects?: FeaturedProjectsBlock;
  experience_timeline?: ExperienceTimelineBlock;
  resume_section?: ResumeSectionBlock;
  Resume_Section?: ResumeSectionBlock;
  ResumeSection?: ResumeSectionBlock;
  grid_section_resume?: ResumeSectionBlock;
  resume_grid_section?: ResumeSectionBlock;
  grid_section?: GridSectionBlock;
  card_section?: CardSectionBlock;
  Card_Section?: CardSectionBlock;
  cardSection?: CardSectionBlock;
  CardSection?: CardSectionBlock;
  numbered_section?: NumberedSectionBlock;
  numbered_list?: NumberedSectionBlock;
  cta_resume?: CtaBlock;
  CTA_Resume?: CtaBlock;
  CtaBlock?: CtaBlock;
}

export interface Page extends SystemFields {
  /** UID - required for live preview */
  uid: string;
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** URL */
  url?: string;
  /** Description */
  description?: string;
  /** Image */
  image?: File | null;
  /** Rich Text */
  rich_text?: string;
  /** Breadcrumbs toggle & optional custom label */
  show_breadcrumbs?: boolean;
  breadcrumb_title?: string;
  /** blocks */
  blocks?: Blocks[];
  /** CSLP mapping for editable fields */
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    rich_text?: CSLPFieldMapping;
    show_breadcrumbs?: CSLPFieldMapping;
    breadcrumb_title?: CSLPFieldMapping;
    blocks?: CSLPFieldMapping;
    [key: string]: CSLPFieldMapping | undefined; // Allow dynamic block indexing
  };
}

export interface TechStackItem {
  icon?: string;
  label: string;
  value: string;
  $?: {
    icon?: CSLPFieldMapping;
    label?: CSLPFieldMapping;
    value?: CSLPFieldMapping;
    [key: string]: any;
  };
}

export interface PortfolioItem extends SystemFields {
  uid: string;
  _version?: number;
  title: string;
  url?: string;
  date?: string;
  company?: string;
  category?: string | string[];
  select?: string | string[];
  project_tag?: string;
  project_title?: string;
  project_desc?: string;
  portfolioimagedetail?: File | string | null;
  banner_visual_1?: File | string | null;
  banner_visual_2?: File | string | null;
  portfolioimagedetail1?: File | string | null;
  portfolioimagedetail1_txt?: string;
  portfolioimagedetail2?: File | string | null;
  portfolioimagedetail2_txt?: string;
  portfolioimagedetail3?: File | string | null;
  portfolioimagedetail3_txt?: string;
  alt_text?: string;
  tech_stack?: TechStackItem[];
  featured_image?: File | null;
  description?: string;
  content?: string;
  show_breadcrumbs?: boolean;
  breadcrumb_title?: string;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    date?: CSLPFieldMapping;
    company?: CSLPFieldMapping;
    category?: CSLPFieldMapping;
    select?: CSLPFieldMapping;
    project_tag?: CSLPFieldMapping;
    project_title?: CSLPFieldMapping;
    project_desc?: CSLPFieldMapping;
    tech_stack?: CSLPFieldMapping;
    portfolioimagedetail?: CSLPFieldMapping;
    banner_visual_1?: CSLPFieldMapping;
    banner_visual_2?: CSLPFieldMapping;
    portfolioimagedetail1?: CSLPFieldMapping;
    portfolioimagedetail1_txt?: CSLPFieldMapping;
    portfolioimagedetail2?: CSLPFieldMapping;
    portfolioimagedetail2_txt?: CSLPFieldMapping;
    portfolioimagedetail3?: CSLPFieldMapping;
    portfolioimagedetail3_txt?: CSLPFieldMapping;
    alt_text?: CSLPFieldMapping;
    featured_image?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    content?: CSLPFieldMapping;
    show_breadcrumbs?: CSLPFieldMapping;
    breadcrumb_title?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

