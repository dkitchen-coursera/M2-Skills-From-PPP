"use client";

import type { AppPhase, GatheredInfo } from "@/lib/types";
import type { LearningPlan } from "@/lib/plan-types";
import type { RoleProgress } from "@/lib/skills-store";
import { ProgressivePlanModule } from "@/components/lihp/progressive-plan-module";

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

      {/* Empty state when no plan and not generating */}
      {!plan && phase !== "plan_generating" && (
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
