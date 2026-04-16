"use client";

import type { SkillPriority } from "@/lib/skills-store";

interface SkillPriorityBadgeProps {
  priority: SkillPriority;
}

const BADGE_STYLES: Record<SkillPriority, { bg: string; text: string; label: string }> = {
  should: {
    bg: "bg-[var(--cds-color-blue-50)]",
    text: "text-[var(--cds-color-blue-700)]",
    label: "Should learn",
  },
  might: {
    bg: "bg-[var(--cds-color-purple-50)]",
    text: "text-[var(--cds-color-purple-700)]",
    label: "Might need",
  },
  optional: {
    bg: "bg-gray-100",
    text: "text-gray-500",
    label: "Optional",
  },
};

export function SkillPriorityBadge({ priority }: SkillPriorityBadgeProps) {
  const style = BADGE_STYLES[priority];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}
    >
      {style.label}
    </span>
  );
}
