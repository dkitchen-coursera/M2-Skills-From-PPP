import { z } from "zod";

export const planCourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  imageUrl: z.string().default(""),
  productType: z.string(),
  partners: z.array(z.string()),
  partnerLogos: z.array(z.string()).default([]),
  skills: z.array(z.string()),
  duration: z.string(),
  productDifficultyLevel: z.string(),
  estimatedHours: z.number().default(0),
  activityBadges: z.array(z.string()).default([]),
  xpValue: z.number().default(0),
  targetSkillIds: z.array(z.string()).default([]),
});

export const milestoneTargetSkillSchema = z.object({
  skillId: z.string(),
  skillName: z.string(),
  xpTarget: z.number(),
  priority: z.enum(["should", "might", "optional"]),
});

export const planMilestoneSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  skills: z.array(z.string()),
  badges: z.array(z.string()).default([]),
  courses: z.array(planCourseSchema),
  estimatedWeeks: z.number().default(0),
  targetSkills: z.array(milestoneTargetSkillSchema).default([]),
});

export const skillBreakdownSchema = z.object({
  should: z.array(z.string()),
  might: z.array(z.string()),
  optional: z.array(z.string()),
});

export const learningPlanSchema = z.object({
  title: z.string(),
  summary: z.object({
    role: z.string(),
    skills: z.array(z.string()),
    totalDuration: z.string(),
    hoursPerWeek: z.string(),
    skillBreakdown: skillBreakdownSchema.optional(),
  }),
  milestones: z.array(planMilestoneSchema),
});

export type PlanCourse = z.infer<typeof planCourseSchema>;
export type MilestoneTargetSkill = z.infer<typeof milestoneTargetSkillSchema>;
export type PlanMilestone = z.infer<typeof planMilestoneSchema>;
export type SkillBreakdown = z.infer<typeof skillBreakdownSchema>;
export type LearningPlan = z.infer<typeof learningPlanSchema>;
