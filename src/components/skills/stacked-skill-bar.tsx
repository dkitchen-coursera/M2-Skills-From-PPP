"use client";

import clsx from "clsx";

import type { MasteryLevel } from "@/lib/data/da-mastery-groups";
import type { StackedLevel } from "@/lib/skills-store";

interface StackedSkillBarProps {
  levels: StackedLevel[];
  currentLevel: MasteryLevel | null;
  targetLevel: MasteryLevel | null;
  /** Thinner bar, no label row. */
  compact?: boolean;
}

const LEVEL_LABELS: Record<MasteryLevel, { full: string; short: string }> = {
  Foundational: { full: "Foundational", short: "F" },
  Beginner: { full: "Beginner", short: "B" },
  Intermediate: { full: "Intermediate", short: "I" },
  Advanced: { full: "Advanced", short: "A" },
};

function segmentFill(slot: StackedLevel): { color: string; widthPct: number } {
  if (slot.isMissing) return { color: "transparent", widthPct: 0 };
  if (slot.xpMax === 0) return { color: "transparent", widthPct: 0 };
  const widthPct = Math.min(100, (slot.currentXp / slot.xpMax) * 100);
  if (slot.isComplete && slot.isUnlocked) {
    return { color: "bg-[#137333]", widthPct: 100 };
  }
  if (slot.isUnlocked) {
    return { color: "bg-[#0056d2]", widthPct };
  }
  // Locked but has XP — muted.
  return { color: "bg-[#c4d6f0]", widthPct };
}

export function StackedSkillBar({
  levels,
  targetLevel,
  compact = false,
}: StackedSkillBarProps) {
  const barHeight = compact ? "h-2" : "h-3";

  return (
    <div className="w-full">
      <div className={clsx("flex items-stretch gap-1", barHeight)}>
        {levels.map((slot) => {
          const { color, widthPct } = segmentFill(slot);
          const isTarget = slot.level === targetLevel;
          return (
            <div
              key={slot.level}
              className={clsx(
                "relative flex-1 overflow-hidden rounded-sm",
                slot.isMissing
                  ? "border border-dashed border-[#dae1ed] bg-transparent"
                  : "bg-[#e3e8ef]",
                slot.isBeyondTarget && !slot.isMissing && "opacity-70",
                isTarget && "ring-2 ring-inset ring-[#0056d2]",
              )}
              aria-label={`${slot.displayName}: ${slot.currentXp}/${slot.xpMax} XP`}
            >
              {!slot.isMissing && widthPct > 0 && (
                <div
                  className={clsx("h-full transition-all duration-500", color)}
                  style={{ width: `${widthPct}%` }}
                />
              )}
            </div>
          );
        })}
      </div>
      {!compact && (
        <div className="mt-1 grid grid-cols-4 gap-1 text-[10px] leading-tight text-[#5b6780]">
          {levels.map((slot) => (
            <span
              key={slot.level}
              className={clsx(
                "truncate text-center",
                slot.isMissing && "text-[#c1cad9] line-through",
                slot.isBeyondTarget && !slot.isMissing && "italic text-[#8892a6]",
              )}
            >
              {LEVEL_LABELS[slot.level].full}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
