"use client";

import clsx from "clsx";
import { Star } from "lucide-react";

import {
  hasReachedTarget,
  LEVEL_ORDER,
  type StackedSkill,
} from "@/lib/skills-store";

import { StackedSkillBar } from "./stacked-skill-bar";

interface StackedSkillRowProps {
  skill: StackedSkill;
  /** Show the star icon before the skill name. Defaults to true. */
  showStar?: boolean;
}

function badgeLabel(skill: StackedSkill): string {
  if (skill.currentLevel) return skill.currentLevel;
  // No level fully mastered yet — reflect progress on the lowest non-missing level.
  const firstNonMissing = skill.levels.find((l) => !l.isMissing);
  if (firstNonMissing && firstNonMissing.currentXp > 0) {
    return `${firstNonMissing.level} in progress`;
  }
  return "Not started";
}

function badgeClass(skill: StackedSkill): string {
  if (skill.currentLevel) {
    // Coloured by level ordinal.
    switch (skill.currentLevel) {
      case "Foundational":
        return "bg-[#e8f0fe] text-[#0056d2]";
      case "Beginner":
        return "bg-[#e0ecff] text-[#0050b8]";
      case "Intermediate":
        return "bg-[#ede7f6] text-[#5e35b1]";
      case "Advanced":
        return "bg-[#e6f4ea] text-[#137333]";
    }
  }
  return "bg-[#f0f2f5] text-[#5b6780]";
}

export function StackedSkillRow({ skill, showStar = true }: StackedSkillRowProps) {
  const reached = hasReachedTarget(skill);
  const showGoalHint =
    skill.targetLevel != null &&
    (!skill.currentLevel ||
      LEVEL_ORDER[skill.currentLevel] < LEVEL_ORDER[skill.targetLevel]);
  const cardBorder = reached && skill.targetLevel != null
    ? "border-[#c4eed0]"
    : "border-[#e3e8ef]";

  return (
    <div className={clsx("rounded-lg border bg-white px-4 py-3", cardBorder)}>
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {showStar && (
            <Star
              size={14}
              className={clsx(
                "shrink-0",
                reached && skill.targetLevel != null ? "fill-[#137333] text-[#137333]" : "fill-[#f4a722] text-[#f4a722]",
              )}
            />
          )}
          <span className="truncate text-sm font-semibold text-[#0f1114]">
            {skill.skillName}
          </span>
          <span
            className={clsx(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
              badgeClass(skill),
            )}
          >
            {badgeLabel(skill)}
          </span>
        </div>
        <span className="shrink-0 text-xs tabular-nums text-[#5b6780]">
          {skill.totalCurrentXp}/{skill.totalXpMax} XP
        </span>
      </div>
      <StackedSkillBar
        levels={skill.levels}
        currentLevel={skill.currentLevel}
        targetLevel={skill.targetLevel}
      />
      {showGoalHint && skill.targetLevel && (
        <p className="mt-1.5 text-[11px] text-[#5b6780]">
          Goal for this role: reach <span className="font-medium text-[#0f1114]">{skill.targetLevel}</span>
        </p>
      )}
    </div>
  );
}
