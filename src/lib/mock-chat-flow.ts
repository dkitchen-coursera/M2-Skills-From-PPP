/**
 * Mock chat flow — provides scripted responses when no OpenAI API key is configured.
 * Supports two conversation paths:
 *   1. Role-based: role → background → skill assessment → timeline → plan
 *   2. Skills-first: confirm skills → background → timeline → plan
 */

import type { LearningPlan } from "@/lib/plan-types";
import type { ConversationStateData, RoleIdentificationData } from "@/lib/types";
import { ROLE_CATALOG, findRoleByKeywords } from "@/lib/role-catalog";

// ── Types ──────────────────────────────────────────────────────────────────

interface MockResponse {
  text: string;
  conversationState: ConversationStateData;
  roleIdentification?: RoleIdentificationData;
  plan?: LearningPlan;
  planGenerating?: boolean;
}

// ── Path Detection ────────────────────────────────────────────────────────

function isSkillsFirstEntry(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("i want to learn") ||
    lower.includes("i know what skills") ||
    lower.includes("skills i want")
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Match user text to a conversation step and produce a scripted response. */
export function getMockResponse(
  userText: string,
  messageCount: number,
  firstUserText?: string,
): MockResponse {
  const lower = userText.toLowerCase().trim();
  const entryText = firstUserText ?? userText;
  const isSkillsPath = isSkillsFirstEntry(entryText);

  // ── Plan generation trigger ──────────────────────────────────────────
  if (lower === "generate my learning plan") {
    if (isSkillsPath) {
      return {
        text: "Here's your personalized skill mastery plan for SQL and data visualization. I've mapped your goals to the Data Analyst skill framework to track your progress. Would you like me to refine these recommendations further?",
        conversationState: {
          gathered_info: { goal: "SQL and data visualization", skills: "SQL, Data Visualization", background: null, constraints: "3-6 months at 5 hours/week" },
          ready_for_plan: false,
          suggested_pills: { type: "single", question: "Would you like to refine your plan?", options: ["Shorten my timeline", "Make it more advanced", "Focus more on SQL", "Looks good!"] },
        },
        plan: MOCK_SKILLS_LEARNING_PLAN,
        planGenerating: true,
      };
    }
    return {
      text: "Here's your personalized skill mastery plan for Data Analyst. I've structured it around the skills you need to develop, with courses selected to maximize your XP in each area. Would you like me to refine these recommendations further?",
      conversationState: {
        gathered_info: { goal: "Data Analyst", skills: "SQL, Data Visualization, Python", background: null, constraints: "3-6 months at 5 hours/week" },
        ready_for_plan: false,
        suggested_pills: { type: "single", question: "Would you like to refine your plan?", options: ["Shorten my timeline", "Make it more advanced", "Focus more on SQL", "Looks good!"] },
      },
      plan: MOCK_LEARNING_PLAN,
      planGenerating: true,
    };
  }

  // ── Satisfaction signals ──────────────────────────────────────────────
  if (["looks good", "looks good!", "no thanks", "no", "done", "perfect", "i'm good"].includes(lower)) {
    const journeyLabel = isSkillsPath ? "SQL and data visualization" : "Data Analyst";
    return {
      text: `Your plan is ready to go. Good luck on your ${journeyLabel} journey!`,
      conversationState: {
        gathered_info: {
          goal: isSkillsPath ? "SQL and data visualization" : "Data Analyst",
          skills: isSkillsPath ? "SQL, Data Visualization" : "SQL, Data Visualization, Python",
          background: null,
          constraints: "3-6 months at 5 hours/week",
        },
        ready_for_plan: false,
        suggested_pills: { type: "single", question: "", options: [] },
      },
    };
  }

  // ── Skills-first path ────────────────────────────────────────────────
  if (isSkillsPath) {
    // "I know what skills I want" — doesn't name skills, so ask first
    const isGenericSkillsEntry = entryText.toLowerCase().includes("i know what skills");

    if (isGenericSkillsEntry) {
      // Step 1: Ask what skills they want
      if (messageCount <= 1) {
        return {
          text: "What specific skills would you like to focus on?",
          conversationState: {
            gathered_info: { goal: null, skills: null, background: null, constraints: null },
            ready_for_plan: false,
            suggested_pills: {
              type: "multi",
              question: "Which skills interest you?",
              options: [
                "SQL and data analysis",
                "Data visualization",
                "Python programming",
                "SEO and content strategy",
                "User research and prototyping",
                "Agile and project management",
                "Something else",
              ],
            },
          },
        };
      }
      // Step 2: Confirm skills, ask background
      if (messageCount <= 2) {
        return {
          text: `${userText} — great choices. What's your current role or experience level?`,
          conversationState: {
            gathered_info: { goal: userText, skills: userText, background: null, constraints: null },
            ready_for_plan: false,
            suggested_pills: {
              type: "single",
              question: "What's your background?",
              options: ["I'm a student", "I work in a non-technical role", "I have some data experience", "I'm starting fresh", "Something else"],
            },
          },
        };
      }
      // Step 3: Ask timeline
      if (messageCount <= 3) {
        return {
          text: "How much time can you commit to learning each week, and what's your target timeline?",
          conversationState: {
            gathered_info: { goal: "SQL and data visualization", skills: "SQL, Data Visualization", background: userText, constraints: null },
            ready_for_plan: false,
            suggested_pills: {
              type: "single",
              question: "What's your timeline?",
              options: ["1-3 months at 10 hours/week", "3-6 months at 5 hours/week", "6-12 months at 3 hours/week", "Something else"],
            },
          },
        };
      }
      // Step 4: Ready for plan
      return {
        text: "5 hours a week works well — let me build your skill mastery plan.",
        conversationState: {
          gathered_info: { goal: "SQL and data visualization", skills: "SQL, Data Visualization", background: "student", constraints: userText },
          ready_for_plan: true,
          suggested_pills: { type: "single", question: "", options: [] },
        },
        roleIdentification: {
          roleId: "data-analyst",
          roleTitle: "Data Analyst",
          gapAnalysis: {
            should: ["database-operations", "data-visualization-reporting", "data-acquisition-preparation"],
            might: ["data-analysis-exploration"],
            optional: ["data-transformation-manipulation", "gen-ai-assistance"],
          },
        },
      };
    }

    // Direct skills entry (e.g. "I want to learn SQL and data visualization")
    // Step 1: Confirm skills, ask background
    if (messageCount <= 1) {
      // Extract skill names from the entry text for display
      const skillsText = entryText.replace(/^i want to learn\s*/i, "").trim();
      return {
        text: `${skillsText.charAt(0).toUpperCase() + skillsText.slice(1)} — solid combo. What's your current role or experience level with data?`,
        conversationState: {
          gathered_info: { goal: skillsText, skills: skillsText, background: null, constraints: null },
          ready_for_plan: false,
          suggested_pills: {
            type: "single",
            question: "What's your background?",
            options: ["I'm a student", "I work in a non-technical role", "I have some data experience", "I'm starting fresh", "Something else"],
          },
        },
      };
    }

    // Step 2: Ask timeline
    if (messageCount <= 2) {
      return {
        text: "How much time can you commit to learning each week, and what's your target timeline?",
        conversationState: {
          gathered_info: { goal: "SQL and data visualization", skills: "SQL, Data Visualization", background: userText, constraints: null },
          ready_for_plan: false,
          suggested_pills: {
            type: "single",
            question: "What's your timeline?",
            options: ["1-3 months at 10 hours/week", "3-6 months at 5 hours/week", "6-12 months at 3 hours/week", "Something else"],
          },
        },
      };
    }

    // Step 3: Ready for plan
    return {
      text: "5 hours a week works well — let me build your skill mastery plan focused on SQL and data visualization.",
      conversationState: {
        gathered_info: { goal: "SQL and data visualization", skills: "SQL, Data Visualization", background: "student", constraints: userText },
        ready_for_plan: true,
        suggested_pills: { type: "single", question: "", options: [] },
      },
      roleIdentification: {
        roleId: "data-analyst",
        roleTitle: "Data Analyst",
        gapAnalysis: {
          should: ["database-operations", "data-visualization-reporting", "data-acquisition-preparation"],
          might: ["data-analysis-exploration"],
          optional: ["data-transformation-manipulation", "gen-ai-assistance"],
        },
      },
    };
  }

  // ── Role-based path (existing) ───────────────────────────────────────

  // Step 1 (1st user msg): Role selection
  if (messageCount <= 1) {
    const matchedRole = findRoleByKeywords(userText);
    const role = matchedRole ?? ROLE_CATALOG[0]; // default to Data Analyst
    return {
      text: `${role.title} — got it. What's your current role or background? This helps me understand which skills you might already have.`,
      conversationState: {
        gathered_info: { goal: role.title, skills: null, background: null, constraints: null },
        ready_for_plan: false,
        suggested_pills: {
          type: "single",
          question: "What's your background?",
          options: ["I'm a student", "I work in a different field", "I have some data experience", "I'm starting fresh", "Something else"],
        },
      },
    };
  }

  // Step 2 (2nd user msg): Background → ask about skills
  if (messageCount <= 2) {
    return {
      text: "Which of these skill areas do you already feel confident in? Select all that apply.",
      conversationState: {
        gathered_info: { goal: "Data Analyst", skills: null, background: userText, constraints: null },
        ready_for_plan: false,
        suggested_pills: {
          type: "multi",
          question: "Which skills do you already have?",
          options: [
            "Data Acquisition and Preparation",
            "Data Analysis and Exploration",
            "Data Transformation and Manipulation",
            "Data Visualization and Reporting",
            "Database Operations",
            "Statistical Modeling and Inference",
            "Generative AI Assistance",
            "None of these — I'm starting fresh",
          ],
        },
      },
    };
  }

  // Step 3 (3rd user msg): Skill assessment → ask timeline
  if (messageCount <= 3) {
    return {
      text: "How much time can you commit to learning each week, and what's your target timeline?",
      conversationState: {
        gathered_info: { goal: "Data Analyst", skills: userText, background: "student", constraints: null },
        ready_for_plan: false,
        suggested_pills: {
          type: "single",
          question: "What's your timeline?",
          options: ["1-3 months at 10 hours/week", "3-6 months at 5 hours/week", "6-12 months at 3 hours/week", "Something else"],
        },
      },
    };
  }

  // Step 4 (4th user msg): Timeline → ready for plan
  return {
    text: "5 hours a week works well — let me put together your skill mastery plan.",
    conversationState: {
      gathered_info: { goal: "Data Analyst", skills: "SQL, Data Visualization, Python", background: "student", constraints: userText },
      ready_for_plan: true,
      suggested_pills: { type: "single", question: "", options: [] },
    },
    roleIdentification: {
      roleId: "data-analyst",
      roleTitle: "Data Analyst",
      gapAnalysis: {
        should: ["data-acquisition-preparation", "data-analysis-exploration", "data-transformation-manipulation", "data-visualization-reporting", "database-operations", "gen-ai-assistance", "statistical-modeling-inference"],
        might: ["advanced-analytics-techniques", "advanced-data-viz-reporting", "data-engineering-management"],
        optional: ["gen-ai-applications", "predictive-analytics-forecasting", "statistical-analysis-modeling"],
      },
    },
  };
}

/** Simulate streaming a mock response through the UIMessageStream writer. */
export async function streamMockResponse(
  writer: {
    write: (part: Record<string, unknown>) => void;
  },
  response: MockResponse,
): Promise<void> {
  // Simulate typing delay
  await delay(300);

  // Emit plan-generating signal if this is a plan response
  if (response.planGenerating) {
    writer.write({ type: "data-plan-generating", data: { status: "generating" } });
    await delay(800);
  }

  // Emit role identification if present
  if (response.roleIdentification) {
    writer.write({ type: "data-role-identified", data: response.roleIdentification });
  }

  // Emit conversation state
  writer.write({ type: "data-conversation-state", data: response.conversationState });

  // Emit plan if present
  if (response.plan) {
    await delay(500);
    writer.write({ type: "data-learning-plan", data: response.plan });
  }

  // Stream text character by character for realistic typing feel
  const textId = "mock-text-" + Date.now();
  writer.write({ type: "start-step" });
  writer.write({ type: "text-start", id: textId });

  const words = response.text.split(" ");
  for (let i = 0; i < words.length; i++) {
    const delta = (i === 0 ? "" : " ") + words[i];
    writer.write({ type: "text-delta", id: textId, delta });
    await delay(20 + Math.random() * 30);
  }

  writer.write({ type: "text-end", id: textId });
  writer.write({ type: "finish-step" });
}

// ── Mock Learning Plan (Role-based) ──────────────────────────────────────

const MOCK_LEARNING_PLAN: LearningPlan = {
  title: "Data Analyst Career Plan",
  summary: {
    role: "Data Analyst",
    skills: ["Data Storytelling", "Data Visualization", "Dashboard Design"],
    totalDuration: "3-6 months",
    hoursPerWeek: "~5 hours/week",
    // NOTE: Under the group-mastery model (Data Analyst), skill names here are
    // "{Level} {Skill}" display names so chips render correctly.
    skillBreakdown: {
      should: [
        "Foundational Visualization Graphic",
        "Beginner Visualization Graphic",
        "Beginner Data Visualization Software",
        "Beginner Dashboard",
        "Intermediate Data Presentation",
        "Intermediate Data Storytelling",
        "Intermediate Statistical Visualization",
      ],
      might: ["Intermediate Plot Graphics"],
      optional: ["Advanced Data Transformation", "Advanced Interactive Data Visualization"],
    },
  },
  milestones: [
    {
      id: "milestone-1",
      name: "Phase 1: Master Visualization Foundations (4-6 weeks)",
      description: "Goal: Foundational Visualization Graphic, Foundational Statistical Visualization",
      skills: ["Visualization Graphic", "Statistical Visualization"],
      badges: ["Core Track"],
      estimatedWeeks: 5,
      targetSkills: [
        // Group keys — {skillSlug}::{level-lowercase}. xpTarget is clamped to group xpMax.
        { skillId: "visualization-graphic::foundational", skillName: "Foundational Visualization Graphic", xpTarget: 300, priority: "should" },
        { skillId: "statistical-visualization::foundational", skillName: "Foundational Statistical Visualization", xpTarget: 300, priority: "should" },
      ],
      courses: [
        {
          id: "mock-course-1",
          name: "Google Data Analytics Professional Certificate",
          url: "/professional-certificates/google-data-analytics",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/65009de0a74a3db0751f6b561050e4/1060x596_GCC-DA_Banner.png",
          productType: "PROFESSIONAL_CERTIFICATE",
          partners: ["Google"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7ecc11d/Google-G_360x360.png"],
          skills: ["Data Analysis", "SQL", "Spreadsheets", "Data Cleaning"],
          duration: "6 months at 10 hrs/week",
          productDifficultyLevel: "BEGINNER",
          estimatedHours: 0,
          activityBadges: [],
          xpValue: 500,
          targetSkillIds: ["visualization-graphic::foundational", "statistical-visualization::foundational"],
        },
        {
          id: "mock-course-2",
          name: "SQL for Data Science",
          url: "/learn/sql-for-data-science",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/6b/04/ba9c8fad4b47be8b3936e5113098/sql-for-data-science.jpg",
          productType: "COURSE",
          partners: ["University of California, Davis"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/37/e7d4b0f57711e7b6fa13348ee2e8e2/ucdavis-logo.png"],
          skills: ["SQL", "SQLite", "Data Analysis"],
          duration: "16 hours",
          productDifficultyLevel: "BEGINNER",
          estimatedHours: 16,
          activityBadges: [],
          xpValue: 250,
          targetSkillIds: ["visualization-graphic::foundational"],
        },
      ],
    },
    {
      id: "milestone-2",
      name: "Phase 2: Master Beginner Visualization & Dashboards (4-6 weeks)",
      description: "Goal: Beginner Visualization Graphic, Beginner Data Visualization Software, Beginner Dashboard",
      skills: ["Data Visualization", "Tableau", "Dashboard Design"],
      badges: [],
      estimatedWeeks: 5,
      targetSkills: [
        { skillId: "visualization-graphic::beginner", skillName: "Beginner Visualization Graphic", xpTarget: 600, priority: "should" },
        { skillId: "data-visualization-software::beginner", skillName: "Beginner Data Visualization Software", xpTarget: 750, priority: "should" },
        { skillId: "dashboard::beginner", skillName: "Beginner Dashboard", xpTarget: 750, priority: "should" },
      ],
      courses: [
        {
          id: "mock-course-3",
          name: "Data Visualization with Tableau Specialization",
          url: "/specializations/data-visualization",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/8e/e9b860da8511e7b2b57d0a3862ee2e/data-visualization-tableau.png",
          productType: "SPECIALIZATION",
          partners: ["University of California, Davis"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/37/e7d4b0f57711e7b6fa13348ee2e8e2/ucdavis-logo.png"],
          skills: ["Tableau", "Data Visualization", "Dashboard Design"],
          duration: "5 months at 3 hrs/week",
          productDifficultyLevel: "BEGINNER",
          estimatedHours: 60,
          activityBadges: [],
          xpValue: 500,
          targetSkillIds: ["data-visualization-software::beginner", "dashboard::beginner"],
        },
        {
          id: "mock-course-4",
          name: "Statistics with Python Specialization",
          url: "/specializations/statistics-with-python",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/a4/8e3c6044f311e8b8e3cba65a46c69b/Statistics-with-Python.jpg",
          productType: "SPECIALIZATION",
          partners: ["University of Michigan"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/70/de505d47be7e4899aa14cae32fc24b/New-Block-M-Stacked-Blue.png"],
          skills: ["Statistics", "Python", "Data Analysis", "Statistical Inference"],
          duration: "3 months at 7 hrs/week",
          productDifficultyLevel: "INTERMEDIATE",
          estimatedHours: 84,
          activityBadges: [],
          xpValue: 500,
          targetSkillIds: ["visualization-graphic::beginner", "statistical-visualization::beginner"],
        },
      ],
    },
    {
      id: "milestone-3",
      name: "Phase 3: Master Intermediate Storytelling & Presentation (3-4 weeks)",
      description: "Goal: Intermediate Data Storytelling, Intermediate Data Presentation, Intermediate Statistical Visualization",
      skills: ["Data Storytelling", "Data Presentation", "Statistical Visualization"],
      badges: [],
      estimatedWeeks: 4,
      targetSkills: [
        { skillId: "data-storytelling::intermediate", skillName: "Intermediate Data Storytelling", xpTarget: 750, priority: "should" },
        { skillId: "data-presentation::intermediate", skillName: "Intermediate Data Presentation", xpTarget: 750, priority: "should" },
        { skillId: "statistical-visualization::intermediate", skillName: "Intermediate Statistical Visualization", xpTarget: 750, priority: "should" },
        { skillId: "plot-graphics::intermediate", skillName: "Intermediate Plot Graphics", xpTarget: 375, priority: "might" },
      ],
      courses: [
        {
          id: "mock-course-5",
          name: "Python for Everybody Specialization",
          url: "/specializations/python",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/fc/5e4790e0af11e5ae6c4924a3ac0b9e/pythonlearn_thumbnail_1x1.png",
          productType: "SPECIALIZATION",
          partners: ["University of Michigan"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/70/de505d47be7e4899aa14cae32fc24b/New-Block-M-Stacked-Blue.png"],
          skills: ["Python", "JSON", "XML", "Databases", "SQL"],
          duration: "8 months at 3 hrs/week",
          productDifficultyLevel: "BEGINNER",
          estimatedHours: 96,
          activityBadges: [],
          xpValue: 500,
          targetSkillIds: ["data-storytelling::intermediate", "data-presentation::intermediate"],
        },
        {
          id: "mock-course-6",
          name: "Data Analysis with Python",
          url: "/learn/data-analysis-with-python",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/73/8e42f0606b11e89c6057aa48acab02/CourseImage_DAwPy.png",
          productType: "COURSE",
          partners: ["IBM"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/bb/f5ced4cff04234b4d5574d4c3b5400/IBM-Logo-Blk---Square.png"],
          skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
          duration: "15 hours",
          productDifficultyLevel: "INTERMEDIATE",
          estimatedHours: 15,
          activityBadges: [],
          xpValue: 375,
          targetSkillIds: ["statistical-visualization::intermediate", "plot-graphics::intermediate"],
        },
      ],
    },
  ],
};

// ── Mock Learning Plan (Skills-first) ────────────────────────────────────

const MOCK_SKILLS_LEARNING_PLAN: LearningPlan = {
  title: "SQL & Data Visualization Mastery Plan",
  summary: {
    role: "Data Analyst",
    skills: ["SQL", "Data Visualization", "Data Analysis"],
    totalDuration: "3-4 months",
    hoursPerWeek: "~5 hours/week",
    skillBreakdown: {
      // Display names follow the {Level} {Skill} format for DA's group-mastery model.
      should: [
        "Foundational Relational Databases",
        "Beginner Data Manipulation",
        "Beginner Data Visualization Software",
        "Beginner Dashboard",
      ],
      might: ["Intermediate Data Storytelling"],
      optional: ["Intermediate Data Manipulation", "Advanced Data Transformation"],
    },
  },
  milestones: [
    {
      id: "milestone-1",
      name: "Phase 1: Master SQL Fundamentals (4-5 weeks)",
      description: "Goal: Foundational Relational Databases, Beginner Data Manipulation",
      skills: ["SQL", "Relational Databases", "Data Manipulation"],
      badges: ["Core Track"],
      estimatedWeeks: 4,
      targetSkills: [
        { skillId: "relational-databases::foundational", skillName: "Foundational Relational Databases", xpTarget: 750, priority: "should" },
        { skillId: "data-manipulation::beginner", skillName: "Beginner Data Manipulation", xpTarget: 500, priority: "should" },
      ],
      courses: [
        {
          id: "mock-skills-course-1",
          name: "SQL for Data Science",
          url: "/learn/sql-for-data-science",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/6b/04/ba9c8fad4b47be8b3936e5113098/sql-for-data-science.jpg",
          productType: "COURSE",
          partners: ["University of California, Davis"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/37/e7d4b0f57711e7b6fa13348ee2e8e2/ucdavis-logo.png"],
          skills: ["SQL", "SQLite", "Data Analysis", "Database Operations"],
          duration: "16 hours",
          productDifficultyLevel: "BEGINNER",
          estimatedHours: 16,
          activityBadges: [],
          xpValue: 375,
          targetSkillIds: ["relational-databases::foundational"],
        },
        {
          id: "mock-skills-course-2",
          name: "Databases and SQL for Data Science with Python",
          url: "/learn/sql-data-science",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/73/8e42f0606b11e89c6057aa48acab02/CourseImage_DAwPy.png",
          productType: "COURSE",
          partners: ["IBM"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/bb/f5ced4cff04234b4d5574d4c3b5400/IBM-Logo-Blk---Square.png"],
          skills: ["SQL", "Python", "Databases", "Data Science"],
          duration: "20 hours",
          productDifficultyLevel: "BEGINNER",
          estimatedHours: 20,
          activityBadges: [],
          xpValue: 375,
          targetSkillIds: ["relational-databases::foundational", "data-manipulation::beginner"],
        },
      ],
    },
    {
      id: "milestone-2",
      name: "Phase 2: Master Data Visualization (4-5 weeks)",
      description: "Goal: Beginner Data Visualization Software, Beginner Dashboard",
      skills: ["Data Visualization", "Tableau", "Dashboard Design"],
      badges: [],
      estimatedWeeks: 5,
      targetSkills: [
        { skillId: "data-visualization-software::beginner", skillName: "Beginner Data Visualization Software", xpTarget: 750, priority: "should" },
        { skillId: "dashboard::beginner", skillName: "Beginner Dashboard", xpTarget: 750, priority: "should" },
      ],
      courses: [
        {
          id: "mock-skills-course-3",
          name: "Data Visualization with Tableau Specialization",
          url: "/specializations/data-visualization",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/8e/e9b860da8511e7b2b57d0a3862ee2e/data-visualization-tableau.png",
          productType: "SPECIALIZATION",
          partners: ["University of California, Davis"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/37/e7d4b0f57711e7b6fa13348ee2e8e2/ucdavis-logo.png"],
          skills: ["Tableau", "Data Visualization", "Dashboard Design", "Storytelling"],
          duration: "5 months at 3 hrs/week",
          productDifficultyLevel: "BEGINNER",
          estimatedHours: 60,
          activityBadges: [],
          xpValue: 500,
          targetSkillIds: ["data-visualization-software::beginner", "dashboard::beginner"],
        },
        {
          id: "mock-skills-course-4",
          name: "Data Visualization and Communication with Tableau",
          url: "/learn/analytics-tableau",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/65009de0a74a3db0751f6b561050e4/1060x596_GCC-DA_Banner.png",
          productType: "COURSE",
          partners: ["Duke University"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/6d/3cb3e06c357d40ef60000fb3d12d/dukelogotest.png"],
          skills: ["Tableau", "Data Communication", "Visual Analytics"],
          duration: "18 hours",
          productDifficultyLevel: "INTERMEDIATE",
          estimatedHours: 18,
          activityBadges: [],
          xpValue: 250,
          targetSkillIds: ["data-storytelling::intermediate"],
        },
      ],
    },
    {
      id: "milestone-3",
      name: "Phase 3: Apply & Integrate Skills (3-4 weeks)",
      description: "Goal: Intermediate Data Storytelling, Intermediate Data Manipulation",
      skills: ["Data Storytelling", "Data Manipulation", "Data Analysis"],
      badges: [],
      estimatedWeeks: 3,
      targetSkills: [
        { skillId: "data-storytelling::intermediate", skillName: "Intermediate Data Storytelling", xpTarget: 500, priority: "should" },
        { skillId: "data-manipulation::intermediate", skillName: "Intermediate Data Manipulation", xpTarget: 500, priority: "might" },
      ],
      courses: [
        {
          id: "mock-skills-course-5",
          name: "Google Data Analytics Professional Certificate",
          url: "/professional-certificates/google-data-analytics",
          imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/65009de0a74a3db0751f6b561050e4/1060x596_GCC-DA_Banner.png",
          productType: "PROFESSIONAL_CERTIFICATE",
          partners: ["Google"],
          partnerLogos: ["https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7ecc11d/Google-G_360x360.png"],
          skills: ["Data Analysis", "SQL", "Spreadsheets", "Data Visualization", "R"],
          duration: "6 months at 10 hrs/week",
          productDifficultyLevel: "BEGINNER",
          estimatedHours: 240,
          activityBadges: [],
          xpValue: 500,
          targetSkillIds: ["data-storytelling::intermediate", "data-manipulation::intermediate"],
        },
      ],
    },
  ],
};
