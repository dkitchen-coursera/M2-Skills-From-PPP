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

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 1l2.245 4.55L15 6.257l-3.5 3.412.826 4.818L8 12.345 3.674 14.487l.826-4.818L1 6.257l4.755-.707L8 1z"
        fill={filled ? "#f59e0b" : "none"}
        stroke={filled ? "#f59e0b" : "#c1cad9"}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LexHeaderProps {
  completedCount: number;
  dailyGoalTarget: number;
  dailyGoalOpen: boolean;
  onToggleDailyGoal: () => void;
  onExit: () => void;
}

export function LexHeader({
  completedCount,
  dailyGoalTarget,
  dailyGoalOpen,
  onToggleDailyGoal,
  onExit,
}: LexHeaderProps) {
  const starsEarned = Math.min(3, Math.floor((completedCount / dailyGoalTarget) * 3));
  const progress = Math.min(100, (completedCount / dailyGoalTarget) * 100);

  return (
    <header className="sticky top-0 z-30 flex h-[56px] items-center border-b border-[#dae1ed] bg-white px-4">
      {/* Left: Coursera logo — clicking exits LEX */}
      <button onClick={onExit} className="shrink-0 cursor-pointer">
        <CourseraLogo className="h-5" />
      </button>

      {/* Center: Daily goal tracker */}
      <div className="mx-auto flex items-center">
        <button
          onClick={onToggleDailyGoal}
          className="flex items-center gap-2 rounded-full border border-[#e3e8ef] bg-[#fafbfc] px-3 py-1.5 transition-colors hover:bg-[#f0f6ff]"
        >
          <div className="flex items-center gap-0.5">
            <StarIcon filled={starsEarned >= 1} className="h-4 w-4" />
            <StarIcon filled={starsEarned >= 2} className="h-4 w-4" />
            <StarIcon filled={starsEarned >= 3} className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#5b6780]">
              {completedCount}/{dailyGoalTarget} learning items
            </span>
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#e3e8ef]">
              <div
                className="h-full rounded-full bg-[#f59e0b] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <ChevronDown
            size={14}
            className={`text-[#5b6780] transition-transform duration-200 ${dailyGoalOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Right: Globe + Avatar */}
      <div className="flex shrink-0 items-center gap-2">
        <button className="flex h-8 w-8 items-center justify-center text-[#5b6780] hover:text-[#0f1114]">
          <GlobeIcon className="h-5 w-5" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0056d2] text-xs font-semibold text-white">
          L
        </div>
      </div>
    </header>
  );
}
