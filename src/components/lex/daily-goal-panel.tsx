"use client";

import type { DailyGoal } from "@/lib/lex-types";

function GoalIcon({ icon }: { icon: DailyGoal["icon"] }) {
  if (icon === "star") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.8 5.68L18.5 8.5l-4.25 4.14 1 5.86L10 15.43 4.75 18.5l1-5.86L1.5 8.5l5.7-.82L10 2z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === "practice") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 17V7l7-5 7 5v10H3z" stroke="#0056d2" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 17v-5h4v5" stroke="#0056d2" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="#8040ed" strokeWidth="1.5" />
      <path d="M10 6v4l2.5 2.5" stroke="#8040ed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface DailyGoalPanelProps {
  goals: DailyGoal[];
  completedItems: number;
  completedPractice: number;
}

export function DailyGoalPanel({ goals, completedItems, completedPractice }: DailyGoalPanelProps) {
  function getCurrent(goal: DailyGoal): number {
    if (goal.id === "learning-items") return completedItems;
    if (goal.id === "practice") return completedPractice;
    return 0;
  }

  return (
    <div className="absolute left-1/2 top-[56px] z-40 w-[320px] -translate-x-1/2 rounded-xl border border-[#e3e8ef] bg-white p-4 shadow-lg">
      <h3 className="mb-3 text-sm font-semibold text-[#0f1114]">Today&apos;s Goals</h3>
      <div className="space-y-3">
        {goals.map((goal) => {
          const current = getCurrent(goal);
          const pct = Math.min(100, (current / goal.target) * 100);
          const done = current >= goal.target;
          return (
            <div key={goal.id} className="flex items-center gap-3">
              <GoalIcon icon={goal.icon} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#0f1114]">{goal.label}</span>
                  <span className={`text-xs font-semibold ${done ? "text-[#137333]" : "text-[#5b6780]"}`}>
                    {current}/{goal.target}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e3e8ef]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${done ? "bg-[#137333]" : "bg-[#f59e0b]"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
