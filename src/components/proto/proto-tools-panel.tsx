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
  onJumpToRole: (roleId: string) => void;
}

export function ProtoToolsPanel({
  roleProgress,
  onSetAllMastered,
  onSetRandomProgress,
  onResetProgress,
  onTriggerMastery,
  onJumpToRole,
}: ProtoToolsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

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

          {/* Jump to role */}
          <div className="mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Jump to role
            </label>
            <select
              onChange={(e) => {
                if (e.target.value) onJumpToRole(e.target.value);
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
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

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={onSetAllMastered}
              disabled={!roleProgress}
              className="w-full rounded-lg bg-[var(--cds-color-green-600)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--cds-color-green-700)] disabled:opacity-40"
            >
              Set All Mastered
            </button>
            <button
              onClick={onSetRandomProgress}
              disabled={!roleProgress}
              className="w-full rounded-lg bg-[var(--cds-color-purple-600)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--cds-color-purple-700)] disabled:opacity-40"
            >
              Set Random Progress
            </button>
            <button
              onClick={onResetProgress}
              disabled={!roleProgress}
              className="w-full rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-40"
            >
              Reset Progress
            </button>
            <button
              onClick={onTriggerMastery}
              disabled={!roleProgress}
              className="w-full rounded-lg bg-[var(--cds-color-blue-700)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--cds-color-blue-800)] disabled:opacity-40"
            >
              Trigger Role Mastery
            </button>
          </div>

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
