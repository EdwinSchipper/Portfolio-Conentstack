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
  section_title?: string;
  projects?: PortfolioItem[];
  _metadata?: { uid: string };
  $?: {
    section_title?: CSLPFieldMapping;
    projects?: CSLPFieldMapping;
  };
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

export interface GridContentLeft {
  label_left?: string;
  title_h1?: string;
  quote_left?: string;
  text_left?: string;
  image_left?: File;
  button_left?: Link;
  cards?: GridCard[];
  _metadata?: { uid: string };
  $?: {
    label_left?: CSLPFieldMapping;
    title_h1?: CSLPFieldMapping;
    quote_left?: CSLPFieldMapping;
    text_left?: CSLPFieldMapping;
    image_left?: CSLPFieldMapping;
    button_left?: CSLPFieldMapping;
    cards?: CSLPFieldMapping;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface GridContentRight {
  label_right?: string;
  title_h1r?: string;
  text_right?: string;
  image_right?: File;
  quote_right?: string;
  text_right_extended?: string;
  button_right?: Link;
  cards?: GridCard[];
  _metadata?: { uid: string };
  $?: {
    label_right?: CSLPFieldMapping;
    title_h1r?: CSLPFieldMapping;
    text_right?: CSLPFieldMapping;
    image_right?: CSLPFieldMapping;
    quote_right?: CSLPFieldMapping;
    text_right_extended?: CSLPFieldMapping;
    button_right?: CSLPFieldMapping;
    cards?: CSLPFieldMapping;
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

export interface Blocks extends SystemFields {
  block?: Block;
  service_card?: ServiceCardBlock;
  featured_projects?: FeaturedProjectsBlock;
  experience_timeline?: ExperienceTimelineBlock;
  grid_section?: GridSectionBlock;
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
  /** blocks */
  blocks?: Blocks[];
  /** CSLP mapping for editable fields */
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    rich_text?: CSLPFieldMapping;
    blocks?: CSLPFieldMapping;
    [key: string]: CSLPFieldMapping | undefined; // Allow dynamic block indexing
  };
}

export interface PortfolioItem extends SystemFields {
  uid: string;
  _version?: number;
  title: string;
  url?: string;
  date?: string;
  category?: string | string[];
  select?: string | string[];
  project_tag?: string;
  featured_image?: File | null;
  description?: string;
  content?: string;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    date?: CSLPFieldMapping;
    category?: CSLPFieldMapping;
    select?: CSLPFieldMapping;
    project_tag?: CSLPFieldMapping;
    featured_image?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    content?: CSLPFieldMapping;
  };
}
