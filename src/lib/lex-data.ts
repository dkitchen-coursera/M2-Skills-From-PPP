import type { PlanCourse } from "@/lib/plan-types";
import type {
  LexItemType,
  LexItem,
  LexLessonGroup,
  LexModule,
  LexSyllabus,
  DailyGoal,
} from "@/lib/lex-types";

// ── XP Rules ──────────────────────────────────────────────────────────────

export function computeItemXp(type: LexItemType, durationMinutes: number): number {
  switch (type) {
    case "video":
      if (durationMinutes <= 3) return 8;
      if (durationMinutes <= 6) return 10;
      return 12;
    case "reading":
      return 5;
    case "practice":
      if (durationMinutes <= 10) return 30;
      return 50;
    case "graded":
      return 50;
  }
}

export function distributeXpToSkills(
  xpValue: number,
  targetSkillIds: string[],
): Record<string, number> {
  if (targetSkillIds.length === 0) return {};
  const perSkill = Math.floor(xpValue / targetSkillIds.length);
  const remainder = xpValue - perSkill * targetSkillIds.length;
  const result: Record<string, number> = {};
  for (let i = 0; i < targetSkillIds.length; i++) {
    result[targetSkillIds[i]] = perSkill + (i === 0 ? remainder : 0);
  }
  return result;
}

// ── Daily Goals ───────────────────────────────────────────────────────────

export const DEFAULT_DAILY_GOALS: DailyGoal[] = [
  { id: "learning-items", label: "Complete any 5 learning items", target: 5, icon: "star" },
  { id: "practice", label: "Complete 1 practice item", target: 1, icon: "practice" },
  { id: "coach", label: "Use Coach", target: 1, icon: "coach" },
];

// ── M1 "Share Data Through the Art of Visualization" syllabus ────────────
//
// Mirrors the structure of https://m1-skills-prototype-nine.vercel.app/learning.html
// so the LEX prototype shows realistic Coursera course content. Module 1 is fully
// populated (matches M1 1:1); Modules 2-4 keep their lesson-group headers with a
// handful of representative items each.

const M1_COURSE_TITLE = "Share Data Through the Art of Visualization";

type SeedItem = { title: string; type: LexItemType; durationMinutes: number };

