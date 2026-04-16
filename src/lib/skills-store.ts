/**
 * Skills Store — XP tracking at expression level, level computation, and mastery checking.
 * Pure functions operating on immutable data structures.
 *
 * XP system: 0–300 per skill expression, area XP = sum of expression XP.
 * Priority: "should" (gap), "might" (needs deepening), "optional" (nice-to-have).
 */

import type { RoleDefinition } from "./role-catalog";

// ── Types ──────────────────────────────────────────────────────────────────

export type SkillLevel =
  | "Not started"
  | "Practicing"
  | "Developing"
  | "Comprehending"
  | "Mastered";

export type SkillPriority = "should" | "might" | "optional";

export type ExpressionStage = "Learning" | "Applying" | null;

export interface ExpressionProgress {
  expressionId: string;
  expressionName: string;
  currentXp: number; // 0–300
}

export interface SkillProgress {
  skillId: string;
  skillName: string;
  currentXp: number; // sum of expression XP
  xpMax: number; // sum of expression xpMax
  level: SkillLevel;
  priority: SkillPriority;
  expressions: Record<string, ExpressionProgress>;
}

export interface RoleProgress {
  roleId: string;
  roleTitle: string;
  skills: Record<string, SkillProgress>;
  isMastered: boolean;
}

export interface GapAnalysis {
  should: string[];
  might: string[];
  optional: string[];
}

// ── Constants ──────────────────────────────────────────────────────────────

export const EXPRESSION_XP_MAX = 300;

/** @deprecated Use skill.xpMax instead — skill areas now have variable max XP. */
export const XP_MAX = 1500;

// ── Functions ──────────────────────────────────────────────────────────────

/** Compute the skill level based on percentage of xpMax reached. */
export function computeLevel(xp: number, xpMax: number = XP_MAX): SkillLevel {
  if (xpMax <= 0 || xp <= 0) return "Not started";
  const pct = xp / xpMax;
  if (pct >= 1) return "Mastered";
  if (pct >= 0.5) return "Comprehending";
  if (pct >= 0.25) return "Developing";
  return "Practicing";
}

/** Compute mastery percentage (0–100) for a single skill. */
export function computeSkillPercent(xp: number, xpMax: number = XP_MAX): number {
  if (xpMax <= 0) return 0;
  return Math.round((Math.max(0, Math.min(xpMax, xp)) / xpMax) * 100);
}

/** Compute expression stage: Learning (0-40%), Applying (41%+), null (0%). */
export function computeExpressionStage(xp: number): ExpressionStage {
  if (xp <= 0) return null;
  const pct = (xp / EXPRESSION_XP_MAX) * 100;
  return pct <= 40 ? "Learning" : "Applying";
}

/** Compute overall mastery percentage across all "should" skills. */
export function computeOverallMastery(progress: RoleProgress): number {
  const shouldSkills = Object.values(progress.skills).filter(
    (s) => s.priority === "should"
  );
  if (shouldSkills.length === 0) return 0;
  const totalXp = shouldSkills.reduce((sum, s) => sum + s.currentXp, 0);
  const maxXp = shouldSkills.reduce((sum, s) => sum + s.xpMax, 0);
  if (maxXp === 0) return 0;
  return Math.round((totalXp / maxXp) * 100);
}

/**
 * Create initial RoleProgress from a role definition and gap analysis.
 * All expressions start at 0 XP.
 */
export function createInitialProgress(
  role: RoleDefinition,
  gapAnalysis: GapAnalysis
): RoleProgress {
  const skills: Record<string, SkillProgress> = {};

  for (const skill of role.skills) {
    let priority: SkillPriority = "optional";
    if (gapAnalysis.should.includes(skill.id)) priority = "should";
    else if (gapAnalysis.might.includes(skill.id)) priority = "might";

    const expressions: Record<string, ExpressionProgress> = {};
    for (const expr of skill.expressions) {
      expressions[expr.id] = {
        expressionId: expr.id,
        expressionName: expr.name,
        currentXp: 0,
      };
    }

    skills[skill.id] = {
      skillId: skill.id,
      skillName: skill.name,
      currentXp: 0,
      xpMax: skill.xpMax,
      level: "Not started",
      priority,
      expressions,
    };
  }

  return {
    roleId: role.id,
    roleTitle: role.title,
    skills,
    isMastered: false,
  };
}

/** Recompute area-level XP and level from its expressions. */
function recomputeAreaFromExpressions(skill: SkillProgress): SkillProgress {
  const currentXp = Object.values(skill.expressions).reduce(
    (sum, e) => sum + e.currentXp, 0
  );
  return {
    ...skill,
    currentXp,
    level: computeLevel(currentXp, skill.xpMax),
  };
}

/**
 * Record XP earned for a specific skill area.
 * Distributes XP across expressions in order (fills each before moving to next).
 */
