"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatStatus } from "ai";
import type { AppPhase, ChatUIMessage, GatheredInfo, StructuredPillData } from "@/lib/types";
import type { LearningPlan, PlanCourse } from "@/lib/plan-types";
import type { RoleProgress } from "@/lib/skills-store";
import { LihpHeader } from "@/components/lihp/lihp-header";
import { ChatSidePanel } from "@/components/lihp/chat-side-panel";
import type { InProgressCourse } from "@/lib/mock-persona-data";
import { MyPlanTab } from "./my-plan-tab";
import { InProgressTab } from "./in-progress-tab";
import { SkillsTab } from "./skills-tab";
import { InferredRoleControl } from "./inferred-role-header";

// ── Types ──────────────────────────────────────────────────────────────────

type TabId = "in-progress" | "my-plan" | "completed" | "skills" | "certificates";

interface MyLearningPageProps {
  messages: ChatUIMessage[];
  status: ChatStatus;
  error: Error | undefined;
  suggestedPills: StructuredPillData;
  gatheredInfo: GatheredInfo;
  plan: LearningPlan | null;
  phase: AppPhase;
  isRefining: boolean;
  planIndicators: Map<number, "created" | "rebuilt" | "swapped">;
  stripQuestions?: boolean;
  pendingRemovals: Set<string>;
  swapDisabled?: boolean;
  roleProgress: RoleProgress | null;
  completedCourseIds?: Set<string>;
  /** Courses the learner has actually entered via Resume / Start plan. In Progress tab uses this. */
  startedCourseIds?: Set<string>;
  /** Standalone in-progress courses for returning learners (no plan required). */
  seededInProgressCourses?: InProgressCourse[];
  /** Tier — gates upsell banners + plan setup CTAs */
  hasCourseraPlus?: boolean;
  /** Inferred role — shown in editable header when set and no plan exists */
  inferredRoleId?: string | null;
  inferredRoleTitle?: string | null;
  inferredRoleConfirmed?: boolean;
  onChangeInferredRole?: (roleId: string) => void;
  onConfirmInferredRole?: () => void;
  onUpgrade?: () => void;
  /** Trigger conversational onboarding (used by C+ "Set up your plan" CTA) */
  onStartPlanSetup?: (message?: string) => void;
  onSend: (text: string) => void;
  onRetry: () => void;
  onRemoveCourse: (courseId: string, courseName: string, milestoneId: string, milestoneName: string) => void;
  onExploreAlternatives: (courseId: string, courseName: string, milestoneId: string, milestoneName: string) => void;
  onNavigateHome?: () => void;
  onExploreNextRole?: () => void;
  onResumeCourse?: (course: PlanCourse) => void;
  onStartPlan?: () => void;
  planStarted?: boolean;
}

// ── Tab definitions ────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: "my-plan", label: "My Plan" },
  { id: "in-progress", label: "In progress" },
  { id: "skills", label: "Skills" },
  { id: "completed", label: "Completed" },
  { id: "certificates", label: "Certificates" },
];

// ── Placeholder tab content ───────────────────────────────────────────────

function TabPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[#dae1ed] bg-[#fafbfc] px-6 py-10 text-center">
      <p className="text-sm font-medium text-[#1f1f1f]">{title}</p>
      <p className="mt-1 text-xs text-[#5b6780]">{description}</p>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

export function MyLearningPage({
  messages,
  status,
  error,
  suggestedPills,
  gatheredInfo,
  plan,
  phase,
  isRefining,
  planIndicators,
  stripQuestions,
  pendingRemovals,
  swapDisabled,
  roleProgress,
  completedCourseIds,
  startedCourseIds,
  seededInProgressCourses,
  hasCourseraPlus = true,
  inferredRoleId,
  inferredRoleTitle,
  inferredRoleConfirmed = false,
  onChangeInferredRole,
  onConfirmInferredRole,
  onUpgrade,
  onStartPlanSetup,
  onSend,
  onRetry,
  onRemoveCourse,
  onExploreAlternatives,
  onNavigateHome,
  onExploreNextRole,
  onResumeCourse,
  onStartPlan,
  planStarted,
}: MyLearningPageProps) {
  const [activeTab, setActiveTab] = useState<TabId>("my-plan");
  const tabRefs = useRef<Map<TabId, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Compute animated indicator position
  const updateIndicator = useCallback(() => {
    const el = tabRefs.current.get(activeTab);
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({
      left: elRect.left - parentRect.left,
      width: elRect.width,
    });
  }, [activeTab]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  // Returning learners (inferred role set, no plan yet) land with the chat sidebar
  // closed — they're exploring My Learning, not actively in a planning conversation.
  const isReturningWithoutPlan = !plan && !!inferredRoleId;
  const [chatPanelOpen, setChatPanelOpen] = useState(!isReturningWithoutPlan);
  const roleTitle = roleProgress?.roleTitle ?? gatheredInfo.goal ?? "your career";
  const learnerInitials = "L";

  return (
    <div className="flex h-screen flex-col bg-white">
      <LihpHeader
        activePage="my-learning"
        onNavigate={(page) => {
          if (page === "home" && onNavigateHome) onNavigateHome();
        }}
        onToggleChat={() => setChatPanelOpen((prev) => !prev)}
        chatOpen={chatPanelOpen}
      />
      <div className="relative flex-1 overflow-hidden">
        {/* Main content — scrollable */}
        <main className={chatPanelOpen ? "h-full overflow-y-auto pr-[416px]" : "h-full overflow-y-auto"}>
          {/* Banner — warm yellow background matching M1 prototype */}
          <div className="relative w-full overflow-visible" style={{ background: "#FFF8EB" }}>
            <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-6 py-6">
              {/* Avatar */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e3e8ef] text-base font-semibold text-[#5b6780]">
                {learnerInitials}
              </div>
              {/* Welcome text */}
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <h1 className="text-xl font-semibold text-[#1f1f1f]">
                  My Learning
                </h1>
                {/* Career goal — inline inferred-role control for returning learners w/o plan,
                    static text for plan-based or fallback states */}
                {!plan && inferredRoleId && inferredRoleTitle && onChangeInferredRole && onConfirmInferredRole ? (
                  <InferredRoleControl
                    inferredRoleId={inferredRoleId}
                    inferredRoleTitle={inferredRoleTitle}
                    confirmed={inferredRoleConfirmed}
                    onConfirm={onConfirmInferredRole}
                    onChangeRole={onChangeInferredRole}
                  />
                ) : (
                  <p className="text-sm text-[#5b6780]">
                    Your career goal:{" "}
                    <span className="font-semibold text-[#1f1f1f] underline">
                      {roleTitle}
                    </span>
                  </p>
                )}
              </div>
              {/* Illustration — extends below the banner like M1 prototype */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/banner-illustration.svg"
                alt=""
                className="ml-auto shrink-0 self-end"
                style={{ height: 200, width: "auto", marginBottom: -52, position: "relative", zIndex: 1 }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Tabs + content container */}
          <div className="mx-auto max-w-[1440px] px-6" style={{ paddingTop: 12, paddingBottom: 48 }}>
            {/* Tabs */}
            <div className="relative mb-6 flex gap-6 border-b border-[#e3e8ef]">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => {
                    if (el) tabRefs.current.set(tab.id, el);
                  }}
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    "relative py-3 text-sm transition-colors " +
                    (activeTab === tab.id
                      ? "font-semibold text-[#1f1f1f]"
                      : "text-[#5b6780] hover:text-[#1f1f1f]")
                  }
                  style={{ background: "none", border: "none" }}
                >
                  {tab.label}
                </button>
              ))}
              {/* Animated underline indicator — 4px like M1 */}
              <div
                className="absolute bottom-[-1px] bg-[#0056d2] transition-all duration-300 ease-out"
                style={{ left: indicatorStyle.left, width: indicatorStyle.width, height: 4 }}
              />
            </div>

            {/* Tab content */}
            {activeTab === "in-progress" && (
              <InProgressTab
                plan={plan}
                completedCourseIds={completedCourseIds}
                startedCourseIds={startedCourseIds}
                seededInProgressCourses={seededInProgressCourses}
                onResumeCourse={onResumeCourse}
              />
            )}
            {activeTab === "my-plan" && (
              <MyPlanTab
                gatheredInfo={gatheredInfo}
                plan={plan}
                phase={phase}
                isRefining={isRefining}
                pendingRemovals={pendingRemovals}
                swapDisabled={swapDisabled}
                roleProgress={roleProgress}
                completedCourseIds={completedCourseIds}
                onRemoveCourse={onRemoveCourse}
                onExploreAlternatives={onExploreAlternatives}
                onExploreNextRole={onExploreNextRole}
                onStartPlan={onStartPlan}
                planStarted={planStarted}
                hasCourseraPlus={hasCourseraPlus}
                inferredRoleTitle={inferredRoleTitle}
                onUpgrade={onUpgrade}
                onStartPlanSetup={onStartPlanSetup}
              />
            )}
            {activeTab === "skills" && (
              <SkillsTab
                roleProgress={roleProgress}
                hasCourseraPlus={hasCourseraPlus}
                inferredRoleId={!plan ? inferredRoleId : null}
                inferredRoleTitle={!plan ? inferredRoleTitle : null}
                inferredRoleConfirmed={inferredRoleConfirmed}
                onConfirmInferredRole={onConfirmInferredRole}
                onChangeInferredRole={onChangeInferredRole}
                onUpgrade={onUpgrade}
              />
            )}
            {activeTab === "completed" && (
              <TabPlaceholder
                title="Completed Courses"
                description="Courses you've finished will appear here."
              />
            )}
            {activeTab === "certificates" && (
              <TabPlaceholder
                title="Your Certificates"
                description="View and share all your earned certificates and verified credentials."
              />
            )}
          </div>
        </main>

        {/* Chat side panel */}
        {chatPanelOpen && (
          <aside className="absolute right-0 top-0 flex h-full w-[400px] flex-col border-l border-[#dae1ed] bg-white shadow-[-4px_0_12px_rgba(0,0,0,0.08)]">
            <ChatSidePanel
              messages={messages}
              status={status}
              error={error}
              suggestedPills={suggestedPills}
              phase={phase}
              isRefining={isRefining}
              planIndicators={planIndicators}
              stripQuestions={stripQuestions}
              onSend={onSend}
              onRetry={onRetry}
              onClose={() => setChatPanelOpen(false)}
            />
          </aside>
        )}

      </div>
    </div>
  );
}
