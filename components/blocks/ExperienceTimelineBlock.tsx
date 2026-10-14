import React from "react";
import {
  ExperienceTimelineBlock as ExperienceTimelineBlockType,
  CSLPAttribute,
} from "@/lib/types";
import ResumeSection from "./ResumeSection";

interface ExperienceTimelineBlockProps {
  data: ExperienceTimelineBlockType;
  previewAttr?: CSLPAttribute;
  className?: string;
}

/**
 * ExperienceTimelineBlock: Visual work experience timeline using project brand tokens.
 * Backward compatible wrapper delegating to ResumeSection.
 */
export default function ExperienceTimelineBlock({
  data,
  previewAttr,
  className = "",
}: ExperienceTimelineBlockProps) {
  // Gracefully support both direct properties and nested modular block instances
  const timelineData: ExperienceTimelineBlockType =
    data.companies || data.section_title
      ? data
      : Array.isArray(data.experience_timeline)
      ? data.experience_timeline[0]?.experience_timeline ||
        data.experience_timeline[0] ||
        data
      : data.experience_timeline || data;

  return (
    <ResumeSection
      data={timelineData}
      previewAttr={previewAttr}
      className={className}
    />
  );
}