const M1_MODULES: Array<{
  number: number;
  name: string;
  groups: Array<{ name: string; items: SeedItem[] }>;
}> = [
  {
    number: 1,
    name: "Visualize data",
    groups: [
      {
        name: "Communicate data insights",
        items: [
          { title: "Introduction to communicating data insights", type: "video", durationMinutes: 3 },
          { title: "Course 6 overview", type: "reading", durationMinutes: 8 },
          { title: "Kevin: The power's in the data viz", type: "video", durationMinutes: 2 },
          { title: "Helpful resources and tips", type: "reading", durationMinutes: 4 },
        ],
      },
      {
        name: "Understand data visualization",
        items: [
          { title: "Why data visualization matters", type: "video", durationMinutes: 6 },
          { title: "Effective data visualizations", type: "reading", durationMinutes: 8 },
          { title: "Connect images with data", type: "video", durationMinutes: 6 },
          { title: "The beauty of visualizing", type: "reading", durationMinutes: 8 },
          { title: "A recipe for a powerful visualization", type: "video", durationMinutes: 5 },
          { title: "Correlation and causation", type: "reading", durationMinutes: 8 },
          { title: "Dynamic visualizations", type: "video", durationMinutes: 3 },
          { title: "The wonderful world of visualizations", type: "reading", durationMinutes: 8 },
          { title: "Data grows on decision trees", type: "reading", durationMinutes: 8 },
          { title: "Self-Reflection: Choose your visualization type", type: "practice", durationMinutes: 20 },
          { title: "Test your knowledge on data visualizations", type: "practice", durationMinutes: 8 },
        ],
      },
      {
        name: "Design data visualizations",
        items: [
          { title: "Elements of art", type: "video", durationMinutes: 4 },
          { title: "Principles of design", type: "reading", durationMinutes: 8 },
          { title: "Data visualization impact", type: "video", durationMinutes: 5 },
          { title: "Data is beautiful", type: "reading", durationMinutes: 8 },
          { title: "Design thinking and visualizations", type: "video", durationMinutes: 6 },
          { title: "[Optional] Design thinking for visualization improvement", type: "reading", durationMinutes: 8 },
          { title: "Test your knowledge on designing data visualizations", type: "practice", durationMinutes: 8 },
        ],
      },
      {
        name: "Visualization considerations",
        items: [
          { title: "Pro tips for highlighting key information", type: "reading", durationMinutes: 8 },
          { title: "Accessible visualizations", type: "video", durationMinutes: 4 },
          { title: "Andrew: Making data accessible", type: "video", durationMinutes: 2 },
          { title: "Design a chart in 60 minutes", type: "reading", durationMinutes: 4 },
          { title: "Hands-On Activity: Create your own visualization", type: "practice", durationMinutes: 60 },
          { title: "Test your knowledge on exploring data visualizations", type: "practice", durationMinutes: 8 },
        ],
      },
      {
        name: "Module 1 challenge",
        items: [
          { title: "Glossary terms from module 1", type: "reading", durationMinutes: 2 },
          { title: "Module 1 challenge", type: "graded", durationMinutes: 30 },
        ],
      },
    ],
  },
  {
    number: 2,
    name: "Create data visualizations with Tableau",
    groups: [
      {
        name: "Get started with Tableau",
        items: [
          { title: "Data visualizations with Tableau", type: "video", durationMinutes: 1 },
          { title: "Tableau Public and other online tools", type: "video", durationMinutes: 2 },
          { title: "Begin to use Tableau Public", type: "reading", durationMinutes: 8 },
          { title: "Meet Tableau", type: "video", durationMinutes: 9 },
          { title: "Visualizations in spreadsheets and Tableau", type: "reading", durationMinutes: 8 },
        ],
      },
      {
        name: "Design visualizations in Tableau",
        items: [
          { title: "Create a data visualization in Tableau", type: "video", durationMinutes: 5 },
          { title: "Hands-On Activity: Create a data visualization in Tableau", type: "practice", durationMinutes: 60 },
          { title: "Optimize the color palette in data visualization", type: "video", durationMinutes: 3 },
          { title: "Essential design principles", type: "reading", durationMinutes: 8 },
        ],
      },
      {
        name: "Optional: Work with multiple data sources",
        items: [
          { title: "Optional: Using Tableau Desktop", type: "reading", durationMinutes: 8 },
        ],
      },
      {
        name: "Module 2 challenge",
        items: [
          { title: "Module 2 challenge", type: "graded", durationMinutes: 30 },
        ],
      },
    ],
  },
  {
    number: 3,
    name: "Craft data stories",
    groups: [
      {
        name: "Data-driven storytelling",
        items: [
          { title: "Crafting compelling data narratives", type: "video", durationMinutes: 5 },
          { title: "The structure of a data story", type: "reading", durationMinutes: 8 },
        ],
      },
      {
        name: "Tableau dashboards",
        items: [
          { title: "Build your first Tableau dashboard", type: "video", durationMinutes: 6 },
          { title: "Dashboard design best practices", type: "reading", durationMinutes: 8 },
        ],
      },
      {
        name: "Share data stories",
        items: [
          { title: "Publishing and sharing your work", type: "video", durationMinutes: 4 },
        ],
      },
      {
        name: "Module 3 challenge",
        items: [
          { title: "Module 3 challenge", type: "graded", durationMinutes: 30 },
        ],
      },
    ],
  },
  {
    number: 4,
    name: "Develop presentations and slideshows",
    groups: [
      {
        name: "The art and science of presentations",
        items: [
          { title: "Why presentations matter", type: "video", durationMinutes: 4 },
          { title: "Presentation fundamentals", type: "reading", durationMinutes: 8 },
        ],
      },
      {
        name: "Presentation skills and practices",
        items: [
          { title: "Delivering with confidence", type: "video", durationMinutes: 5 },
        ],
      },
      {
        name: "Data caveats and limitations",
        items: [
          { title: "Acknowledging data limitations", type: "reading", durationMinutes: 6 },
        ],
      },
      {
        name: "Listen, respond, and include",
        items: [
          { title: "Q&A and stakeholder engagement", type: "video", durationMinutes: 5 },
        ],
      },
      {
        name: "Module 4 challenge",
        items: [
          { title: "Module 4 challenge", type: "graded", durationMinutes: 30 },
        ],
      },
      {
        name: "Course wrap-up",
        items: [
          { title: "Course wrap-up", type: "video", durationMinutes: 2 },
        ],
      },
    ],
  },
];

/**
 * Build the M1-style syllabus. The course's id, partner, and targetSkillIds are
 * preserved (so XP attribution still works for the learner's role); only the
 * displayed structure (modules, lesson groups, items) is overridden.
 */
function buildM1Syllabus(course: PlanCourse): LexSyllabus {
  const modules: LexModule[] = M1_MODULES.map((m) => {
    const lessonGroups: LexLessonGroup[] = m.groups.map((g, gIdx) => ({
      id: `${course.id}-m${m.number}-g${gIdx + 1}`,
      title: g.name,
      items: g.items.map((seed, iIdx) => ({
        id: `${course.id}-m${m.number}-g${gIdx + 1}-i${iIdx + 1}`,
        title: seed.title,
        type: seed.type,
        durationMinutes: seed.durationMinutes,
        xpValue: computeItemXp(seed.type, seed.durationMinutes),
        skillTags: course.skills.length > 0 ? [course.skills[0]] : ["Data Visualization"],
      })),
    }));

    return {
      id: `${course.id}-module-${m.number}`,
      title: `Module ${m.number}`,
      subtitle: m.name,
      lessonGroups,
    };
  });

  return {
    courseId: course.id,
    courseTitle: M1_COURSE_TITLE,
    partner: course.partners[0] ?? "Coursera",
    modules,
    targetSkillIds: course.targetSkillIds,
  };
}

export function generateSyllabusForCourse(course: PlanCourse): LexSyllabus {
  return buildM1Syllabus(course);
}
