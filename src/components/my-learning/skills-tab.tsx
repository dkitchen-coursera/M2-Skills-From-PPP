"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import {
  computeOverallMastery,
  computeOverallMasteryGroups,
  computeSkillPercent,
  computeExpressionStage,
  getSkillsByPriority,
  getGroupsByPriority,
  isGroupRoleProgress,
  EXPRESSION_XP_MAX,
  type RoleProgress,
  type SkillProgress,
  type ExpressionProgress,
  type GroupRoleProgress,
  type MasteryGroup,
} from "@/lib/skills-store";
import { ROLE_CATALOG } from "@/lib/role-catalog";
import type { LearningPlan } from "@/lib/plan-types";
import { UpsellBanner } from "@/components/shared/upsell-banner";
import { InferredRoleControl } from "./inferred-role-header";

// ── Types ──────────────────────────────────────────────────────────────────

interface SkillsTabProps {
  roleProgress: RoleProgress | null;
  /**
   * Generated learning plan. When `planScope === "skills"`, the Skills tab
   * restricts the "Required" section to the groups this plan targets — a
   * SQL-focused plan shouldn't display the learner's progress against every
   * Band 1 group for the role.
   */
  plan?: LearningPlan | null;
  planScope?: "role" | "skills" | null;
  hasCourseraPlus?: boolean;
  inferredRoleId?: string | null;
  inferredRoleTitle?: string | null;
  inferredRoleConfirmed?: boolean;
  onConfirmInferredRole?: () => void;
  onChangeInferredRole?: (roleId: string) => void;
  onUpgrade?: () => void;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function StageBadge({ stage }: { stage: "Learning" | "Applying" }) {
  const isLearning = stage === "Learning";
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
        isLearning
          ? "bg-[#e8f0fe] text-[#0056d2]"
          : "bg-[#e6f4ea] text-[#137333]"
      )}
    >
      {stage}
    </span>
  );
}

