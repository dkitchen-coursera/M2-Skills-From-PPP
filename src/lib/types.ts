import type { UIMessage } from "ai";
import type { LearningPlan, PlanCourse } from "@/lib/plan-types";
import type { GapAnalysis } from "@/lib/skills-store";

export type Persona =
  | "default"
  | "skipped"
  | "onboarded"
  | "in-progress"
  | "in-progress-skipped"
  // Differentiated segments (April 2026)
  | "new-cplus"
  | "new-non-cplus"
  | "returning-cplus"
  | "returning-non-cplus";

export type AppPhase =
  | "entry"
  | "browsing"
  | "loading"
  | "full_screen_chat"
  | "chatting"
  | "ready_for_plan"
  | "plan_generating"
  | "plan_generated"
  | "viewing_plan"
  | "role_mastery"
  | "learning"
  | "course_complete"
  | "upgrade_confirmation";

export type PlanScope = "role" | "skills";

export type GatheredInfo = {
  goal: string | null;
  skills: string | null;
  background: string | null;
  constraints: string | null;
  /** For returning learners: whether they want a role-wide or skills-focused plan. */
  planScope?: PlanScope | null;
};

export type StructuredPillData = {
  type: "multi" | "single";
  question: string;
  options: string[];
};

export type ConversationStateData = {
  gathered_info: GatheredInfo;
  ready_for_plan: boolean;
  suggested_pills: StructuredPillData;
};

export type DebugLogEntry = {
  label: string;
  detail?: Record<string, unknown>;
  ts: string;
};

/** Role identification result from the AI during onboarding. */
export type RoleIdentificationData = {
  roleId: string;
  roleTitle: string;
  gapAnalysis: GapAnalysis;
};

export type ChatUIMessage = UIMessage<
  never,
  {
    "conversation-state": ConversationStateData;
    "plan-generating": { status: string };
    "learning-plan": LearningPlan;
    "plan-updated": { message: string };
    "course-swap": { milestoneId: string; oldCourseId: string; newCourse: PlanCourse };
    "role-identified": RoleIdentificationData;
    "skill-xp-update": { skillId: string; xpEarned: number; newTotal: number };
    "debug-log": DebugLogEntry;
  }
>;