export function addSkillXp(
  progress: RoleProgress,
  skillId: string,
  xpEarned: number
): RoleProgress {
  const existing = progress.skills[skillId];
  if (!existing) return progress;

  let remaining = xpEarned;
  const updatedExpressions = { ...existing.expressions };
  for (const [id, expr] of Object.entries(updatedExpressions)) {
    if (remaining <= 0) break;
    const room = EXPRESSION_XP_MAX - expr.currentXp;
    if (room <= 0) continue;
    const add = Math.min(remaining, room);
    updatedExpressions[id] = { ...expr, currentXp: expr.currentXp + add };
    remaining -= add;
  }

  const updated = recomputeAreaFromExpressions({
    ...existing,
    expressions: updatedExpressions,
  });

  const updatedSkills = { ...progress.skills, [skillId]: updated };
  const updatedProgress: RoleProgress = {
    ...progress,
    skills: updatedSkills,
    isMastered: false,
  };
  updatedProgress.isMastered = checkMastery(updatedProgress);
  return updatedProgress;
}

/**
 * Complete a course, distributing XP across multiple skills.
 * `skillXpMap` maps skill IDs to XP amounts earned.
 */
export function completeCourse(
  progress: RoleProgress,
  skillXpMap: Record<string, number>
): RoleProgress {
  let updated = progress;
  for (const [skillId, xp] of Object.entries(skillXpMap)) {
    updated = addSkillXp(updated, skillId, xp);
  }
  return updated;
}

/** Check if all "should" skills have reached max XP. */
export function checkMastery(progress: RoleProgress): boolean {
  const shouldSkills = Object.values(progress.skills).filter(
    (s) => s.priority === "should"
  );
  if (shouldSkills.length === 0) return false;
  return shouldSkills.every((s) => s.currentXp >= s.xpMax);
}

/** Set all expressions to max XP and mark as mastered. */
export function setAllMastered(progress: RoleProgress): RoleProgress {
  const skills: Record<string, SkillProgress> = {};
  for (const [id, skill] of Object.entries(progress.skills)) {
    const expressions: Record<string, ExpressionProgress> = {};
    for (const [exprId, expr] of Object.entries(skill.expressions)) {
      expressions[exprId] = { ...expr, currentXp: EXPRESSION_XP_MAX };
    }
    skills[id] = {
      ...skill,
      currentXp: skill.xpMax,
      level: "Mastered",
      expressions,
    };
  }
  return { ...progress, skills, isMastered: true };
}

/** Set random XP for each expression. For proto tools. */
export function setRandomProgress(progress: RoleProgress): RoleProgress {
  const skills: Record<string, SkillProgress> = {};
  for (const [id, skill] of Object.entries(progress.skills)) {
    const expressions: Record<string, ExpressionProgress> = {};
    for (const [exprId, expr] of Object.entries(skill.expressions)) {
      expressions[exprId] = {
        ...expr,
        currentXp: Math.floor(Math.random() * (EXPRESSION_XP_MAX + 1)),
      };
    }
    const updated = recomputeAreaFromExpressions({ ...skill, expressions });
    skills[id] = updated;
  }
  const updatedProgress: RoleProgress = { ...progress, skills, isMastered: false };
  updatedProgress.isMastered = checkMastery(updatedProgress);
  return updatedProgress;
}

/** Reset all expressions to 0 XP. */
export function resetProgress(progress: RoleProgress): RoleProgress {
  const skills: Record<string, SkillProgress> = {};
  for (const [id, skill] of Object.entries(progress.skills)) {
    const expressions: Record<string, ExpressionProgress> = {};
    for (const [exprId, expr] of Object.entries(skill.expressions)) {
      expressions[exprId] = { ...expr, currentXp: 0 };
    }
    skills[id] = {
      ...skill,
      currentXp: 0,
      level: "Not started",
      expressions,
    };
  }
  return { ...progress, skills, isMastered: false };
}

/** Get skills sorted by priority (should -> might -> optional), then by name. */
export function getSkillsByPriority(progress: RoleProgress): SkillProgress[] {
  const order: Record<SkillPriority, number> = { should: 0, might: 1, optional: 2 };
  return Object.values(progress.skills).sort(
    (a, b) => order[a.priority] - order[b.priority] || a.skillName.localeCompare(b.skillName)
  );
}

/** Count skills at each level. */
export function getSkillLevelCounts(progress: RoleProgress): Record<SkillLevel, number> {
  const counts: Record<SkillLevel, number> = {
    "Not started": 0,
    Practicing: 0,
    Developing: 0,
    Comprehending: 0,
    Mastered: 0,
  };
  for (const skill of Object.values(progress.skills)) {
    counts[skill.level]++;
  }
  return counts;
}
