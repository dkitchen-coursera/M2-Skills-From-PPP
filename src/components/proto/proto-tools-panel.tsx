"use client";

import { useState } from "react";
import { ROLE_CATALOG } from "@/lib/role-catalog";
import type { RoleProgress } from "@/lib/skills-store";

interface ProtoToolsPanelProps {
  roleProgress: RoleProgress | null;
  onSetAllMastered: () => void;
  onSetRandomProgress: () => void;
  onResetProgress: () => void;
  onTriggerMastery: () => void;
  onTriggerModuleComplete: () => void;
  onTriggerCourseComplete: () => void;
  onJumpToRole: (roleId: string) => void;
  isInLex?: boolean;
}

export function ProtoToolsPanel({
  roleProgress,
  onSetAllMastered,
  onSetRandomProgress,
  onResetProgress,
  onTriggerMastery,
  onTriggerModuleComplete,
  onTriggerCourseComplete,
  onJumpToRole,
  isInLex,
}: ProtoToolsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showPppTools, setShowPppTools] = useState(false);

  return (
    <>
      {/* FAB toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-transform hover:scale-105 hover:bg-gray-700"
        title="Proto Tools"
      >
        <span className="text-lg">{isOpen ? "X" : "P"}</span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
          <h3 className="mb-3 text-sm font-bold text-gray-900">
            Proto Tools
          </h3>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={onTriggerMastery}
              disabled={!roleProgress}
              className="w-full rounded-lg bg-[var(--cds-color-blue-700)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--cds-color-blue-800)] disabled:opacity-40"
            >
              Trigger Role Mastery
            </button>
            <button
              onClick={onTriggerModuleComplete}
              disabled={!isInLex}
              className="w-full rounded-lg bg-[#F28100] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d97000] disabled:opacity-40"
            >
              Trigger Module Complete
            </button>
            <button
              onClick={onTriggerCourseComplete}
              disabled={!isInLex}
              className="w-full rounded-lg bg-[#8040ed] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6b30d4] disabled:opacity-40"
            >
              Trigger Course Complete
            </button>
          </div>

          {/* PPP demo tools dropdown */}
          <button
            onClick={() => setShowPppTools(!showPppTools)}
            className="mt-3 flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            PPP demo tools
            <span className="text-[10px]">{showPppTools ? "\u25B2" : "\u25BC"}</span>
          </button>
          {showPppTools && (
            <div className="mt-1 space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Jump to role
                </label>
                <select
                  onChange={(e) => {
                    if (e.target.value) onJumpToRole(e.target.value);
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a role...
                  </option>
                  {ROLE_CATALOG.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={onSetAllMastered}
                disabled={!roleProgress}
                className="w-full rounded-lg bg-[var(--cds-color-green-600)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--cds-color-green-700)] disabled:opacity-40"
              >
                Set All Mastered
              </button>
              <button
                onClick={onSetRandomProgress}
                disabled={!roleProgress}
                className="w-full rounded-lg bg-[var(--cds-color-purple-600)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--cds-color-purple-700)] disabled:opacity-40"
              >
                Set Random Progress
              </button>
              <button
                onClick={onResetProgress}
                disabled={!roleProgress}
                className="w-full rounded-lg bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-40"
              >
                Reset Progress
              </button>
            </div>
          )}

          {/* Feature list toggle */}
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="mt-3 w-full text-left text-xs text-[var(--cds-color-blue-700)] hover:underline"
          >
            {showFeatures ? "Hide" : "Show"} feature list
          </button>
          {showFeatures && (
            <div className="mt-2 rounded-lg bg-gray-50 p-3 text-xs text-gray-600 space-y-1">
              <p className="font-semibold text-gray-800">Prototype Features:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Conversational onboarding to identify goal role &amp; current experience</li>
                <li>Skills-focused course plan generation (master skills, not just complete courses)</li>
                <li>Course item completion earns Skill XP toward role goals</li>
                <li>Role-focused Skills tab highlighting goal-relevant skills</li>
                <li>Module complete celebration with skill progress &amp; plan-level mastery %</li>
                <li>Course complete screen with certificate, LinkedIn share &amp; plan progress timeline</li>
                <li>Role mastery celebration on plan completion</li>
                <li>Role catalog (4 roles, 8 skills each)</li>
                <li>XP-based progress tracking (0-1500 per skill)</li>
                <li>Proto tools for demo events</li>
              </ul>
            </div>
          )}

          {/* Current state debug */}
          {roleProgress && (
            <div className="mt-3 rounded-lg bg-gray-50 p-2 text-xs text-gray-500">
              <span className="font-medium">Active:</span> {roleProgress.roleTitle}
              {roleProgress.isMastered && " (Mastered)"}
            </div>
          )}
        </div>
      )}
    </>
  );
}
