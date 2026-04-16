import { z } from "zod";

export const buildPlanInputSchema = z.object({
  title: z.string().describe("Plan title, e.g. 'Data Analyst Learning Plan'"),
  role: z.string().describe("Target role or learning goal"),
  skills: z
    .array(z.string())
    .describe("3-5 key skills the plan develops"),
  totalDuration: z
    .string()
    .describe("Estimated total duration, e.g. '3-6 months'"),
  hoursPerWeek: z
    .string()
    .describe("Learner's weekly commitment, e.g. '~6 hours/week'"),
  skillBreakdown: z
    .object({
      should: z.array(z.string()).describe("Skill names the learner should master"),
      might: z.array(z.string()).describe("Skill names the learner might need to deepen"),
      optional: z.array(z.string()).describe("Optionally beneficial skill names"),
    })
    .optional()
    .describe("Skill gap categorization based on current vs. desired role"),
  milestones: z.array(
    z.object({
      name: z
        .string()
        .describe("Milestone name in format 'Phase N: Master [Skill X, Y] (duration)', e.g. 'Phase 1: Master Data Integrity & Analysis (1-3 months)'"),
      description: z
        .string()
        .describe("Milestone description in format 'Goal: skill1, skill2, skill3'"),
      skills: z
        .array(z.string())
        .describe("Skills covered in this milestone"),
      badges: z
        .array(z.string())
        .default([])
        .describe(
          "Optional badges: 'Core Track', 'Professional Certificate'"
        ),
      estimatedWeeks: z
        .number()
        .describe("Estimated weeks for this milestone"),
      courseIds: z
        .array(z.string())
        .describe(
          "Course IDs from search results to include in this milestone"
        ),
      targetSkills: z
        .array(
          z.object({
            skillId: z.string().describe("Skill area ID from the role catalog"),
            skillName: z.string().describe("Skill area display name"),
            xpTarget: z.number().describe("XP this milestone contributes to this skill (e.g. 375, 500, 750)"),
            priority: z.enum(["should", "might", "optional"]).describe("Skill priority category"),
          })
        )
        .default([])
        .describe("Target skills this milestone helps master, with XP targets"),
    })
  ),
});

export type BuildPlanInput = z.infer<typeof buildPlanInputSchema>;
