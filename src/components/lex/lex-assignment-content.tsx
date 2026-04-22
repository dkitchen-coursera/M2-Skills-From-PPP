"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";
import type { LexItem } from "@/lib/lex-types";
import type { RoleProgress } from "@/lib/skills-store";
import { EXPRESSION_XP_MAX, lookupRoleUnit } from "@/lib/skills-store";
import { findRoleById } from "@/lib/role-catalog";
import { computeItemXpAwards } from "@/lib/lex-data";

interface LexAssignmentContentProps {
  item: LexItem;
  targetSkillIds: string[];
  roleProgress: RoleProgress | null;
  onComplete: () => void;
  onNext?: () => void;
}

const COACH_PROMPTS = [
  { label: "Help me practice", icon: Sparkles },
  { label: "Let's chat", icon: Sparkles },
];

/**
 * Mirrors the M1 prototype: an assignment-details screen → click Start → success-state
 * screen ("You passed! Great job") with per-skill XP cards. No actual quiz UI — this is
 * a prototype simulating the post-completion experience.
 */
export function LexAssignmentContent({
  item,
  targetSkillIds,
  roleProgress,
  onComplete,
  onNext,
}: LexAssignmentContentProps) {
  const [view, setView] = useState<"details" | "success">("details");

  const handleStart = () => {
    setView("success");
    onComplete();
  };

  const handleNext = () => {
    setView("details");
    if (onNext) onNext();
  };

  if (view === "success") {
    return (
      <SuccessView
        item={item}
        targetSkillIds={targetSkillIds}
        roleProgress={roleProgress}
        onBack={() => setView("details")}
        onNext={handleNext}
      />
    );
  }

  return <DetailsView item={item} onStart={handleStart} />;
}

// ── Details view ─────────────────────────────────────────────────────────────

