"use client";

import { Sparkles } from "lucide-react";
import type { AppPhase, GatheredInfo } from "@/lib/types";
import type { LearningPlan } from "@/lib/plan-types";
import type { RoleProgress } from "@/lib/skills-store";
import { ProgressivePlanModule } from "@/components/lihp/progressive-plan-module";
import { NonCPlusPlanView, ReturningPlanView } from "./non-cplus-plan-view";

interface MyPlanTabProps {
  gatheredInfo: GatheredInfo;
  plan: LearningPlan | null;
  phase: AppPhase;
  isRefining: boolean;
  pendingRemovals: Set<string>;
  swapDisabled?: boolean;
  roleProgress: RoleProgress | null;
  completedCourseIds?: Set<string>;
  onRemoveCourse: (courseId: string, courseName: string, milestoneId: string, milestoneName: string) => void;
  onExploreAlternatives: (courseId: string, courseName: string, milestoneId: string, milestoneName: string) => void;
  onExploreNextRole?: () => void;
  onStartPlan?: () => void;
  planStarted?: boolean;
  // Differentiated Segments
  hasCourseraPlus?: boolean;
  inferredRoleTitle?: string | null;
  onUpgrade?: () => void;
  onStartPlanSetup?: (message?: string) => void;
  /** Resume the seeded "Continue learning" course shown to returning learners (no plan yet). */
  onResumeSeededCourse?: () => void;
}

function CompletedMilestone({ name, description }: { name: string; description: string }) {
  return (
    <div className="rounded-lg border border-[#c4eed0] bg-[#f0faf3] px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#137333] text-white text-xs">✓</span>
        <h3 className="text-sm font-semibold text-[#137333]">{name}</h3>
      </div>
      <p className="mt-1 ml-7 text-xs text-[#5b6780]">{description}</p>
    </div>
  );
}

export function MyPlanTab({
  gatheredInfo,
  plan,
  phase,
  isRefining,
  pendingRemovals,
  swapDisabled,
  roleProgress,
  completedCourseIds,
  onRemoveCourse,
  onExploreAlternatives,
  onExploreNextRole,
  onStartPlan,
  planStarted,
  hasCourseraPlus = true,
  inferredRoleTitle,
  onUpgrade,
  onStartPlanSetup,
  onResumeSeededCourse,
}: MyPlanTabProps) {
  if (roleProgress?.isMastered && plan) {
    return (
      <div className="space-y-6">
        {/* Congratulations banner */}
        <div className="rounded-2xl border border-[#c4eed0] bg-[#f0faf3] p-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f4ea]">
            <span className="text-3xl">🏆</span>
          </div>
          <h2 className="text-xl font-bold text-[#0f1114]">
            Congratulations!
          </h2>
          <p className="mt-1 text-sm text-[#5b6780]">
            You&apos;ve completed your <strong>{roleProgress.roleTitle}</strong> skill mastery plan.
            All milestones and skills have been achieved.
          </p>
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={onExploreNextRole}
              className="rounded-lg bg-[#0056d2] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0048b0] transition-colors"
            >
              Explore your next learning goal
            </button>
          </div>
        </div>

        {/* Completed plan title */}
        <div className="rounded-2xl border border-[#e3e8ef] bg-white p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#137333] text-white text-xs">✓</span>
            <h2 className="text-base font-semibold text-[#0f1114]">{plan.title}</h2>
          </div>
          <p className="ml-7 text-sm text-[#5b6780]">
            {plan.summary.totalDuration} · ~{plan.summary.hoursPerWeek}
          </p>
        </div>

        {/* Completed milestones */}
        <div className="space-y-3">
          {plan.milestones.map((milestone) => (
            <CompletedMilestone
              key={milestone.id}
              name={milestone.name}
              description={milestone.description}
            />
          ))}
        </div>
      </div>
    );
  }

  // Non-C+ returning view — resume current course + skills snapshot + upsell at bottom
  if (!plan && phase !== "plan_generating" && !hasCourseraPlus) {
    return (
      <NonCPlusPlanView
        roleProgress={roleProgress}
        inferredRoleTitle={inferredRoleTitle ?? null}
        onUpgrade={onUpgrade}
        onResume={onResumeSeededCourse}
      />
    );
  }

  // Returning C+ view — set-up-plan prompt at top, then resume + skills snapshot
  if (!plan && phase !== "plan_generating" && hasCourseraPlus && inferredRoleTitle && onStartPlanSetup) {
    return (
      <ReturningPlanView
        roleProgress={roleProgress}
        inferredRoleTitle={inferredRoleTitle}
        onResume={onResumeSeededCourse}
        topCta={
          <div className="rounded-2xl border border-[#dae1ed] bg-gradient-to-br from-[#f0f6ff] to-white p-6 shadow-[0_1px_2px_rgba(15,17,20,0.04)]">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f0fe]">
                <Sparkles className="h-5 w-5 text-[#0056d2]" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-[#0f1114]">
                  {`Set up your personalized plan for ${inferredRoleTitle}`}
                </h2>
                <p className="mt-1 text-sm text-[#4d5765]">
                  We&rsquo;ll build a step-by-step plan from real Coursera courses,
                  tailored to your goal and current skills. You can edit it any time.
                </p>
                <button
                  onClick={() => onStartPlanSetup()}
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-[#0056d2] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
                >
                  Set up my plan
                </button>
              </div>
            </div>
          </div>
        }
      />
    );
  }

  // No-op for onViewPlan — plan is already visible in this tab
  const handleViewPlan = () => {};

  return (
    <div className="space-y-6">
      {/* Plan module — shows progressive status during gathering, full plan when ready */}
      <ProgressivePlanModule
        gatheredInfo={gatheredInfo}
        plan={plan}
        isGenerating={phase === "plan_generating"}
        isRefining={isRefining}
        onViewPlan={handleViewPlan}
        pendingRemovals={pendingRemovals}
        swapDisabled={swapDisabled}
        completedCourseIds={completedCourseIds}
        onRemoveCourse={onRemoveCourse}
        onExploreAlternatives={onExploreAlternatives}
        onStartPlan={onStartPlan}
        planStarted={planStarted}
      />

      {/* Empty state when no plan and not generating — shown only for C+ no-inferred-role
          fallback (regular new-C+ flow shows ProgressivePlanModule instead). */}
      {!plan && phase !== "plan_generating" && !inferredRoleTitle && (
        <div className="rounded-xl border border-dashed border-[#dae1ed] bg-[#fafbfc] px-6 py-10 text-center">
          <p className="text-sm text-[#5b6780]">
            Your personalized learning plan will appear here once we finish
            gathering your goals and preferences.
          </p>
          <p className="mt-1 text-xs text-[#9ca3af]">
            Use the chat to continue the conversation.
          </p>
        </div>
      )}
    </div>
  );
}
