import type { PlanMilestone } from "@/lib/plan-types";
import { MoreHorizontal } from "lucide-react";
import { PlanCourseCard } from "./plan-course-card";

interface MilestoneSectionProps {
  milestone: PlanMilestone;
  isFirstMilestone?: boolean;
}

export function MilestoneSection({ milestone, isFirstMilestone }: MilestoneSectionProps) {
  const hasTargetSkills = milestone.targetSkills.length > 0;

  return (
    <div className="rounded-lg border border-[#dae1ed] overflow-hidden">
      <div className="px-4 py-3 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-[#0f1114]">
            {milestone.name}
          </h3>
          <div className="flex items-center gap-2">
            {milestone.badges.length > 0 &&
              milestone.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md bg-[#e3eeff] px-2 py-0.5 text-xs font-medium text-[#0056d2]"
                >
                  {badge}
                </span>
              ))}
            <span className="cursor-default text-[#5b6780]">
              <MoreHorizontal size={16} />
            </span>
          </div>
        </div>
        <p className="text-xs text-[#5b6780]">{milestone.description}</p>
        {hasTargetSkills ? (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {milestone.targetSkills.map((ts) => (
              <span key={ts.skillId} className="inline-flex items-center gap-1 rounded-full bg-[#f2f5fa] px-2 py-0.5">
                <span className="text-xs font-medium text-[#404b61]">
                  {ts.skillName}
                </span>
                <span className="text-[10px] text-[#5b6780]">+{ts.xpTarget} XP</span>
              </span>
            ))}
          </div>
        ) : milestone.skills.length > 0 ? (
          <p className="text-xs text-[#5b6780]">
            Skills: {milestone.skills.slice(0, 3).join(", ")}
          </p>
        ) : null}
      </div>
      <div className="divide-y divide-[#dae1ed] border-t border-[#dae1ed]">
        {milestone.courses.map((course, idx) => (
          <PlanCourseCard
            key={`${milestone.id}-${course.id}-${idx}`}
            course={course}
            isFirstCourse={isFirstMilestone && idx === 0}
          />
        ))}
      </div>
    </div>
  );
}
