import type { RoleProgress } from "@/lib/skills-store";
import {
  computeOverallMastery,
  computeOverallMasteryGroups,
  getBaseSkillCounts,
  isGroupRoleProgress,
} from "@/lib/skills-store";

interface PlanSummaryBarProps {
  role: string;
  skills: string[];
  duration: string;
  hoursPerWeek: string;
  roleProgress?: RoleProgress | null;
}

export function PlanSummaryBar({
  role,
  skills,
  duration,
  hoursPerWeek,
  roleProgress,
}: PlanSummaryBarProps) {
  if (roleProgress) {
    const { totalSkills, activeSkills } = getBaseSkillCounts(roleProgress);
    const mastery = isGroupRoleProgress(roleProgress)
      ? computeOverallMasteryGroups(roleProgress)
      : computeOverallMastery(roleProgress);
    return (
      <div className="text-sm text-[#5b6780]">
        <span className="font-semibold text-[#0f1114]">{role}</span>
        {" \u00b7 "}
        <span>{activeSkills}/{totalSkills} skills developing</span>
        {" \u00b7 "}
        <span className="font-medium text-[var(--cds-color-blue-700)]">{mastery}% mastery</span>
      </div>
    );
  }

  return (
    <div className="text-sm text-[#5b6780]">
      <span className="font-semibold text-[#0f1114]">{role}</span>
      {" \u00b7 "}
      {skills.slice(0, 3).join(", ")}
      {" \u00b7 "}
      {duration}
      {" \u00b7 ~"}
      {hoursPerWeek}
    </div>
  );
}
