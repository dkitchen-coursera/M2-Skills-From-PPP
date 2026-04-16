"use client";

import type { ChatStatus } from "ai";
import type { AppPhase, ChatUIMessage, GatheredInfo, Persona, StructuredPillData } from "@/lib/types";
import type { LearningPlan } from "@/lib/plan-types";
import clsx from "clsx";
import { LihpHeader } from "@/components/lihp/lihp-header";
import { ProgressivePlanModule } from "@/components/lihp/progressive-plan-module";
import { PersonaBannerCTA } from "@/components/lihp/persona-banner-cta";
import { InProgressSection } from "@/components/lihp/in-progress-section";
import { ExploreCareersSection } from "@/components/lihp/explore-careers-section";
import { TrendingSection } from "@/components/lihp/trending-section";
import { SkillsSection } from "@/components/lihp/skills-section";
import { CollectionSection } from "@/components/lihp/collection-section";
import { PathwaysCollectionSection } from "@/components/lihp/pathways-collection-section";
import { ChatSidePanel } from "@/components/lihp/chat-side-panel";

interface LihpPageProps {
  messages: ChatUIMessage[];
  status: ChatStatus;
  error: Error | undefined;
  suggestedPills: StructuredPillData;
  gatheredInfo: GatheredInfo;
  plan: LearningPlan | null;
  phase: AppPhase;
  persona: Persona;
  viewingPlan: boolean;
  onViewPlan: () => void;
  onBackToHome: () => void;
  onSend: (text: string) => void;
  onRetry: () => void;
  onOpenChat: () => void;
  onSendFromBanner: (text: string) => void;
  pendingRemovals: Set<string>;
  isRefining: boolean;
  planIndicators: Map<number, "created" | "rebuilt" | "swapped">;
  stripQuestions?: boolean;
  swapDisabled?: boolean;
  onRemoveCourse: (courseId: string, courseName: string, milestoneId: string, milestoneName: string) => void;
  onExploreAlternatives: (courseId: string, courseName: string, milestoneId: string, milestoneName: string) => void;
}

export function LihpPage({
  messages,
  status,
  error,
  suggestedPills,
  gatheredInfo,
  plan,
  phase,
  persona,
  viewingPlan,
  onViewPlan,
  onBackToHome,
  onSend,
  onRetry,
  onOpenChat,
  onSendFromBanner,
  pendingRemovals,
  isRefining,
  planIndicators,
  stripQuestions,
  swapDisabled,
  onRemoveCourse,
  onExploreAlternatives,
}: LihpPageProps) {
  const chatPanelOpen = phase !== "browsing";

  return (
    <div className="flex h-screen flex-col bg-white">
      <LihpHeader />
      <div className="relative flex-1 overflow-hidden">
        {/* Main LIHP content - scrollable, always full width */}
        <main className={clsx("h-full overflow-y-auto", chatPanelOpen && "pr-[416px]")}>
          {/* In-progress section — full width, persists through chat */}
          {(persona === "in-progress" || persona === "in-progress-skipped") && (
            <InProgressSection />
          )}

          <div className="py-6 px-8">
            <div className="mx-auto max-w-[1345px]">
              <div className="space-y-8">
                {/* Banner CTA — always visible for personas with extra sections */}
                {phase === "browsing" && (
                  <PersonaBannerCTA
                    persona={persona}
                    gatheredInfo={gatheredInfo}
                    onOpenChat={onOpenChat}
                    onSend={onSendFromBanner}
                  />
                )}

                {/* Progressive plan module — visible once chat is open */}
                {phase !== "browsing" && (
                  <ProgressivePlanModule
                    gatheredInfo={gatheredInfo}
                    plan={plan}
                    isGenerating={phase === "plan_generating"}
                    isRefining={isRefining}
                    onViewPlan={onViewPlan}
                    pendingRemovals={pendingRemovals}
                    swapDisabled={swapDisabled}
                    onRemoveCourse={onRemoveCourse}
                    onExploreAlternatives={onExploreAlternatives}
                  />
                )}

                {/* Explore careers — skipped persona, hidden once plan is generated */}
                {persona === "skipped" && !plan && <ExploreCareersSection />}

                {/* Pathways collection — onboarded and in-progress personas */}
                {persona === "onboarded" && (
                  <PathwaysCollectionSection role="Data Analyst" />
                )}
                {persona === "in-progress" && !plan && (
                  <PathwaysCollectionSection role="Software Developer" />
                )}

                {/* LIHP content always visible */}
                <TrendingSection />
                <SkillsSection />
                <CollectionSection />
              </div>
            </div>
          </div>
        </main>

        {/* Chat side panel — overlays content from the right */}
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
            />
          </aside>
        )}
      </div>
    </div>
  );
}
