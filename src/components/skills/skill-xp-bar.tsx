"use client";

import { computeSkillPercent, XP_MAX, type MasteryStage } from "@/lib/skills-store";

interface SkillXpBarProps {
  currentXp: number;
  level: MasteryStage;
  xpMax?: number;
  /** Compact mode for inline use (thinner bar, no label) */
  compact?: boolean;
}

const LEVEL_COLORS: Record<MasteryStage, string> = {
  "Not started": "bg-gray-200",
  Practicing: "bg-[var(--cds-color-blue-400)]",
  Developing: "bg-[var(--cds-color-blue-600)]",
  Comprehending: "bg-[var(--cds-color-purple-600)]",
  Mastered: "bg-[var(--cds-color-green-600)]",
};

export function SkillXpBar({ currentXp, level, xpMax, compact = false }: SkillXpBarProps) {
  const max = xpMax ?? XP_MAX;
  const percent = computeSkillPercent(currentXp, max);
  const barColor = LEVEL_COLORS[level];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-gray-400">
          {currentXp}/{max}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">{level}</span>
        <span className="text-xs tabular-nums text-gray-400">
          {currentXp.toLocaleString()} / {max.toLocaleString()} XP
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
