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

// ── Deterministic seeded random ───────────────────────────────────────────

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Mock Syllabus Generator ───────────────────────────────────────────────

const VIDEO_TITLES = [
  "Introduction to {skill}",
  "Understanding {skill} concepts",
  "Working with {skill} in practice",
  "{skill}: Core techniques",
  "Applying {skill} to real problems",
  "Deep dive into {skill}",
  "{skill} best practices",
  "Advanced {skill} methods",
];

const READING_TITLES = [
  "Key concepts in {skill}",
  "{skill} reference guide",
  "Practical tips for {skill}",
  "Case study: {skill} in action",
];

const PRACTICE_TITLES = [
  "Practice: {skill} fundamentals",
  "Hands-on exercise: {skill}",
  "Lab: Apply {skill} techniques",
];

const ASSIGNMENT_TITLES = [
  "Module assessment: {skill}",
  "Graded quiz: {skill}",
];

const LESSON_GROUP_NAMES = [
  "Getting started",
  "Core concepts",
  "Working with data",
  "Building foundations",
  "Practical applications",
  "Tools and techniques",
  "Analysis methods",
  "Advanced topics",
  "Review and practice",
  "Putting it all together",
];

function pickTitle(titles: string[], skill: string, rand: () => number): string {
  const template = titles[Math.floor(rand() * titles.length)];
  return template.replace("{skill}", skill);
}

function makeItem(
  id: string,
  type: LexItemType,
  skill: string,
  rand: () => number,
): LexItem {
  let durationMinutes: number;
  let titles: string[];
  switch (type) {
    case "video":
      durationMinutes = [3, 5, 6, 8, 10][Math.floor(rand() * 5)];
      titles = VIDEO_TITLES;
      break;
    case "reading":
      durationMinutes = [5, 8, 10, 15][Math.floor(rand() * 4)];
      titles = READING_TITLES;
      break;
    case "practice":
      durationMinutes = [10, 15, 30][Math.floor(rand() * 3)];
      titles = PRACTICE_TITLES;
      break;
    case "graded":
      durationMinutes = [20, 30, 45][Math.floor(rand() * 3)];
      titles = ASSIGNMENT_TITLES;
      break;
  }
  return {
    id,
    title: pickTitle(titles, skill, rand),
    type,
    durationMinutes,
    xpValue: computeItemXp(type, durationMinutes),
    skillTags: [skill],
  };
}

export function generateSyllabusForCourse(course: PlanCourse): LexSyllabus {
  const rand = seededRandom(course.id);
  const skills = course.skills.length > 0 ? course.skills : ["Data Analysis"];
  const moduleCount = 2 + Math.floor(rand() * 2); // 2-3 modules
  const modules: LexModule[] = [];
  let itemCounter = 0;

  for (let m = 0; m < moduleCount; m++) {
    const groupCount = 2 + Math.floor(rand() * 2); // 2-3 lesson groups
    const lessonGroups: LexLessonGroup[] = [];

    for (let g = 0; g < groupCount; g++) {
      const itemCount = 3 + Math.floor(rand() * 2); // 3-4 items
      const items: LexItem[] = [];

      for (let i = 0; i < itemCount; i++) {
        const skill = skills[Math.floor(rand() * skills.length)];
        const isLastItemInLastGroup = g === groupCount - 1 && i === itemCount - 1;
        const isLastModule = m === moduleCount - 1;

        let type: LexItemType;
        if (isLastItemInLastGroup && isLastModule) {
          type = "graded";
        } else if (isLastItemInLastGroup) {
          type = "practice";
        } else {
          type = rand() < 0.6 ? "video" : "reading";
        }

        itemCounter++;
        items.push(
          makeItem(`${course.id}-item-${itemCounter}`, type, skill, rand),
        );
      }

      const groupName = LESSON_GROUP_NAMES[(m * groupCount + g) % LESSON_GROUP_NAMES.length];
      lessonGroups.push({
        id: `${course.id}-m${m + 1}-g${g + 1}`,
        title: groupName,
        items,
      });
    }

    const primarySkill = skills[m % skills.length];
    modules.push({
      id: `${course.id}-module-${m + 1}`,
      title: `Module ${m + 1}`,
      subtitle: primarySkill,
      lessonGroups,
    });
  }

  return {
    courseId: course.id,
    courseTitle: course.name,
    partner: course.partners[0] ?? "Coursera",
    modules,
    targetSkillIds: course.targetSkillIds,
  };
}
