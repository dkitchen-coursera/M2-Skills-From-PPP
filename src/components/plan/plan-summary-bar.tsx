import type { RoleProgress } from "@/lib/skills-store";
import {
  computeOverallMastery,
  computeOverallMasteryGroups,
  getRoleUnits,
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
    // Works for both role shapes: getRoleUnits returns a normalized list.
    const units = getRoleUnits(roleProgress);
    const developing = units.filter((u) => u.currentXp > 0).length;
    const mastery = isGroupRoleProgress(roleProgress)
      ? computeOverallMasteryGroups(roleProgress)
      : computeOverallMastery(roleProgress);
    return (
      <div className="text-sm text-[#5b6780]">
        <span className="font-semibold text-[#0f1114]">{role}</span>
        {" \u00b7 "}
        <span>{developing}/{units.length} skills developing</span>
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
