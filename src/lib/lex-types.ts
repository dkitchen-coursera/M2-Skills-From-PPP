export type LexItemType = "video" | "reading" | "practice" | "graded";

export interface LexItem {
  id: string;
  title: string;
  type: LexItemType;
  durationMinutes: number;
  xpValue: number;
  skillTags: string[];
}

export interface LexLessonGroup {
  id: string;
  title: string;
  items: LexItem[];
}

export interface LexModule {
  id: string;
  title: string;
  subtitle?: string;
  lessonGroups: LexLessonGroup[];
}

export interface LexSyllabus {
  courseId: string;
  courseTitle: string;
  partner: string;
  modules: LexModule[];
  targetSkillIds: string[];
}

export interface DailyGoal {
  id: string;
  label: string;
  target: number;
  icon: "star" | "practice" | "coach" | "graded";
}
