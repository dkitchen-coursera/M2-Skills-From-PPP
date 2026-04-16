/**
 * Mock chat flow — provides scripted responses when no OpenAI API key is configured.
 * Simulates the skills-focused conversation: role → background → skill assessment → timeline → plan.
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

// ── Helpers ────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Match user text to a conversation step and produce a scripted response. */
export function getMockResponse(
  userText: string,
  messageCount: number,
): MockResponse {
  const lower = userText.toLowerCase().trim();

  // Plan generation trigger
  if (lower === "generate my learning plan") {
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

  // Satisfaction signals
  if (["looks good", "looks good!", "no thanks", "no", "done", "perfect", "i'm good"].includes(lower)) {
    return {
      text: "Your plan is ready to go. Good luck on your Data Analyst journey!",
      conversationState: {
        gathered_info: { goal: "Data Analyst", skills: "SQL, Data Visualization, Python", background: null, constraints: "3-6 months at 5 hours/week" },
        ready_for_plan: false,
        suggested_pills: { type: "single", question: "", options: [] },
      },
    };
  }

  // Step routing based on user message count (1-indexed)
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

// ── Mock Learning Plan ─────────────────────────────────────────────────────

const MOCK_LEARNING_PLAN: LearningPlan = {
  title: "Data Analyst Skill Mastery Plan",
  summary: {
    role: "Data Analyst",
    skills: ["SQL & Data Analysis", "Data Visualization", "Python for Data"],
    totalDuration: "3-6 months",
    hoursPerWeek: "~5 hours/week",
    skillBreakdown: {
      should: ["Data Acquisition and Preparation", "Data Analysis and Exploration", "Data Transformation and Manipulation", "Data Visualization and Reporting", "Database Operations", "Generative AI Assistance", "Statistical Modeling and Inference"],
      might: ["Advanced Analytics & Techniques", "Advanced Data Visualization & Reporting", "Data Engineering & Management"],
      optional: ["Generative AI Applications", "Predictive Analytics & Forecasting", "Statistical Analysis & Modeling"],
    },
  },
  milestones: [
    {
      id: "milestone-1",
      name: "Phase 1: Master Data Foundations (4-6 weeks)",
      description: "Goal: Data Integrity, SQL Fundamentals, Data Acquisition",
      skills: ["SQL", "Data Literacy", "Spreadsheets"],
      badges: ["Core Track"],
      estimatedWeeks: 5,
      targetSkills: [
        { skillId: "data-acquisition-preparation", skillName: "Data Acquisition and Preparation", xpTarget: 750, priority: "should" },
        { skillId: "database-operations", skillName: "Database Operations for Data Analysis", xpTarget: 500, priority: "should" },
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
          targetSkillIds: ["data-acquisition-preparation", "database-operations"],
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
          targetSkillIds: ["database-operations"],
        },
      ],
    },
    {
      id: "milestone-2",
      name: "Phase 2: Master Analysis & Visualization (4-6 weeks)",
      description: "Goal: Statistical Analysis, Data Visualization, Communication",
      skills: ["Data Visualization", "Statistics", "Tableau"],
      badges: [],
      estimatedWeeks: 5,
      targetSkills: [
        { skillId: "data-analysis-exploration", skillName: "Data Analysis and Exploration", xpTarget: 750, priority: "should" },
        { skillId: "data-visualization-reporting", skillName: "Data Visualization and Reporting", xpTarget: 750, priority: "should" },
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
          targetSkillIds: ["data-visualization-reporting"],
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
          targetSkillIds: ["data-analysis-exploration", "statistical-modeling-inference"],
        },
      ],
    },
    {
      id: "milestone-3",
      name: "Phase 3: Master Python & Automation (3-4 weeks)",
      description: "Goal: Python Programming, Data Automation, Tool Proficiency",
      skills: ["Python", "Pandas", "Automation"],
      badges: [],
      estimatedWeeks: 4,
      targetSkills: [
        { skillId: "data-transformation-manipulation", skillName: "Data Transformation and Manipulation", xpTarget: 750, priority: "should" },
        { skillId: "gen-ai-assistance", skillName: "Generative AI Assistance", xpTarget: 500, priority: "should" },
        { skillId: "advanced-analytics-techniques", skillName: "Advanced Analytics & Techniques", xpTarget: 375, priority: "might" },
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
          targetSkillIds: ["data-transformation-manipulation", "gen-ai-assistance"],
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
          targetSkillIds: ["data-transformation-manipulation", "advanced-analytics-techniques"],
        },
      ],
    },
  ],
};
