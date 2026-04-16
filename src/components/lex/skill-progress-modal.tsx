"use client";

import type { RoleProgress } from "@/lib/skills-store";

interface SkillProgressModalProps {
  roleProgress: RoleProgress | null;
  targetSkillIds: string[];
  onClose: () => void;
}

export function SkillProgressModal({ roleProgress, targetSkillIds, onClose }: SkillProgressModalProps) {
  if (!roleProgress) return null;

  const allSkills = Object.values(roleProgress.skills);
  const targetSkills = allSkills.filter((s) => targetSkillIds.includes(s.skillId));
  const otherSkills = allSkills.filter((s) => !targetSkillIds.includes(s.skillId));
  const orderedSkills = [...targetSkills, ...otherSkills];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-[#0f1114]">Skill Progress</h2>
            <span className="rounded-full bg-[#f0f6ff] px-2 py-0.5 text-[10px] font-semibold text-[#0056d2]">Beta</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#5b6780] hover:bg-[#f0f6ff]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="max-h-[400px] space-y-3 overflow-y-auto">
          {orderedSkills.map((skill) => {
            const pct = skill.xpMax > 0 ? Math.min(100, (skill.currentXp / skill.xpMax) * 100) : 0;
            const isTarget = targetSkillIds.includes(skill.skillId);
            return (
              <div key={skill.skillId}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#0f1114]">
                    {skill.skillName}
                    {isTarget && <span className="ml-1 text-[10px] text-[#0056d2]">★</span>}
                  </span>
                  <span className="text-xs text-[#5b6780]">
                    {skill.currentXp}/{skill.xpMax} XP
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#e3e8ef]">
                  <div
                    className="h-full rounded-full bg-[#0056d2] transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
