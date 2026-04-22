"use client";

import {
  getRoleUnits,
  groupProgressBySkill,
  hasReachedTarget,
  isGroupRoleProgress,
  type AnyRoleProgress,
} from "@/lib/skills-store";

interface RoleMasteryViewProps {
  progress: AnyRoleProgress;
  onExploreNext: () => void;
  onReturnToDashboard: () => void;
}

interface MasteredRow {
  key: string;
  label: string;
}

export function RoleMasteryView({
  progress,
  onExploreNext,
  onReturnToDashboard,
}: RoleMasteryViewProps) {
  // Group-model: one entry per base skill that reached its role target.
  // Legacy area-model: one entry per mastered unit.
  const rows: MasteredRow[] = isGroupRoleProgress(progress)
    ? groupProgressBySkill(progress)
        .filter((s) => s.targetLevel != null && hasReachedTarget(s))
        .map((s) => ({ key: s.skillSlug, label: s.skillName }))
    : getRoleUnits(progress).map((u) => ({ key: u.key, label: u.displayName }));

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6">
      {/* CSS Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="confetti-piece absolute"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              backgroundColor: [
                "var(--cds-color-blue-400)",
                "var(--cds-color-purple-400)",
                "var(--cds-color-green-400)",
                "var(--cds-color-blue-600)",
                "var(--cds-color-purple-600)",
                "#f59e0b",
              ][i % 6],
            }}
          />
        ))}
      </div>

      {/* Trophy */}
      <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-[var(--cds-color-green-50)]">
        <span className="animate-[pulseOpacity_2s_ease-in-out_infinite] text-6xl">
          🏆
        </span>
      </div>

      {/* Heading */}
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
        Congratulations!
      </h1>
      <p className="mb-8 text-center text-base text-gray-600">
        You&apos;ve mastered <strong>{progress.roleTitle}</strong>
      </p>

      {/* Skills checklist */}
      <div className="mb-8 w-full max-w-sm space-y-2">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex items-center gap-3 rounded-lg border border-green-100 bg-[var(--cds-color-green-25)] px-4 py-2.5"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--cds-color-green-600)] text-white text-xs">
              ✓
            </span>
            <span className="text-sm font-medium text-gray-800">
              {row.label}
            </span>
            <span className="ml-auto text-xs font-semibold text-[var(--cds-color-green-700)]">
              Mastered
            </span>
          </div>
        ))}
      </div>

      {/* What's next */}
      <div className="w-full max-w-sm space-y-3">
        <p className="text-center text-sm font-medium text-gray-500">
          What&apos;s next?
        </p>
        <button
          onClick={onExploreNext}
          className="w-full rounded-lg bg-[var(--cds-color-blue-700)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--cds-color-blue-800)]"
        >
          Explore next role goal
        </button>
        <button
          onClick={onReturnToDashboard}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Return to dashboard
        </button>
      </div>

      {/* Confetti animation styles */}
      <style jsx>{`
        .confetti-piece {
          width: 8px;
          height: 8px;
          top: -10px;
          border-radius: 2px;
          animation: confetti-fall linear forwards;
          opacity: 0.9;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
