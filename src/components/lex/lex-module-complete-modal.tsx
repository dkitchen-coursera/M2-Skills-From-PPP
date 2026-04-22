"use client";

import type { LexModule } from "@/lib/lex-types";
import type { AnyRoleProgress, StackedSkill } from "@/lib/skills-store";
import { computeItemXp } from "@/lib/lex-data";
import {
  computeOverallMastery,
  computeOverallMasteryGroups,
  groupProgressBySkill,
  isGroupRoleProgress,
  lookupRoleUnit,
} from "@/lib/skills-store";
import { StackedSkillRow } from "@/components/skills/stacked-skill-row";

interface LexModuleCompleteModalProps {
  module: LexModule;
  roleProgress: AnyRoleProgress | null;
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

  const isGroup = !!roleProgress && isGroupRoleProgress(roleProgress);

  // Legacy shape: one row per area-model unit.
  const relevantUnits =
    roleProgress && !isGroupRoleProgress(roleProgress)
      ? targetSkillIds
          .map((id) => lookupRoleUnit(roleProgress, id))
          .filter((u): u is NonNullable<typeof u> => !!u)
      : [];

  // Group-model: dedupe target group keys to base-skill slugs and render a
  // compact stacked bar per skill.
  const relevantStacked: StackedSkill[] =
    roleProgress && isGroupRoleProgress(roleProgress)
      ? (() => {
          const slugs = new Set(
            targetSkillIds
              .map((id) => roleProgress.groups[id]?.skillSlug)
              .filter((s): s is string => !!s),
          );
          return groupProgressBySkill(roleProgress).filter((s) =>
            slugs.has(s.skillSlug),
          );
        })()
      : [];

  const overallPercent = !roleProgress
    ? 0
    : isGroupRoleProgress(roleProgress)
      ? computeOverallMasteryGroups(roleProgress)
      : computeOverallMastery(roleProgress);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
      {/* Card is capped to the viewport height so it never pushes the close
          button off-screen. Inner content scrolls when it overflows. */}
      <div className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Close button — absolute so it stays pinned to the top-right corner
            regardless of scroll position inside the card. */}
        <button
          onClick={onContinue}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#5b6780] hover:bg-white hover:text-[#0f1114] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Scrollable body. `min-h-0` is required so flex children can shrink
            below their intrinsic content height and let `overflow-y-auto`
            actually scroll. */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {/* Illustration area */}
          <div
            className="flex shrink-0 items-end justify-center overflow-hidden"
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
            {isGroup && relevantStacked.length > 0 && (
              <div className="mt-4 space-y-2">
                {relevantStacked.map((skill) => (
                  <StackedSkillRow
                    key={skill.skillSlug}
                    skill={skill}
                    showStar={skill.anyRequired}
                  />
                ))}
              </div>
            )}
            {!isGroup && relevantUnits.length > 0 && (
              <div className="mt-4 space-y-3">
                {relevantUnits.map((unit) => {
                  const pct = unit.xpMax > 0
                    ? Math.min(100, Math.round((unit.currentXp / unit.xpMax) * 100))
                    : 0;
                  return (
                    <div key={unit.key}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#0f1114]">{unit.displayName}</span>
                        <span className="text-xs tabular-nums text-[#5b6780]">
                          {unit.currentXp}/{unit.xpMax} XP
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
    </div>
  );
}
