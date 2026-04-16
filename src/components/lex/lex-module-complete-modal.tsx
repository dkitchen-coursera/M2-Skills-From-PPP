"use client";

import type { LexModule } from "@/lib/lex-types";
import type { RoleProgress } from "@/lib/skills-store";
import { computeItemXp } from "@/lib/lex-data";
import { computeOverallMastery } from "@/lib/skills-store";

interface LexModuleCompleteModalProps {
  module: LexModule;
  roleProgress: RoleProgress | null;
  targetSkillIds: string[];
  onContinue: () => void;
  onSeeProgress: () => void;
}

export function LexModuleCompleteModal({
  module,
  roleProgress,
  targetSkillIds,
  onContinue,
  onSeeProgress,
}: LexModuleCompleteModalProps) {
  const allItems = module.lessonGroups.flatMap((g) => g.items);
  const totalXp = allItems.reduce(
    (sum, item) => sum + computeItemXp(item.type, item.durationMinutes),
    0,
  );

  // Get skills relevant to this course/module
  const relevantSkills = roleProgress
    ? targetSkillIds
        .map((id) => roleProgress.skills[id])
        .filter(Boolean)
    : [];

  const overallPercent = roleProgress ? computeOverallMastery(roleProgress) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Close button */}
        <button
          onClick={onContinue}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#5b6780] hover:bg-white hover:text-[#0f1114] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Illustration area */}
        <div
          className="flex items-end justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(241,232,255,0.5), #F9F5FF)",
            height: 180,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/module-complete-illustration.svg"
            alt=""
            className="h-full w-auto object-contain"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-4">
          {/* Title */}
          <h3 className="text-center text-lg font-bold text-[#0f1114]">
            Nice work! You earned {totalXp} XP in this module!
          </h3>

          {/* Overall plan mastery */}
          {roleProgress && (
            <div className="mt-3 rounded-lg bg-[#f0f6ff] px-4 py-3 text-center">
              <p className="text-sm font-semibold text-[#0056d2]">
                You&apos;re {overallPercent}% of the way to finishing your skill mastery plan!
              </p>
            </div>
          )}

          {/* Skill progress bars */}
          {relevantSkills.length > 0 && (
            <div className="mt-4 space-y-3">
              {relevantSkills.map((skill) => {
                const pct = skill.xpMax > 0
                  ? Math.min(100, Math.round((skill.currentXp / skill.xpMax) * 100))
                  : 0;
                return (
                  <div key={skill.skillId}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#0f1114]">{skill.skillName}</span>
                      <span className="text-xs tabular-nums text-[#5b6780]">
                        {skill.currentXp}/{skill.xpMax} XP
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#e3e8ef]">
                      <div
                        className="h-full rounded-full bg-[#0056d2] transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 space-y-2">
            <button
              onClick={onContinue}
              className="w-full rounded-lg bg-[#0056d2] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0048b0]"
            >
              Continue Learning
            </button>
            <button
              onClick={onSeeProgress}
              className="w-full rounded-lg px-4 py-2 text-sm font-medium text-[#0056d2] transition-colors hover:bg-[#f0f6ff]"
            >
              See skill progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
