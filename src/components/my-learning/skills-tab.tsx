"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import {
  computeOverallMastery,
  computeSkillPercent,
  computeExpressionStage,
  getSkillsByPriority,
  EXPRESSION_XP_MAX,
  type RoleProgress,
  type SkillProgress,
  type ExpressionProgress,
} from "@/lib/skills-store";
import { ROLE_CATALOG } from "@/lib/role-catalog";

// ── Types ──────────────────────────────────────────────────────────────────

interface SkillsTabProps {
  roleProgress: RoleProgress | null;
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

function OtherSkillsSection({ roleProgress }: { roleProgress: RoleProgress }) {
  const [showAll, setShowAll] = useState(false);

  const role = ROLE_CATALOG.find((r) => r.id === roleProgress.roleId);
  if (!role) return null;

  const trackedIds = new Set(Object.keys(roleProgress.skills));
  const untrackedSkills = role.skills.filter((s) => !trackedIds.has(s.id));

  // Optional skills with 0 progress — not shown in the main sections
  const notStartedOptional = Object.values(roleProgress.skills).filter(
    (s) => s.priority === "optional" && s.currentXp === 0
  );

  const totalOther = untrackedSkills.length + notStartedOptional.length;
  if (totalOther === 0) return null;

  return (
    <div className="border-t border-[#e3e8ef] pt-6">
      <button
        type="button"
        onClick={() => setShowAll(!showAll)}
        className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-4 py-2.5 text-sm font-medium text-[#0056d2] hover:bg-[#f0f6ff] transition-colors"
      >
        {showAll ? "Hide other skills" : `View ${totalOther} skills not in progress`}
        <ChevronDown size={16} className={clsx("transition-transform duration-200", showAll && "rotate-180")} />
      </button>

      {showAll && (
        <div className="mt-4 space-y-2">
          {/* Optional skills not yet started */}
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
          {/* Untracked skills from catalog */}
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
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function SkillsTab({ roleProgress }: SkillsTabProps) {
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

  // Show all should/might skills (even if 0 XP) — they're part of the plan
  const allShouldSkills = sortedSkills.filter((s) => s.priority === "should");
  const allMightSkills = sortedSkills.filter((s) => s.priority === "might");
  // Optional skills only shown if they have progress; rest go in expandable section
  const activeOptionalSkills = sortedSkills.filter((s) => s.priority === "optional" && s.currentXp > 0);

  const overallPercent = computeOverallMastery(roleProgress);
  const totalSkills = Object.keys(roleProgress.skills).length;
  const activeSkills = sortedSkills.filter((s) => s.currentXp > 0).length;

  return (
    <div className="space-y-6">
      {/* Summary card */}
      <div className={`rounded-xl border p-5 ${roleProgress.isMastered ? "border-[#c4eed0] bg-[#f0faf3]" : "border-[#e3e8ef] bg-[#f0f6ff]"}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#1f1f1f]">
              {roleProgress.roleTitle} Skills
            </h2>
            <p className="text-sm text-[#5b6780]">
              {roleProgress.isMastered
                ? `All ${totalSkills} skill areas completed`
                : `${activeSkills} of ${totalSkills} skill areas in progress`}
            </p>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${roleProgress.isMastered ? "text-[#137333]" : "text-[#0056d2]"}`}>{overallPercent}%</span>
            <p className="text-xs text-[#5b6780]">{roleProgress.isMastered ? "complete" : "overall mastery"}</p>
          </div>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/60">
          <div
            className={`h-full rounded-full transition-all duration-700 ${roleProgress.isMastered ? "bg-[#137333]" : "bg-[#0056d2]"}`}
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Priority sections — no badge per card, headings explain the grouping */}
      <PrioritySection
        title="Skills to master"
        description="Essential skill areas for your target role."
        skills={allShouldSkills}
      />
      <PrioritySection
        title="Skills to develop"
        description="Skill areas that deepen your expertise."
        skills={allMightSkills}
      />
      <PrioritySection
        title="Optional"
        description="Nice-to-have skills that complement your role."
        skills={activeOptionalSkills}
      />

      {/* Expandable: all other skills not yet in progress */}
      <OtherSkillsSection roleProgress={roleProgress} />
    </div>
  );
}