function DetailsView({ item, onStart }: { item: LexItem; onStart: () => void }) {
  const skillSubtitle = item.skillTags[0] ?? "";
  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-y-auto px-8 py-8">
      <div className="mx-auto w-full max-w-[820px]">
        <h1 className="text-2xl font-bold leading-8 tracking-tight text-[#0f1114]">
          {item.title}
        </h1>
        {/* XP + skill tag — only shown when the item awards skill XP. */}
        {skillSubtitle && (
          <p className="mt-1 text-sm text-[#5b6780]">
            <span className="font-semibold text-[#946100]">{item.xpValue} XP</span>
            <span className="mx-1.5">·</span>
            {skillSubtitle}
          </p>
        )}

        <p className="mt-6 text-sm font-medium text-[#5b6780]">
          Review Learning Objectives
        </p>

        {/* Coach */}
        <section className="mt-4 rounded-2xl bg-[#F8FAFC] p-5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[#2F3746]">Coach</h2>
            <span className="rounded bg-[#E2E8F0] px-1.5 py-0.5 text-[11px] font-medium text-[#6B7280]">
              Beta
            </span>
          </div>
          <p className="mt-2 text-sm text-[#0f1114]">
            Ready to review what you&rsquo;ve learned before starting the assignment?
            I&rsquo;m here to help.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {COACH_PROMPTS.map((p) => (
              <button
                key={p.label}
                className="inline-flex items-center gap-2 rounded-[10px] border border-[#0056D2] bg-white px-4 py-2 text-sm font-semibold text-[#0056D2] transition-colors hover:bg-[#f0f6ff]"
              >
                <p.icon size={16} className="shrink-0" strokeWidth={1.75} />
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* Assignment details */}
        <section className="mt-5 rounded-2xl bg-[#F8FAFC] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-[#0f1114]">
                Assignment details.
              </h2>
              <p className="mt-3 text-sm text-[#0f1114]">
                <span className="font-medium">Attempts:</span> Unlimited.
              </p>
            </div>
            <button
              onClick={onStart}
              className="shrink-0 rounded-lg bg-[#0056d2] px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
            >
              Start
            </button>
          </div>
        </section>

        {/* Your grade */}
        <section className="mt-5 rounded-2xl bg-[#F8FAFC] p-6">
          <h2 className="text-base font-semibold text-[#0f1114]">Your grade.</h2>
          <p className="mt-2 text-sm text-[#5b6780]">
            You haven&rsquo;t submitted this yet. We keep your highest score. These grades
            will not affect your overall skill progress.
          </p>
          <p className="mt-3 text-2xl font-bold text-[#5b6780]">--</p>
        </section>
      </div>
    </div>
  );
}

// ── Success view ─────────────────────────────────────────────────────────────

function SuccessView({
  item,
  targetSkillIds,
  roleProgress,
  onBack,
  onNext,
}: {
  item: LexItem;
  targetSkillIds: string[];
  roleProgress: RoleProgress | null;
  onBack: () => void;
  onNext: () => void;
}) {
  // Use the same dispatcher the LEX XP pipeline uses, so the displayed XP
  // deltas match what actually gets recorded. For DA (group-model) this looks
  // up expression-specific awards from the course sheet; other roles fall
  // back to an even split over targetSkillIds. Unmapped DA items award nothing.
  const role = roleProgress ? findRoleById(roleProgress.roleId) : null;
  const skillXpMap = computeItemXpAwards(item, { targetSkillIds, role });

  // Build skill-card data by resolving each awarded key (area id OR group key)
  // via lookupRoleUnit, which dispatches on role shape.
  // If skillXpMap is empty the section is hidden — items that don't contribute
  // to skill mastery have no skill story to tell.
  const skillCards = Object.entries(skillXpMap)
    .map(([key, xpDelta]) => {
      const unit = roleProgress ? lookupRoleUnit(roleProgress, key) : null;
      const fallbackName =
        role?.skills.find((s) => s.id === key)?.name ??
        role?.groups?.find((g) => g.key === key)?.displayName ??
        key;
      const groupMatch = role?.groups?.find((g) => g.key === key);
      const fallbackMax =
        role?.skills.find((s) => s.id === key)?.xpMax ??
        (groupMatch ? groupMatch.expressions.length * EXPRESSION_XP_MAX : EXPRESSION_XP_MAX);
      return {
        skillId: key,
        skillName: unit?.displayName ?? fallbackName,
        xpDelta,
        currentXp: unit?.currentXp ?? xpDelta,
        xpMax: unit?.xpMax ?? fallbackMax,
      };
    })
    .filter((c) => c.xpDelta > 0);

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-y-auto bg-white">
      {/* Top toolbar — Back + title + Close */}
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-[#0056d2] transition-colors hover:text-[#003e9c]"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          Back
        </button>
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold text-[#0f1114]">{item.title}</p>
          <p className="text-xs text-[#5b6780]">
            {item.type === "graded" ? "Graded Assignment" : "Practice Assignment"}
            {item.type !== "graded" && ` · ${item.durationMinutes} min`}
          </p>
        </div>
        <button
          onClick={onNext}
          aria-label="Close and continue"
          className="flex h-9 w-9 items-center justify-center rounded-md text-[#5b6780] transition-colors hover:bg-[#e3e8ef] hover:text-[#0f1114]"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Hero — gradient bg with congratulations + Next item */}
      <section
        className="relative overflow-hidden border-b border-[#dae1ed] px-10 py-10"
        style={{
          background:
            "linear-gradient(180deg, #EAF6E8 0%, #F0F8EE 60%, #F5FAF3 100%)",
        }}
      >
        <h1 className="text-[44px] font-bold leading-[52px] tracking-tight text-[#0f1114]">
          You passed!
          <br />
          Great job on this.
        </h1>
        <p className="mt-2 text-base text-[#0f1114]">Grade received 100%</p>
        <button
          onClick={onNext}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0056d2] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
        >
          Next item
          <ArrowRight size={16} strokeWidth={2} />
        </button>
      </section>

      {/* Skill progress cards */}
      {skillCards.length > 0 && (
        <section className="px-10 pb-12 pt-8">
          <div className="mb-5 flex items-center justify-center gap-2">
            <h2 className="text-sm font-medium text-[#5b6780]">
              Skill progress from this assignment
            </h2>
            <span className="rounded bg-[#0f1114] px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
              Beta
            </span>
          </div>
          <div className="mx-auto grid max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-2">
            {skillCards.map((c) => {
              const pct = Math.min(100, Math.round((c.currentXp / c.xpMax) * 100));
              return (
                <div
                  key={c.skillId}
                  className="rounded-xl border border-[#e3e8ef] bg-[#f8fafc] p-4"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#0f1114]">
                      {c.skillName}
                    </h3>
                    <span className="text-sm font-bold text-[#946100]">
                      +{c.xpDelta}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e3e8ef]">
                    <div
                      className="h-full rounded-full bg-[#137333] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-[#5b6780]">
                    {c.currentXp}/{c.xpMax} XP
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
