import type { GatheredInfo } from "@/lib/types";
import type { PlanCourse } from "@/lib/plan-types";
import { findRoleById } from "@/lib/role-catalog";
import {
  addSkillXp,
  createInitialProgress,
  type GapAnalysis,
  type RoleProgress,
} from "@/lib/skills-store";

export const ONBOARDED_GATHERED_INFO: GatheredInfo = {
  goal: "Data Analyst",
  skills: "SQL, Python, Data Visualization",
  background: null,
  constraints: null,
};

export const IN_PROGRESS_GATHERED_INFO: GatheredInfo = {
  goal: "Software Developer",
  skills: "JavaScript, React, Node.js",
  background: null,
  constraints: null,
};

export type InProgressCourse = {
  title: string;
  partner: string;
  partnerLogo: string;
  rating: number;
  productType: string;
  progress?: number;
};

export const HERO_COURSE: InProgressCourse = {
  title: "Introduction to Software Engineering",
  partner: "IBM",
  partnerLogo: "/assets/ibm-logo.png",
  rating: 4.7,
  productType: "Course",
  progress: 0,
};

export const RECENTLY_VIEWED_COURSES: InProgressCourse[] = [
  {
    title: "Google Data Analytics",
    partner: "Google",
    partnerLogo: "/assets/google-logo.png",
    rating: 4.8,
    productType: "Professional Certificate",
  },
  {
    title: "Dynamic Public Speaking",
    partner: "University of Washington",
    partnerLogo: "/assets/umich-logo.png",
    rating: 4.7,
    productType: "Specialization",
  },
  {
    title: "Meta React Native",
    partner: "Meta",
    partnerLogo: "/assets/meta-logo.png",
    rating: 4.6,
    productType: "Specialization",
  },
];

export const SIMILAR_ACTIVITY_COURSES: InProgressCourse[] = [
  {
    title: "IBM Data Analytics with Excel and R",
    partner: "IBM",
    partnerLogo: "/assets/ibm-logo.png",
    rating: 4.7,
    productType: "Professional Certificate",
  },
  {
    title: "Business and Financial Modeling",
    partner: "University of Pennsylvania",
    partnerLogo: "/assets/umich-logo.png",
    rating: 4.5,
    productType: "Specialization",
  },
];

// ── Returning-learner seed data ──────────────────────────────────────────────
//
// Returning personas land on My Learning with an *inferred* role goal (not yet
// confirmed) and some seeded skill-XP progress. Non-C+ also has an in-progress
// course they can resume; C+ does not (so they can set up a personalized plan).

export const RETURNING_INFERRED_ROLE_ID = "data-analyst";

/** Resume-card data for returning learners on the My Plan tab. */
export const RETURNING_NON_CPLUS_RESUME_COURSE: InProgressCourse = {
  title: "Google Data Analytics",
  partner: "Google",
  partnerLogo: "/assets/google-logo.png",
  rating: 4.8,
  productType: "Professional Certificate",
  progress: 28,
};

/**
 * PlanCourse-shaped version of the resume course so the Resume button on
 * the My Plan tab can hand off to LEX (which expects a PlanCourse).
 */
export const RETURNING_RESUME_PLAN_COURSE: PlanCourse = {
  id: "seeded-google-data-analytics",
  name: RETURNING_NON_CPLUS_RESUME_COURSE.title,
  url: "",
  imageUrl: "",
  productType: RETURNING_NON_CPLUS_RESUME_COURSE.productType,
  partners: [RETURNING_NON_CPLUS_RESUME_COURSE.partner],
  partnerLogos: RETURNING_NON_CPLUS_RESUME_COURSE.partnerLogo
    ? [RETURNING_NON_CPLUS_RESUME_COURSE.partnerLogo]
    : [],
  skills: ["Data Analysis", "SQL", "Spreadsheets", "Data Visualization"],
  duration: "6 months",
  productDifficultyLevel: "Beginner",
  estimatedHours: 240,
  activityBadges: [],
  xpValue: 0,
  targetSkillIds: [
    "data-acquisition-preparation",
    "data-analysis-exploration",
    "data-visualization-reporting",
  ],
};

/**
 * Standalone in-progress courses for returning learners (no plan required).
 * Surfaced in the In Progress tab to simulate prior ad-hoc learning activity.
 * The first course matches `RETURNING_NON_CPLUS_RESUME_COURSE` (the My Plan resume card).
 */
export const RETURNING_IN_PROGRESS_COURSES: InProgressCourse[] = [
  RETURNING_NON_CPLUS_RESUME_COURSE,
  {
    title: "Excel Skills for Data Analytics and Visualization",
    partner: "Macquarie University",
    partnerLogo: "/assets/macquarie-logo.png",
    rating: 4.7,
    productType: "Specialization",
    progress: 62,
  },
  {
    title: "SQL for Data Science",
    partner: "University of California, Davis",
    partnerLogo: "/assets/ucdavis-logo.png",
    rating: 4.6,
    productType: "Course",
    progress: 15,
  },
];

/**
 * Build a seeded RoleProgress for returning learners — partial XP across
 * a handful of Data Analyst skills, simulating ad-hoc prior learning.
 */
export function createReturningLearnerProgress(): RoleProgress | null {
  const role = findRoleById(RETURNING_INFERRED_ROLE_ID);
  if (!role) return null;

  // Treat L1 Data Analyst skills as "should", first 3 L2 as "might"
  const l1 = role.skills.filter((s) => s.level.includes("Level 1"));
  const l2 = role.skills.filter((s) => s.level.includes("Level 2"));
  const gap: GapAnalysis = {
    should: l1.map((s) => s.id),
    might: l2.slice(0, 3).map((s) => s.id),
    optional: l2.slice(3).map((s) => s.id),
  };

  let progress = createInitialProgress(role, gap);

  // Seed some XP across 3 skills to simulate prior progress (~25-40% each)
  progress = addSkillXp(progress, "data-acquisition-preparation", 900);
  progress = addSkillXp(progress, "data-visualization-reporting", 600);
  progress = addSkillXp(progress, "database-operations", 450);

  return progress;
}
