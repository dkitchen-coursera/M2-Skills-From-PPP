"use client";

import type { ReactNode } from "react";
import type { RoleProgress } from "@/lib/skills-store";
import { computeOverallMastery, getSkillsByPriority } from "@/lib/skills-store";
import { RETURNING_NON_CPLUS_RESUME_COURSE } from "@/lib/mock-persona-data";
import { UpsellBanner } from "@/components/shared/upsell-banner";

interface ReturningPlanViewProps {
  roleProgress: RoleProgress | null;
  inferredRoleTitle: string | null;
  /** Slot rendered above the resume + skills sections (e.g. C+ set-up-plan prompt). */
  topCta?: ReactNode;
  /** Slot rendered below the resume + skills sections (e.g. non-C+ upsell banner). */
  bottomCta?: ReactNode;
  onResume?: () => void;
}

function MiniSkillBar({ name, percent }: { name: string; percent: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#0f1114]">{name}</span>
        <span className="text-xs font-medium text-[#4d5765]">{percent}%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e3e8ef]">
        <div
          className="h-full rounded-full bg-[#0056d2] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ResumeCourseSection({ onResume }: { onResume?: () => void }) {
  const resumeCourse = RETURNING_NON_CPLUS_RESUME_COURSE;
  return (
    <section className="rounded-2xl border border-[#e3e8ef] bg-white p-6">
      <h2 className="text-base font-semibold text-[#0f1114]">
        Continue learning
      </h2>
      <p className="mt-1 text-sm text-[#5b6780]">
        Pick up where you left off in your current course.
      </p>

      <div className="mt-5 flex items-center gap-4 rounded-xl border border-[#e3e8ef] bg-[#fafbfc] p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-semibold text-[#4d5765] shadow-sm">
          {resumeCourse.partner[0]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-wide text-[#4d5765]">
            {resumeCourse.partner}
          </div>
          <h3 className="mt-0.5 truncate text-sm font-semibold text-[#0f1114]">
            {resumeCourse.title}
          </h3>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e3e8ef]">
              <div
                className="h-full rounded-full bg-[#137333]"
                style={{ width: `${resumeCourse.progress ?? 0}%` }}
              />
            </div>
            <span className="text-xs font-medium text-[#4d5765]">
              {resumeCourse.progress ?? 0}% complete
            </span>
          </div>
        </div>
        <button
          onClick={onResume}
          className="shrink-0 rounded-lg bg-[#0056d2] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
        >
          Resume
        </button>
      </div>
    </section>
  );
}

function SkillsSnapshotSection({
  roleProgress,
  inferredRoleTitle,
}: {
  roleProgress: RoleProgress | null;
  inferredRoleTitle: string | null;
}) {
  const overallPct = roleProgress ? computeOverallMastery(roleProgress) : 0;
  const topSkills = roleProgress
    ? getSkillsByPriority(roleProgress)
        .filter((s) => s.currentXp > 0)
        .slice(0, 4)
        .map((s) => ({
          name: s.skillName,
          percent: Math.round((s.currentXp / s.xpMax) * 100),
        }))
    : [];

  if (topSkills.length === 0) return null;

  return (
    <section className="rounded-2xl border border-[#e3e8ef] bg-white p-6">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#0f1114]">
            Your skills progress
          </h2>
          <p className="mt-1 text-sm text-[#5b6780]">
            {inferredRoleTitle
              ? `Top skills you've made progress on toward ${inferredRoleTitle}.`
              : "Top skills you've made progress on."}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wide text-[#4d5765]">
            Overall
          </div>
          <div className="text-xl font-bold text-[#0f1114]">{overallPct}%</div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {topSkills.map((s) => (
          <MiniSkillBar key={s.name} name={s.name} percent={s.percent} />
        ))}
      </div>
    </section>
  );
}

/**
 * Shared layout for returning learners on the My Plan tab when no learning plan exists yet.
 * Renders: optional top CTA → resume current course → skills snapshot → optional bottom CTA.
 *
 * - C+ usage: top CTA = "Set up your personalized plan" prompt
 * - Non-C+ usage: bottom CTA = Coursera Plus upsell banner
 */
export function ReturningPlanView({
  roleProgress,
  inferredRoleTitle,
  topCta,
  bottomCta,
  onResume,
}: ReturningPlanViewProps) {
  return (
    <div className="space-y-6">
      {topCta}
      <ResumeCourseSection onResume={onResume} />
      <SkillsSnapshotSection
        roleProgress={roleProgress}
        inferredRoleTitle={inferredRoleTitle}
      />
      {bottomCta}
    </div>
  );
}

/** Backwards-compatible non-C+ view — wraps ReturningPlanView with the upsell at bottom. */
export function NonCPlusPlanView({
  roleProgress,
  inferredRoleTitle,
  onUpgrade,
  onResume,
}: {
  roleProgress: RoleProgress | null;
  inferredRoleTitle: string | null;
  onUpgrade?: () => void;
  onResume?: () => void;
}) {
  return (
    <ReturningPlanView
      roleProgress={roleProgress}
      inferredRoleTitle={inferredRoleTitle}
      onResume={onResume}
      bottomCta={
        onUpgrade && (
          <UpsellBanner
            variant="hero"
            headline={
              inferredRoleTitle
                ? `Get a personalized plan for ${inferredRoleTitle}`
                : "Get a personalized plan toward your career goal"
            }
            subhead="Coursera Plus gives you an AI-built learning plan that maps real Coursera courses to the skills you need — and adapts as you progress."
            ctaLabel="Upgrade to Coursera Plus"
            onUpgrade={onUpgrade}
          />
        )
      }
    />
  );
}
