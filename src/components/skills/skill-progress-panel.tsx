"use client";

import {
  computeOverallMastery,
  computeOverallMasteryGroups,
  getBaseSkillCounts,
  getRoleUnits,
  groupProgressBySkill,
  isGroupRoleProgress,
  type AnyRoleProgress,
} from "@/lib/skills-store";
import { SkillXpBar } from "./skill-xp-bar";
import { StackedSkillRow } from "./stacked-skill-row";

interface SkillProgressPanelProps {
  progress: AnyRoleProgress;
}

export function SkillProgressPanel({ progress }: SkillProgressPanelProps) {
  const isGroup = isGroupRoleProgress(progress);
  const overallPercent = isGroup
    ? computeOverallMasteryGroups(progress)
    : computeOverallMastery(progress);
  const { totalSkills, masteredSkills } = getBaseSkillCounts(progress);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {progress.roleTitle}
          </h3>
          <p className="text-xs text-gray-500">
            {masteredSkills}/{totalSkills} required skills mastered
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-lg font-bold text-[var(--cds-color-blue-700)]">
              {overallPercent}%
            </span>
            <p className="text-xs text-gray-400">mastery</p>
          </div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-5 h-2.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[var(--cds-color-blue-700)] transition-all duration-700"
          style={{ width: `${overallPercent}%` }}
        />
      </div>

      {/* Skill list — one row per base skill for group-model, or per area for legacy. */}
      {isGroup ? (
        <div className="space-y-2">
          {groupProgressBySkill(progress).map((skill) => (
            <StackedSkillRow key={skill.skillSlug} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {getRoleUnits(progress).map((unit) => (
            <div key={unit.key}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-800">
                  {unit.displayName}
                </span>
              </div>
              <SkillXpBar currentXp={unit.currentXp} level={unit.stage} xpMax={unit.xpMax} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
