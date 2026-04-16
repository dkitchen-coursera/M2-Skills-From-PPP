"use client";

import type { LexModule } from "@/lib/lex-types";
import { computeItemXp } from "@/lib/lex-data";

interface LexModuleCompleteModalProps {
  module: LexModule;
  onContinue: () => void;
}

export function LexModuleCompleteModal({ module, onContinue }: LexModuleCompleteModalProps) {
  const allItems = module.lessonGroups.flatMap((g) => g.items);
  const totalXp = allItems.reduce((sum, item) => sum + computeItemXp(item.type, item.durationMinutes), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
        {/* Confetti */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                width: "6px",
                height: "6px",
                borderRadius: "1px",
                backgroundColor: ["#0056d2", "#8040ed", "#137333", "#f59e0b", "#dc2626", "#06b6d4"][i % 6],
                animation: `confetti-fall ${2 + Math.random() * 2}s linear ${Math.random() * 2}s forwards`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>

        <div className="relative text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0faf3]">
            <span className="text-4xl">🎉</span>
          </div>
          <h3 className="text-xl font-bold text-[#0f1114]">Module Complete!</h3>
          <p className="mt-1 text-sm text-[#5b6780]">{module.title}{module.subtitle ? ` — ${module.subtitle}` : ""}</p>

          <div className="mt-4 rounded-lg bg-[#f0f6ff] px-4 py-4">
            <p className="text-3xl font-bold text-[#0056d2]">+{totalXp} XP</p>
            <p className="text-xs text-[#5b6780]">{allItems.length} items completed</p>
          </div>

          <button
            onClick={onContinue}
            className="mt-5 w-full rounded-lg bg-[#0056d2] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0048b0]"
          >
            Continue Learning
          </button>
        </div>

        <style jsx>{`
          @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(60vh) rotate(720deg); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}
