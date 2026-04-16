import { tool } from "ai";
import { identifyRoleInputSchema } from "@/lib/prompts/skills-schemas";
import { findRoleById } from "@/lib/role-catalog";

/**
 * AI tool: identify the learner's target role and categorize skill gaps.
 * Called after the conversation collects enough info about the learner's
 * desired role and current background.
 *
 * Returns the role definition + gap analysis so the client can
 * initialize skill progress tracking.
 */
export const identifyRoleTool = tool({
  description:
    "Identify the learner's target role from the catalog and categorize their skill gaps. Call this when you have determined the role and which skills they need to learn vs. already have.",
  inputSchema: identifyRoleInputSchema,
  execute: async (input) => {
    const role = findRoleById(input.roleId);
    if (!role) {
      return {
        success: false,
        error: `Role "${input.roleId}" not found in catalog. Available: data-analyst, digital-marketing, ux-designer, project-manager`,
      };
    }

    // Validate that all skill IDs exist in the role
    const roleSkillIds = new Set(role.skills.map((s) => s.id));
    const allInputSkills = [
      ...input.shouldSkills,
      ...input.mightSkills,
      ...input.optionalSkills,
    ];
    const invalidSkills = allInputSkills.filter((id) => !roleSkillIds.has(id));
    if (invalidSkills.length > 0) {
      return {
        success: false,
        error: `Invalid skill IDs for role "${role.title}": ${invalidSkills.join(", ")}. Valid IDs: ${role.skills.map((s) => s.id).join(", ")}`,
      };
    }

    return {
      success: true,
      roleId: role.id,
      roleTitle: role.title,
      gapAnalysis: {
        should: input.shouldSkills,
        might: input.mightSkills,
        optional: input.optionalSkills,
      },
      skillDetails: role.skills.map((s) => ({
        id: s.id,
        name: s.name,
        expressionCount: s.expressions.length,
        priority: input.shouldSkills.includes(s.id)
          ? "should"
          : input.mightSkills.includes(s.id)
            ? "might"
            : "optional",
      })),
    };
  },
});
