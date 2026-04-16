import { z } from "zod";

/**
 * Schema for the identify_role tool — called by the AI after
 * determining the learner's target role and skill gap categorization.
 */
export const identifyRoleInputSchema = z.object({
  roleId: z
    .string()
    .describe("Role ID from the catalog (e.g., 'data-analyst', 'ux-designer')"),
  roleTitle: z
    .string()
    .describe("Human-readable role title (e.g., 'Data Analyst')"),
  shouldSkills: z
    .array(z.string())
    .describe("Skill IDs the learner MUST master (primary gaps)"),
  mightSkills: z
    .array(z.string())
    .describe("Skill IDs the learner might need to deepen"),
  optionalSkills: z
    .array(z.string())
    .describe("Skill IDs that are nice-to-have"),
});

export type IdentifyRoleInput = z.infer<typeof identifyRoleInputSchema>;
