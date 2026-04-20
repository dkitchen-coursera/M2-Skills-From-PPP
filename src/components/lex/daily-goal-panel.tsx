"use client";

import type { DailyGoal } from "@/lib/lex-types";

/**
 * Star glyph matching the LexHeader pill — purple when the goal is met, soft grey
 * when pending. All daily goals use the same star icon for consistency with the
 * tracker pill (per M1 prototype).
 */
function GoalStar({ earned }: { earned: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16.875L7.9 19.325c-.367.2-.712.163-1.037-.112-.325-.275-.475-.613-.45-1.013l.65-4.575-3.625-3.075c-.3-.267-.4-.567-.3-.9.1-.333.3-.567.6-.7l4.75-.425L10.363 4.25c.167-.367.4-.55.7-.55s.533.183.7.55l1.875 4.45 4.75.4c.3.033.5.267.6.7.1.333 0 .633-.3.9l-3.625 3.075.65 4.575c.025.4-.125.738-.45 1.013-.325.275-.67.312-1.037.112L12 16.875z"
        fill={earned ? "#6923de" : "#C1CAD9"}
      />
    </svg>
  );
}

interface DailyGoalPanelProps {
  goals: DailyGoal[];
  completedItems: number;
  completedPractice: number;
  completedGraded?: number;
}

export function DailyGoalPanel({
  goals,
  completedItems,
  completedPractice,
  completedGraded = 0,
}: DailyGoalPanelProps) {
  function getCurrent(goal: DailyGoal): number {
    if (goal.id === "learning-items") return completedItems;
    if (goal.id === "practice") return completedPractice;
    if (goal.id === "graded") return completedGraded;
    return 0;
  }

  return (
    <div className="absolute left-1/2 top-[56px] z-40 w-[360px] -translate-x-1/2 rounded-2xl border border-[#dae1ed] bg-white p-4 shadow-lg">
      <div className="space-y-2.5">
        {goals.map((goal) => {
          const current = getCurrent(goal);
          const done = current >= goal.target;
          // Show "X/Y" suffix only for the goal currently in progress (not yet met).
          const showProgress = !done && current > 0 && goal.target > 1;
          return (
            <div key={goal.id} className="flex items-center gap-3">
              <GoalStar earned={done} />
              <div className="flex-1 text-sm leading-5 text-[#0f1114]">
                {goal.label}
                {showProgress && (
                  <span className="ml-1 text-[#5b6780]">
                    {" "}
                    - {current}/{goal.target}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
