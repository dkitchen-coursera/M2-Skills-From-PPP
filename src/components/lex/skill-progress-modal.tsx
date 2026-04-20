"use client";

import { X } from "lucide-react";
import type { RoleProgress, SkillProgress } from "@/lib/skills-store";

interface SkillProgressModalProps {
  roleProgress: RoleProgress | null;
  targetSkillIds: string[];
  onClose: () => void;
}

function SkillRow({ skill }: { skill: SkillProgress }) {
  const pct = skill.xpMax > 0 ? Math.min(100, (skill.currentXp / skill.xpMax) * 100) : 0;
  return (
    <div className="py-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-[#0f1114]">{skill.skillName}</span>
        <span className="shrink-0 text-xs text-[#5b6780]">
          {skill.currentXp}/{skill.xpMax} XP
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E3EEFF]">
        <div
          className="h-full rounded-full bg-[#0056d2] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function SkillProgressModal({ roleProgress, targetSkillIds, onClose }: SkillProgressModalProps) {
  if (!roleProgress) return null;

  const allSkills = Object.values(roleProgress.skills);
  // Order: target skills (in plan) first, then any other skills with progress
  const targetSkills = allSkills.filter((s) => targetSkillIds.includes(s.skillId));
  const otherWithProgress = allSkills.filter(
    (s) => !targetSkillIds.includes(s.skillId) && s.currentXp > 0,
  );
  const orderedSkills = [...targetSkills, ...otherWithProgress];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-[440px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-[#5b6780] transition-colors hover:bg-[#e3e8ef] hover:text-[#0f1114]"
          >
            <X size={20} strokeWidth={2} />
          </button>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xl font-semibold text-[#0f1114]">Skill Progress</h2>
            <span className="rounded-full bg-[#f0f6ff] px-2 py-0.5 text-[11px] font-semibold text-[#0056d2]">
              Beta
            </span>
          </div>
          <p className="mx-auto mt-3 max-w-[340px] text-center text-sm leading-5 text-[#4d5765]">
            Here are the latest skills you&rsquo;ve been building on Coursera. Continue
            completing learning items to earn Skill Points!
          </p>
        </div>

        {/* Skill list */}
        <div className="flex-1 overflow-y-auto px-6 pt-4">
          {orderedSkills.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#5b6780]">
              Complete a learning item to start earning skill XP.
            </p>
          ) : (
            <div className="divide-y divide-[#f0f2f5]">
              {orderedSkills.map((skill) => (
                <SkillRow key={skill.skillId} skill={skill} />
              ))}
            </div>
          )}
        </div>

        {/* Footer link */}
        <div className="border-t border-[#dae1ed] px-6 py-3 text-center">
          <button className="text-sm font-semibold text-[#0056d2] hover:underline">
            See all skills
          </button>
        </div>
      </div>
    </div>
  );
}