function ExpressionRow({ expr }: { expr: ExpressionProgress }) {
  const pct = Math.round((expr.currentXp / EXPRESSION_XP_MAX) * 100);
  const stage = computeExpressionStage(expr.currentXp);

  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 truncate text-xs text-[#1f1f1f]">
          {expr.expressionName}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          {stage && <StageBadge stage={stage} />}
          <span className="text-[10px] tabular-nums text-[#5b6780]">
            {expr.currentXp}/{EXPRESSION_XP_MAX}
          </span>
        </div>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-300",
            pct === 0 ? "bg-gray-100" : pct <= 40 ? "bg-[#0056d2]" : "bg-[#137333]"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function PrioritySection({
  title,
  description,
  skills,
}: {
  title: string;
  description: string;
  skills: SkillProgress[];
}) {
  if (skills.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-[#1f1f1f]">{title}</h3>
      <p className="mb-3 text-xs text-[#5b6780]">{description}</p>
      <div className="space-y-2">
        {skills.map((skill) => (
          <SkillCard key={skill.skillId} skill={skill} />
        ))}
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: SkillProgress }) {
  const [expanded, setExpanded] = useState(false);
  const percent = computeSkillPercent(skill.currentXp, skill.xpMax);
  const isMastered = percent >= 100;
  const expressionCount = Object.keys(skill.expressions).length;
  const activeExpressions = Object.values(skill.expressions).filter(
    (e) => e.currentXp > 0
  ).length;

  return (
    <div className={clsx("rounded-xl border bg-white", isMastered ? "border-[#c4eed0]" : "border-[#e3e8ef]")}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        {/* Skill icon */}
        <div className={clsx("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", isMastered ? "bg-[#e6f4ea]" : "bg-[#f0f6ff]")}>
          {isMastered ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#137333] text-white text-[10px]">✓</span>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#0056d2]">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Name + expression count */}
        <div className="min-w-0 flex-1">
          <span className="text-sm font-medium text-[#1f1f1f]">{skill.skillName}</span>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-xs text-[#5b6780]">
              {isMastered ? "Completed" : `${expressionCount} skill expressions`}
            </span>
            <span className="text-xs text-[#c1cad9]">·</span>
            <span className={clsx("text-xs tabular-nums", isMastered ? "font-medium text-[#137333]" : "text-[#5b6780]")}>
              {skill.currentXp.toLocaleString()} / {skill.xpMax.toLocaleString()} XP
            </span>
          </div>
        </div>

        {/* Progress circle + chevron */}
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" className="-rotate-90">
              <circle cx="16" cy="16" r="13" fill="none" stroke="#e3e8ef" strokeWidth="3" />
              <circle
                cx="16" cy="16" r="13"
                fill="none"
                stroke={isMastered ? "#137333" : percent > 0 ? "#0056d2" : "#e3e8ef"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(percent / 100) * 81.68} 81.68`}
              />
            </svg>
            <span className={clsx("absolute text-[9px] font-semibold", isMastered ? "text-[#137333]" : "text-[#1f1f1f]")}>{percent}%</span>
          </div>
          <ChevronDown
            size={16}
            className={clsx("shrink-0 text-[#5b6780] transition-transform duration-200", expanded && "rotate-180")}
          />
        </div>
      </button>

      {/* Expanded: expression breakdown */}
      {expanded && (
        <div className="border-t border-[#e3e8ef] px-4 py-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#9ca3af]">
              Skill expressions
            </span>
            <span className="text-[10px] text-[#9ca3af]">
              {activeExpressions} of {expressionCount} in progress
            </span>
          </div>
          <div className="divide-y divide-[#f3f4f6]">
            {Object.values(skill.expressions).map((expr) => (
              <ExpressionRow key={expr.expressionId} expr={expr} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BelowFoldSection({
  roleProgress,
  mightSkills,
  activeOptionalSkills,
}: {
  roleProgress: RoleProgress;
  mightSkills: SkillProgress[];
  activeOptionalSkills: SkillProgress[];
}) {
  const [showAll, setShowAll] = useState(false);

  const role = ROLE_CATALOG.find((r) => r.id === roleProgress.roleId);

  const trackedIds = new Set(Object.keys(roleProgress.skills));
  const untrackedSkills = role ? role.skills.filter((s) => !trackedIds.has(s.id)) : [];

  // Optional skills with 0 progress
  const notStartedOptional = Object.values(roleProgress.skills).filter(
    (s) => s.priority === "optional" && s.currentXp === 0
  );

  const totalOther = mightSkills.length + activeOptionalSkills.length + notStartedOptional.length + untrackedSkills.length;
  if (totalOther === 0) return null;

  return (
    <div className="border-t border-[#e3e8ef] pt-6">
      <button
        type="button"
        onClick={() => setShowAll(!showAll)}
        className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-4 py-2.5 text-sm font-medium text-[#0056d2] hover:bg-[#f0f6ff] transition-colors"
      >
        {showAll ? "Hide other skills" : `View ${totalOther} other skills for this role`}
        <ChevronDown size={16} className={clsx("transition-transform duration-200", showAll && "rotate-180")} />
      </button>

      {showAll && (
        <div className="mt-4 space-y-6">
          {/* "Might" skills — worth developing */}
          {mightSkills.length > 0 && (
            <PrioritySection
              title="Skills to develop"
              description="Skill areas that deepen your expertise."
              skills={mightSkills}
            />
          )}
          {/* Active optional skills (have XP) */}
          {activeOptionalSkills.length > 0 && (
            <PrioritySection
              title="Optional"
              description="Nice-to-have skills that complement your role."
              skills={activeOptionalSkills}
            />
          )}
          {/* Optional skills not yet started */}
          {notStartedOptional.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#1f1f1f]">Not started</h3>
              <p className="mb-3 text-xs text-[#5b6780]">Additional skills available for this role.</p>
              <div className="space-y-2">
                {notStartedOptional.map((skill) => (
                  <div key={skill.skillId} className="flex items-center justify-between rounded-lg border border-[#e3e8ef] bg-[#fafbfc] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0f6ff]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0056d2]">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#1f1f1f]">{skill.skillName}</span>
                        <p className="text-xs text-[#5b6780]">
                          {Object.keys(skill.expressions).length} expressions · Not started
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Untracked skills from catalog */}
          {untrackedSkills.length > 0 && (
            <div>
              {notStartedOptional.length === 0 && (
                <>
                  <h3 className="text-sm font-semibold text-[#1f1f1f]">Not tracked</h3>
                  <p className="mb-3 text-xs text-[#5b6780]">Additional skills available for this role.</p>
                </>
              )}
              <div className="space-y-2">
                {untrackedSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between rounded-lg border border-[#e3e8ef] bg-[#fafbfc] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#9ca3af]">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#5b6780]">{skill.name}</span>
                        <p className="text-xs text-[#9ca3af]">
                          {skill.expressions.length} expressions · Not tracked
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Group-model renderer (Data Analyst) ────────────────────────────────────
//
// Renders mastery progress for roles that use the {skill × level} group model.
// Required groups (Band 1) sit above the fold; "Other skills" (Band 2 with
// any XP) surface below for learners who earn XP outside the required set.

function GroupSkillRow({ group }: { group: MasteryGroup }) {
  const pct = group.xpMax > 0 ? Math.min(100, Math.round((group.currentXp / group.xpMax) * 100)) : 0;
  const isMastered = group.currentXp >= group.xpMax && group.xpMax > 0;
  return (
    <div className="rounded-lg border border-[#e3e8ef] bg-white px-4 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className={clsx("text-sm font-semibold", isMastered ? "text-[#137333]" : "text-[#0f1114]")}>
          {group.displayName}
        </span>
        <span className="shrink-0 text-xs tabular-nums text-[#5b6780]">
          {isMastered ? (
            <span className="font-semibold text-[#137333]">Mastered</span>
          ) : (
            <>
              <span className="font-semibold text-[#0056d2]">{pct}%</span>
              <span className="ml-1 text-[#c1cad9]">·</span>
              <span className="ml-1">{group.currentXp}/{group.xpMax} XP</span>
            </>
          )}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e3e8ef]">
        <div
          className={clsx("h-full rounded-full transition-all duration-500", isMastered ? "bg-[#137333]" : "bg-[#0056d2]")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function GroupSkillsView({
  roleProgress,
  isInferredOnly,
  inferredRoleTitle,
  plan,
  planScope,
}: {
  roleProgress: GroupRoleProgress;
  isInferredOnly: boolean;
  inferredRoleTitle?: string | null;
  plan?: LearningPlan | null;
  planScope?: "role" | "skills" | null;
}) {
  const sorted = getGroupsByPriority(roleProgress);

  // For skills-focused plans, "required" shrinks to only the groups this plan
  // actually targets — a SQL plan shouldn't make the learner accountable for
  // every Band 1 group of the broader Data Analyst role. For role-focused
  // plans (or when no plan exists), fall back to the role's default required
  // set (Band 1 for DA).
  const planTargetKeySet = plan
    ? new Set(
        plan.milestones.flatMap((m) => m.targetSkills.map((ts) => ts.skillId)),
      )
    : null;
  const isSkillsFocused = planScope === "skills" && planTargetKeySet && planTargetKeySet.size > 0;

  const requiredSet = isSkillsFocused
    ? (planTargetKeySet as Set<string>)
    : new Set(roleProgress.requiredGroupKeys);

  const required = sorted.filter((g) => requiredSet.has(g.key));
  const otherWithProgress = sorted.filter((g) => !requiredSet.has(g.key) && g.currentXp > 0);
  const otherNotStarted = sorted.filter((g) => !requiredSet.has(g.key) && g.currentXp === 0);

  // Overall mastery % is computed against the CURRENTLY-VISIBLE required set.
  // For skills-focused plans this means the number reflects the plan's scope,
  // not the whole Band-1 set — which lines up with the "required" list shown.
  const overallPercent = (() => {
    if (required.length === 0) return 0;
    const totalXp = required.reduce((sum, g) => sum + g.currentXp, 0);
    const maxXp = required.reduce((sum, g) => sum + g.xpMax, 0);
    if (maxXp === 0) return 0;
    return Math.round((totalXp / maxXp) * 100);
  })();
  const isFullyMastered = required.length > 0 && required.every((g) => g.currentXp >= g.xpMax);
  const requiredMastered = required.filter((g) => g.currentXp >= g.xpMax).length;
  const requiredInProgress = required.filter((g) => g.currentXp > 0 && g.currentXp < g.xpMax).length;

  const summaryLabel = isFullyMastered
    ? `All ${required.length} required skills mastered`
    : requiredInProgress > 0
      ? `${requiredInProgress} of ${required.length} required skills in progress`
      : `${required.length} required skills to master`;

  const [showOther, setShowOther] = useState(false);
  const otherTotal = otherWithProgress.length + otherNotStarted.length;

  return (
    <div className="space-y-6">
      {/* Summary card — overall mastery across the visible required set. */}
      <div className={`rounded-xl border p-5 ${isFullyMastered ? "border-[#c4eed0] bg-[#f0faf3]" : "border-[#e3e8ef] bg-[#f0f6ff]"}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#1f1f1f]">
              {isInferredOnly ? `Skills for ${inferredRoleTitle}` : "Your Skill Plan"}
            </h2>
            <p className="text-sm text-[#5b6780]">
              {summaryLabel}
              {requiredMastered > 0 && !isFullyMastered && (
                <span className="ml-1 text-[#137333]">· {requiredMastered} completed</span>
              )}
            </p>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${isFullyMastered ? "text-[#137333]" : "text-[#0056d2]"}`}>{overallPercent}%</span>
            <p className="text-xs text-[#5b6780]">{isFullyMastered ? "complete" : "mastery"}</p>
          </div>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/60">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isFullyMastered ? "bg-[#137333]" : "bg-[#0056d2]"}`}
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Required (Band 1) groups */}
      {required.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-[#1f1f1f]">Required for this plan</h3>
          <div className="space-y-2">
            {required.map((g) => (
              <GroupSkillRow key={g.key} group={g} />
            ))}
          </div>
        </div>
      )}

      {/* "Other skills" — Band 2 groups surfaced as earnable but not required */}
      {otherTotal > 0 && (
        <div className="border-t border-[#e3e8ef] pt-6">
          <button
            type="button"
            onClick={() => setShowOther(!showOther)}
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-4 py-2.5 text-sm font-medium text-[#0056d2] hover:bg-[#f0f6ff] transition-colors"
          >
            {showOther ? "Hide other skills" : `View ${otherTotal} other skills you can earn`}
            <ChevronDown size={16} className={clsx("transition-transform duration-200", showOther && "rotate-180")} />
          </button>
          {showOther && (
            <div className="mt-4 space-y-4">
              {otherWithProgress.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-[#1f1f1f]">In progress</h3>
                  <p className="mb-3 text-xs text-[#5b6780]">Earnable skills outside your required set — not needed to complete the plan.</p>
                  <div className="space-y-2">
                    {otherWithProgress.map((g) => (
                      <GroupSkillRow key={g.key} group={g} />
                    ))}
                  </div>
                </div>
              )}
              {otherNotStarted.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-[#1f1f1f]">Available to explore</h3>
                  <p className="mb-3 text-xs text-[#5b6780]">Additional mastery groups from the data occupation — available if you want to explore beyond this plan.</p>
                  <div className="space-y-2">
                    {otherNotStarted.map((g) => (
                      <div key={g.key} className="flex items-center justify-between rounded-lg border border-[#e3e8ef] bg-[#fafbfc] px-4 py-3">
                        <span className="text-sm font-medium text-[#5b6780]">{g.displayName}</span>
                        <span className="text-xs text-[#9ca3af]">
                          {Object.keys(g.expressions).length} expressions · Not started
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function SkillsTab({
  roleProgress,
  plan,
  planScope,
  hasCourseraPlus = true,
  inferredRoleId,
  inferredRoleTitle,
  inferredRoleConfirmed = false,
  onConfirmInferredRole,
  onChangeInferredRole,
  onUpgrade,
}: SkillsTabProps) {
  // The Skills tab title + subtitle changes for inferred-only learners (no plan yet).
  // Plan-based learners keep "Your Skill Plan".
  const isInferredOnly = !!inferredRoleId && !!inferredRoleTitle;

  // Group-model roles (Data Analyst post-refactor) render a different view.
  if (roleProgress && isGroupRoleProgress(roleProgress)) {
    return (
      <GroupSkillsView
        roleProgress={roleProgress}
        isInferredOnly={isInferredOnly}
        inferredRoleTitle={inferredRoleTitle}
        plan={plan}
        planScope={planScope}
      />
    );
  }

  if (!roleProgress) {
    return (
      <div className="rounded-xl border border-dashed border-[#dae1ed] bg-[#fafbfc] px-6 py-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f6ff]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#0056d2]">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm font-medium text-[#1f1f1f]">No skills identified yet</p>
        <p className="mt-1 text-xs text-[#5b6780]">
          Once you share your career goal, we&apos;ll identify the key skills you need
          and track your progress here.
        </p>
      </div>
    );
  }

  const sortedSkills = getSkillsByPriority(roleProgress);

  // "Should" skills are the learner's plan focus — shown above the fold
  const shouldSkills = sortedSkills.filter((s) => s.priority === "should");
  // Everything else goes below the fold
  const mightSkills = sortedSkills.filter((s) => s.priority === "might");
  const activeOptionalSkills = sortedSkills.filter((s) => s.priority === "optional" && s.currentXp > 0);

  // Summary metrics scoped to "should" skills — the learner's stated plan
  const overallPercent = computeOverallMastery(roleProgress);
  const shouldMastered = shouldSkills.filter((s) => s.currentXp >= s.xpMax).length;
  const shouldInProgress = shouldSkills.filter((s) => s.currentXp > 0 && s.currentXp < s.xpMax).length;

  const summaryLabel = roleProgress.isMastered
    ? `All ${shouldSkills.length} skill areas mastered`
    : shouldInProgress > 0
      ? `${shouldInProgress} of ${shouldSkills.length} skill areas in progress`
      : `${shouldSkills.length} skill areas to master`;

  return (
    <div className="space-y-6">
      {/* Summary card — scoped to "should" skills.
          Inferred-only learners get a different heading + inline confirm/edit affordance. */}
      <div className={`rounded-xl border p-5 ${roleProgress.isMastered ? "border-[#c4eed0] bg-[#f0faf3]" : "border-[#e3e8ef] bg-[#f0f6ff]"}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#1f1f1f]">
              {isInferredOnly
                ? `Skills for ${inferredRoleTitle}`
                : "Your Skill Plan"}
            </h2>
            <p className="text-sm text-[#5b6780]">
              {summaryLabel}
              {shouldMastered > 0 && !roleProgress.isMastered && (
                <span className="ml-1 text-[#137333]">· {shouldMastered} completed</span>
              )}
            </p>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${roleProgress.isMastered ? "text-[#137333]" : "text-[#0056d2]"}`}>{overallPercent}%</span>
            <p className="text-xs text-[#5b6780]">{roleProgress.isMastered ? "complete" : "mastery"}</p>
          </div>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/60">
          <div
            className={`h-full rounded-full transition-all duration-700 ${roleProgress.isMastered ? "bg-[#137333]" : "bg-[#0056d2]"}`}
            style={{ width: `${overallPercent}%` }}
          />
        </div>

        {/* Inferred-role inline confirm/edit — shown when the skills view is scoped
            to an inferred goal (no plan yet). Lets the learner correct the goal here
            without leaving the Skills tab. */}
        {isInferredOnly &&
          inferredRoleId &&
          inferredRoleTitle &&
          onConfirmInferredRole &&
          onChangeInferredRole && (
            <div className="mt-4 rounded-lg border border-white/70 bg-white/70 px-3 py-2.5">
              <InferredRoleControl
                inferredRoleId={inferredRoleId}
                inferredRoleTitle={inferredRoleTitle}
                confirmed={inferredRoleConfirmed}
                onConfirm={onConfirmInferredRole}
                onChangeRole={onChangeInferredRole}
              />
            </div>
          )}
      </div>

      {/* Above the fold: only "should" skills — what the learner needs to master */}
      <PrioritySection
        title="Skills to master"
        description={
          isInferredOnly
            ? `Skill areas commonly required for ${inferredRoleTitle}.`
            : "Skill areas identified from your learning plan."
        }
        skills={shouldSkills}
      />

      {/* Below the fold: might, optional, and untracked skills */}
      <BelowFoldSection
        roleProgress={roleProgress}
        mightSkills={mightSkills}
        activeOptionalSkills={activeOptionalSkills}
      />

      {/* Non-C+ upsell — promotes a personalized plan tailored to these skills */}
      {!hasCourseraPlus && onUpgrade && (
        <UpsellBanner
          variant="inline"
          headline={
            inferredRoleTitle
              ? `Maximize your skill progress for ${inferredRoleTitle}`
              : "Maximize your skill progress with a personalized plan"
          }
          subhead="Coursera Plus builds an AI-tailored plan that focuses your time on the skills you actually need — and adapts as you progress."
          ctaLabel="Upgrade to Coursera Plus"
          onUpgrade={onUpgrade}
        />
      )}
    </div>
  );
}
