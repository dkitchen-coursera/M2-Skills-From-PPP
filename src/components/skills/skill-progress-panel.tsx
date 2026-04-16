"use client";

import {
  computeOverallMastery,
  getSkillsByPriority,
  type RoleProgress,
} from "@/lib/skills-store";
import { SkillXpBar } from "./skill-xp-bar";

interface SkillProgressPanelProps {
  progress: RoleProgress;
}

export function SkillProgressPanel({ progress }: SkillProgressPanelProps) {
  const sortedSkills = getSkillsByPriority(progress);
  const overallPercent = computeOverallMastery(progress);
  const shouldCount = sortedSkills.filter((s) => s.priority === "should").length;
  const masteredCount = sortedSkills.filter(
    (s) => s.priority === "should" && s.level === "Mastered"
  ).length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {progress.roleTitle}
          </h3>
          <p className="text-xs text-gray-500">
            {masteredCount}/{shouldCount} required skills mastered
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

      {/* Skill list */}
      <div className="space-y-3">
        {sortedSkills.map((skill) => (
          <div key={skill.skillId}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">
                {skill.skillName}
              </span>
              <span className="text-[10px] text-gray-400">
                {Object.keys(skill.expressions).length} expressions
              </span>
            </div>
            <SkillXpBar currentXp={skill.currentXp} level={skill.level} xpMax={skill.xpMax} />
          </div>
        ))}
      </div>
    </div>
  );
}
