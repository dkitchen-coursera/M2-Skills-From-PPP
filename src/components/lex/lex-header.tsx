"use client";

import { ChevronDown } from "lucide-react";
import { CourseraLogo } from "@/components/shared/coursera-logo";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9h17M3.5 15h17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function AICoachIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3l1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3z"
        fill="#0056d2"
      />
      <path
        d="M5.5 14l.7 1.8L8 16.5l-1.8.7L5.5 19l-.7-1.8L3 16.5l1.8-.7L5.5 14z"
        fill="#0056d2"
      />
    </svg>
  );
}

/**
 * Daily-goal star — purple when the goal is met, soft grey when pending. Mirrors
 * M1's progress-tracker dot but with a star glyph.
 */
function ProgressStar({ earned, className }: { earned: boolean; className?: string }) {
  if (earned) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 16.875L7.9 19.325c-.367.2-.712.163-1.037-.112-.325-.275-.475-.613-.45-1.013l.65-4.575-3.625-3.075c-.3-.267-.4-.567-.3-.9.1-.333.3-.567.6-.7l4.75-.425L10.363 4.25c.167-.367.4-.55.7-.55s.533.183.7.55l1.875 4.45 4.75.4c.3.033.5.267.6.7.1.333 0 .633-.3.9l-3.625 3.075.65 4.575c.025.4-.125.738-.45 1.013-.325.275-.67.312-1.037.112L12 16.875z"
          fill="#6923de"
        />
      </svg>
    );
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16.875L7.9 19.325c-.367.2-.712.163-1.037-.112-.325-.275-.475-.613-.45-1.013l.65-4.575-3.625-3.075c-.3-.267-.4-.567-.3-.9.1-.333.3-.567.6-.7l4.75-.425L10.363 4.25c.167-.367.4-.55.7-.55s.533.183.7.55l1.875 4.45 4.75.4c.3.033.5.267.6.7.1.333 0 .633-.3.9l-3.625 3.075.65 4.575c.025.4-.125.738-.45 1.013-.325.275-.67.312-1.037.112L12 16.875z"
        fill="#C1CAD9"
      />
    </svg>
  );
}

interface LexHeaderProps {
  completedCount: number;
  dailyGoalTarget: number;
  /** Total number of daily goals (drives the number of stars rendered). */
  totalGoals?: number;
  /** Number of daily goals fully met (drives star fill count). */
  completedGoals?: number;
  /** Label of the current/next focus goal — shown in the pill text when set. */
  currentGoalLabel?: string | null;
  dailyGoalOpen: boolean;
  onToggleDailyGoal: () => void;
  onExit: () => void;
}

export function LexHeader({
  completedCount,
  dailyGoalTarget,
  totalGoals = 3,
  completedGoals = 0,
  currentGoalLabel,
  dailyGoalOpen,
  onToggleDailyGoal,
  onExit,
}: LexHeaderProps) {
  // One star per total daily goal; fill count = number of goals fully met.
  const starsToShow = totalGoals;
  const earnedStars = Math.min(starsToShow, completedGoals);
  // Progress bar reflects the FIRST goal (learning items) so it animates per item.
  const progress = Math.min(100, (completedCount / dailyGoalTarget) * 100);
  // Pill text: while the first goal is in progress, show "X/Y learning items".
  // After it's met, surface the next focus goal label.
  const pillText = completedCount < dailyGoalTarget
    ? `${completedCount}/${dailyGoalTarget} learning items`
    : currentGoalLabel ?? `${completedCount}/${dailyGoalTarget} learning items`;

  return (
    <header className="relative z-30 flex h-[56px] shrink-0 items-center justify-between bg-[#F2F5FA] px-6 pl-4">
      {/* Left: Coursera logo — clicking exits LEX */}
      <button
        onClick={onExit}
        className="flex shrink-0 cursor-pointer items-center"
        aria-label="Coursera Home"
      >
        <CourseraLogo className="h-4" />
      </button>

      {/* Center: Daily-goal progress tracker pill */}
      <div className="absolute left-1/2 z-[1001] -translate-x-1/2">
        <button
          onClick={onToggleDailyGoal}
          className="flex h-9 items-center gap-3 rounded-2xl border border-[#DAE2ED] bg-white px-4 transition-colors hover:bg-[#fafbfc]"
          aria-expanded={dailyGoalOpen}
          aria-haspopup="true"
        >
          <span className="text-sm leading-5 text-[#0f1114]">
            {pillText}
          </span>
          <div className="h-1 w-[124px] shrink-0 overflow-hidden rounded-full bg-[#DAE2ED]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #A678F5 0%, #4A0FAB 99%)",
              }}
            />
          </div>
          <div className="h-5 w-px shrink-0 self-center bg-[#DAE2ED]" />
          <div className="flex items-center gap-1">
            {Array.from({ length: starsToShow }).map((_, i) => (
              <ProgressStar
                key={i}
                earned={i < earnedStars}
                className="h-5 w-5"
              />
            ))}
          </div>
          <ChevronDown
            size={20}
            strokeWidth={2}
            className={`shrink-0 text-[#5b6780] transition-transform duration-200 ${
              dailyGoalOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Right: Language + AI Coach + Avatar */}
      <div className="flex shrink-0 items-center gap-1">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-[#5b6780] transition-colors hover:bg-[#e3e8ef] hover:text-[#0f1114]"
          aria-label="Language"
        >
          <GlobeIcon className="h-6 w-6" />
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-[#e3e8ef]"
          aria-label="AI Coach"
        >
          <AICoachIcon className="h-7 w-7" />
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0056d2] text-sm font-semibold text-white"
          aria-label="Account"
        >
          L
        </button>
      </div>
    </header>
  );
}
