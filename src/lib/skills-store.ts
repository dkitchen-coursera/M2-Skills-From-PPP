/**
 * Skills Store — XP tracking at expression level, level computation, and mastery checking.
 * Pure functions operating on immutable data structures.
 *
 * XP system: 0–300 per skill expression, area XP = sum of expression XP.
 * Priority: "should" (gap), "might" (needs deepening), "optional" (nice-to-have).
 */

import type { RoleDefinition } from "./role-catalog";
import type { MasteryGroupDef, MasteryLevel } from "./data/da-mastery-groups";

// ── Types ──────────────────────────────────────────────────────────────────

/**
 * Derived 5-state mastery scale, computed from XP percentage. Distinct from
 * the taxonomy-level ("Beginner", "Intermediate", ...) used by mastery groups.
 */
export type MasteryStage =
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
  level: MasteryStage;
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

/** Compute the derived mastery stage from XP percentage. */
export function computeStage(xp: number, xpMax: number = XP_MAX): MasteryStage {
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
    level: computeStage(currentXp, skill.xpMax),
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

/** Count skills at each mastery stage. */
export function getSkillLevelCounts(progress: RoleProgress): Record<MasteryStage, number> {
  const counts: Record<MasteryStage, number> = {
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

// ── Group-shaped progress ──────────────────────────────────────────────────
//
// The new model groups expressions by `{skill × mastery-level}` tuples instead
// of skill areas. Types and helpers here run in PARALLEL to the area-based
// ones above — the Data Analyst role migrates to this shape (Phase 3), while
// other roles stay on the legacy `SkillProgress`/`skills` model for now.

export type { MasteryLevel };

/** Unique id for a mastery group: `${skillSlug}::${level-lowercase}`. */
export type GroupKey = string;

export interface MasteryGroup {
  key: GroupKey;
  skillSlug: string;
  skillName: string;
  level: MasteryLevel;
  /** Precomputed "Intermediate SQL" style label. */
  displayName: string;
  /** Data Career Band. Band 1 is required for the DA plan; Band 2 surfaces as "Other". */
  careerBand: 1 | 2;
  currentXp: number;
  xpMax: number;
  stage: MasteryStage;
  priority: SkillPriority;
  expressions: Record<string, ExpressionProgress>;
}

export interface GroupRoleProgress {
  model: "groups";
  roleId: string;
  roleTitle: string;
  groups: Record<GroupKey, MasteryGroup>;
  /** Group keys that count toward plan completion (Band 1 for DA). */
  requiredGroupKeys: GroupKey[];
  isMastered: boolean;
}

/** Distinguish between the legacy area-shape and the new group-shape at runtime. */
export function isGroupRoleProgress(
  progress: RoleProgress | GroupRoleProgress | null | undefined,
): progress is GroupRoleProgress {
  return !!progress && (progress as GroupRoleProgress).model === "groups";
}

/** Union of both progress shapes, for state-holding code that must accept either. */
export type AnyRoleProgress = RoleProgress | GroupRoleProgress;

/**
 * Build a fresh progress record for any role, dispatching on its `model`.
 *
 * The LLM currently emits gap analysis in the legacy area-id space — for
 * group-model roles we default the gap to "Band 1 = should, Band 2 = optional"
 * until Phase 5 updates the prompts to emit group keys.
 */
export function createInitialProgressForRole(
  role: RoleDefinition,
  areaGap: GapAnalysis,
): AnyRoleProgress {
  if (role.model === "groups" && role.groups) {
    const groupGap: GroupGapAnalysis = {
      should: role.groups.filter((g) => g.careerBand === 1).map((g) => g.key),
      might: [],
      optional: role.groups.filter((g) => g.careerBand === 2).map((g) => g.key),
    };
    return createInitialProgressFromGroups({
      roleId: role.id,
      roleTitle: role.title,
      defs: role.groups,
      gap: groupGap,
    });
  }
  return createInitialProgress(role, areaGap);
}

// ── Group gap analysis ─────────────────────────────────────────────────────

/** Gap analysis over group keys (separate from the area-based `GapAnalysis`). */
export interface GroupGapAnalysis {
  should: GroupKey[];
  might: GroupKey[];
  optional: GroupKey[];
}

// ── Group helpers ──────────────────────────────────────────────────────────

function groupPriority(key: GroupKey, gap: GroupGapAnalysis): SkillPriority {
  if (gap.should.includes(key)) return "should";
  if (gap.might.includes(key)) return "might";
  return "optional";
}

function recomputeGroupFromExpressions(group: MasteryGroup): MasteryGroup {
  const currentXp = Object.values(group.expressions).reduce(
    (sum, e) => sum + e.currentXp,
    0,
  );
  return {
    ...group,
    currentXp,
    stage: computeStage(currentXp, group.xpMax),
  };
}

/**
 * Create a fresh GroupRoleProgress from a list of group definitions and a gap
 * analysis over group keys. Every expression starts at 0 XP.
 *
 * `requiredGroupKeys` defaults to the Band 1 subset of `defs` — appropriate
 * for the Data Analyst career-focused plan. Pass an explicit list to scope
 * completion differently (e.g. a skills-first plan that targets specific groups).
 */
export function createInitialProgressFromGroups(opts: {
  roleId: string;
  roleTitle: string;
  defs: MasteryGroupDef[];
  gap: GroupGapAnalysis;
  requiredGroupKeys?: GroupKey[];
}): GroupRoleProgress {
  const { roleId, roleTitle, defs, gap } = opts;
  const groups: Record<GroupKey, MasteryGroup> = {};
  for (const def of defs) {
    const expressions: Record<string, ExpressionProgress> = {};
    for (const expr of def.expressions) {
      expressions[expr.id] = {
        expressionId: expr.id,
        expressionName: expr.name,
        currentXp: 0,
      };
    }
    const xpMax = def.expressions.length * EXPRESSION_XP_MAX;
    groups[def.key] = {
      key: def.key,
      skillSlug: def.skillSlug,
      skillName: def.skillName,
      level: def.level,
      displayName: def.displayName,
      careerBand: def.careerBand,
      currentXp: 0,
      xpMax,
      stage: "Not started",
      priority: groupPriority(def.key, gap),
      expressions,
    };
  }
  const requiredGroupKeys =
    opts.requiredGroupKeys ?? defs.filter((d) => d.careerBand === 1).map((d) => d.key);
  return {
    model: "groups",
    roleId,
    roleTitle,
    groups,
    requiredGroupKeys,
    isMastered: false,
  };
}

/**
 * Distribute XP across the expressions of a group, filling each in order up to
 * its xpMax. Matches the semantics of `addSkillXp` for the area model.
 */
export function addGroupXp(
  progress: GroupRoleProgress,
  groupKey: GroupKey,
  xpEarned: number,
): GroupRoleProgress {
  const existing = progress.groups[groupKey];
  if (!existing || xpEarned <= 0) return progress;

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

  const updated = recomputeGroupFromExpressions({
    ...existing,
    expressions: updatedExpressions,
  });
  const next: GroupRoleProgress = {
    ...progress,
    groups: { ...progress.groups, [groupKey]: updated },
    isMastered: false,
  };
  next.isMastered = checkMasteryGroups(next);
  return next;
}

/**
 * Award XP for a course completion, distributing across multiple groups.
 * Same signature shape as `completeCourse` but operating on group keys.
 */
export function completeCourseByGroups(
  progress: GroupRoleProgress,
  groupXpMap: Record<GroupKey, number>,
): GroupRoleProgress {
  let updated = progress;
  for (const [key, xp] of Object.entries(groupXpMap)) {
    updated = addGroupXp(updated, key, xp);
  }
  return updated;
}

/** All required groups have every expression at xpMax. */
export function checkMasteryGroups(progress: GroupRoleProgress): boolean {
  if (progress.requiredGroupKeys.length === 0) return false;
  for (const key of progress.requiredGroupKeys) {
    const group = progress.groups[key];
    if (!group) return false;
    if (group.currentXp < group.xpMax) return false;
  }
  return true;
}

/** Overall mastery percent across the REQUIRED groups (Band 1 for DA). */
export function computeOverallMasteryGroups(progress: GroupRoleProgress): number {
  const required = progress.requiredGroupKeys
    .map((k) => progress.groups[k])
    .filter((g): g is MasteryGroup => !!g);
  if (required.length === 0) return 0;
  const totalXp = required.reduce((sum, g) => sum + g.currentXp, 0);
  const maxXp = required.reduce((sum, g) => sum + g.xpMax, 0);
  if (maxXp === 0) return 0;
  return Math.round((totalXp / maxXp) * 100);
}

/** Set every expression in every group to its xpMax — proto-tools demo. */
export function setAllMasteredGroups(progress: GroupRoleProgress): GroupRoleProgress {
  const groups: Record<GroupKey, MasteryGroup> = {};
  for (const [key, group] of Object.entries(progress.groups)) {
    const expressions: Record<string, ExpressionProgress> = {};
    for (const [exprId, expr] of Object.entries(group.expressions)) {
      expressions[exprId] = { ...expr, currentXp: EXPRESSION_XP_MAX };
    }
    groups[key] = {
      ...group,
      currentXp: group.xpMax,
      stage: "Mastered",
      expressions,
    };
  }
  return { ...progress, groups, isMastered: true };
}

/** Random XP per expression — proto-tools demo for mixed stages. */
export function setRandomProgressGroups(progress: GroupRoleProgress): GroupRoleProgress {
  const groups: Record<GroupKey, MasteryGroup> = {};
  for (const [key, group] of Object.entries(progress.groups)) {
    const expressions: Record<string, ExpressionProgress> = {};
    for (const [exprId, expr] of Object.entries(group.expressions)) {
      expressions[exprId] = {
        ...expr,
        currentXp: Math.floor(Math.random() * (EXPRESSION_XP_MAX + 1)),
      };
    }
    groups[key] = recomputeGroupFromExpressions({ ...group, expressions });
  }
  const next: GroupRoleProgress = { ...progress, groups, isMastered: false };
  next.isMastered = checkMasteryGroups(next);
  return next;
}

/** Reset every expression to 0 XP. */
export function resetProgressGroups(progress: GroupRoleProgress): GroupRoleProgress {
  const groups: Record<GroupKey, MasteryGroup> = {};
  for (const [key, group] of Object.entries(progress.groups)) {
    const expressions: Record<string, ExpressionProgress> = {};
    for (const [exprId, expr] of Object.entries(group.expressions)) {
      expressions[exprId] = { ...expr, currentXp: 0 };
    }
    groups[key] = { ...group, currentXp: 0, stage: "Not started", expressions };
  }
  return { ...progress, groups, isMastered: false };
}

/** Priority order: should → might → optional; then Band 1 before Band 2; then level asc; then displayName. */
const LEVEL_ORDER: Record<MasteryLevel, number> = {
  Foundational: 0,
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export function getGroupsByPriority(progress: GroupRoleProgress): MasteryGroup[] {
  const priorityOrder: Record<SkillPriority, number> = { should: 0, might: 1, optional: 2 };
  return Object.values(progress.groups).sort((a, b) => {
    const p = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (p !== 0) return p;
    const band = a.careerBand - b.careerBand;
    if (band !== 0) return band;
    const lvl = LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level];
    if (lvl !== 0) return lvl;
    return a.displayName.localeCompare(b.displayName);
  });
}

// ── Shape-agnostic adapter ─────────────────────────────────────────────────

/**
 * Normalized "unit of mastery" view for UI components that shouldn't care
 * whether the underlying role uses areas or groups. Returns ONE entry per
 * skill area (legacy) or per mastery group (new), sorted by priority.
 */
export interface RoleUnit {
  /** Stable id: skill-area id (legacy) or group key (new). */
  key: string;
  /** Display label — area name (legacy) or "Intermediate SQL" (new). */
  displayName: string;
  currentXp: number;
  xpMax: number;
  stage: MasteryStage;
  priority: SkillPriority;
  /** Only present on group-shape units. */
  careerBand?: 1 | 2;
  /** True when the unit is part of plan completion (required set). */
  required: boolean;
}

/**
 * Look up a single unit of mastery by its key — area id or group key.
 * Returns null when the key isn't found or when `progress` is null.
 */
export function lookupRoleUnit(
  progress: RoleProgress | GroupRoleProgress | null | undefined,
  key: string,
): RoleUnit | null {
  if (!progress) return null;
  if (isGroupRoleProgress(progress)) {
    const g = progress.groups[key];
    if (!g) return null;
    return {
      key: g.key,
      displayName: g.displayName,
      currentXp: g.currentXp,
      xpMax: g.xpMax,
      stage: g.stage,
      priority: g.priority,
      careerBand: g.careerBand,
      required: progress.requiredGroupKeys.includes(g.key),
    };
  }
  const s = progress.skills[key];
  if (!s) return null;
  return {
    key: s.skillId,
    displayName: s.skillName,
    currentXp: s.currentXp,
    xpMax: s.xpMax,
    stage: s.level,
    priority: s.priority,
    required: s.priority === "should",
  };
}

export function getRoleUnits(
  progress: RoleProgress | GroupRoleProgress | null | undefined,
): RoleUnit[] {
  if (!progress) return [];
  if (isGroupRoleProgress(progress)) {
    const requiredSet = new Set(progress.requiredGroupKeys);
    return getGroupsByPriority(progress).map((g) => ({
      key: g.key,
      displayName: g.displayName,
      currentXp: g.currentXp,
      xpMax: g.xpMax,
      stage: g.stage,
      priority: g.priority,
      careerBand: g.careerBand,
      required: requiredSet.has(g.key),
    }));
  }
  return getSkillsByPriority(progress).map((s) => ({
    key: s.skillId,
    displayName: s.skillName,
    currentXp: s.currentXp,
    xpMax: s.xpMax,
    stage: s.level,
    priority: s.priority,
    required: s.priority === "should",
  }));
}

// ── Stacked (per-base-skill) view ──────────────────────────────────────────
//
// Collapses the per-group rows (Foundational Relational Databases, Beginner
// Relational Databases, ...) into one entry per base skill. A learner is
// labeled at a given mastery level only after every lower level is fully
// mastered; out-of-order XP is preserved in the underlying MasteryGroup and
// surfaces as a muted fill on the upper segment.

export const ALL_MASTERY_LEVELS: MasteryLevel[] = [
  "Foundational",
  "Beginner",
  "Intermediate",
  "Advanced",
];

/** Export for UI components that need to compare levels. */
export { LEVEL_ORDER };

export interface StackedLevel {
  level: MasteryLevel;
  /** Empty string when `isMissing`. */
  groupKey: GroupKey;
  /** "Intermediate Relational Databases". Synthesised when the group is missing. */
  displayName: string;
  currentXp: number;
  xpMax: number;
  stage: MasteryStage;
  /** xpMax > 0 && currentXp >= xpMax */
  isComplete: boolean;
  /** groupKey appears in progress.requiredGroupKeys */
  isRequired: boolean;
  /** All non-missing lower levels are complete. */
  isUnlocked: boolean;
  /** No group is defined for this {skill × level}. */
  isMissing: boolean;
  /** Level ordinal is above targetLevel (optional / stretch goal). */
  isBeyondTarget: boolean;
}

export interface StackedSkill {
  skillSlug: string;
  skillName: string;
  /** Length 4, ordered Foundational → Advanced. */
  levels: StackedLevel[];
  /** Highest contiguous mastered level; null when Foundational is incomplete. */
  currentLevel: MasteryLevel | null;
  /** Highest required level for the active role; null when no level is required. */
  targetLevel: MasteryLevel | null;
  totalCurrentXp: number;
  totalXpMax: number;
  anyRequired: boolean;
  /** Highest priority across present levels (should > might > optional). */
  priority: SkillPriority;
}

/** Highest level L where L and all non-missing levels below L are complete. */
export function computeCurrentLevel(levels: StackedLevel[]): MasteryLevel | null {
  let current: MasteryLevel | null = null;
  for (const level of ALL_MASTERY_LEVELS) {
    const slot = levels.find((l) => l.level === level);
    if (!slot) break;
    if (slot.isMissing) continue;
    if (!slot.isComplete) break;
    current = level;
  }
  return current;
}

/** Collapse a group-model progress record into one StackedSkill per skillSlug. */
export function groupProgressBySkill(progress: GroupRoleProgress): StackedSkill[] {
  const priorityOrder: Record<SkillPriority, number> = { should: 0, might: 1, optional: 2 };
  const requiredSet = new Set(progress.requiredGroupKeys);

  // Bucket groups by skillSlug.
  const bySlug = new Map<string, MasteryGroup[]>();
  for (const group of Object.values(progress.groups)) {
    const list = bySlug.get(group.skillSlug);
    if (list) list.push(group);
    else bySlug.set(group.skillSlug, [group]);
  }

  const result: StackedSkill[] = [];
  for (const [skillSlug, groups] of bySlug) {
    const skillName = groups[0].skillName;

    // Preliminary pass: build a per-level map (no flags computed yet).
    const byLevel = new Map<MasteryLevel, MasteryGroup>();
    for (const g of groups) byLevel.set(g.level, g);

    // Compute targetLevel first — it's needed to stamp isBeyondTarget on each slot.
    let targetLevel: MasteryLevel | null = null;
    for (const level of ALL_MASTERY_LEVELS) {
      const g = byLevel.get(level);
      if (g && requiredSet.has(g.key)) targetLevel = level;
    }
    const targetOrdinal = targetLevel == null ? -1 : LEVEL_ORDER[targetLevel];

    // Build 4 slots with all flags except isUnlocked (computed next).
    const levels: StackedLevel[] = ALL_MASTERY_LEVELS.map((level) => {
      const g = byLevel.get(level);
      if (!g) {
        return {
          level,
          groupKey: "",
          displayName: `${level} ${skillName}`,
          currentXp: 0,
          xpMax: 0,
          stage: "Not started" as MasteryStage,
          isComplete: false,
          isRequired: false,
          isUnlocked: false,
          isMissing: true,
          isBeyondTarget: LEVEL_ORDER[level] > targetOrdinal && targetLevel != null,
        };
      }
      return {
        level,
        groupKey: g.key,
        displayName: g.displayName,
        currentXp: g.currentXp,
        xpMax: g.xpMax,
        stage: g.stage,
        isComplete: g.xpMax > 0 && g.currentXp >= g.xpMax,
        isRequired: requiredSet.has(g.key),
        isUnlocked: false, // filled in below
        isMissing: false,
        isBeyondTarget: LEVEL_ORDER[level] > targetOrdinal && targetLevel != null,
      };
    });

    // Second pass: isUnlocked = all non-missing levels below are complete.
    for (let i = 0; i < levels.length; i++) {
      const lower = levels.slice(0, i);
      levels[i].isUnlocked = lower.every((l) => l.isMissing || l.isComplete);
    }

    const currentLevel = computeCurrentLevel(levels);
    const totalCurrentXp = levels.reduce((sum, l) => sum + l.currentXp, 0);
    const totalXpMax = levels.reduce((sum, l) => sum + l.xpMax, 0);
    const anyRequired = levels.some((l) => l.isRequired);
    const priority: SkillPriority = (() => {
      const present = groups.map((g) => g.priority);
      if (present.includes("should")) return "should";
      if (present.includes("might")) return "might";
      return "optional";
    })();

    result.push({
      skillSlug,
      skillName,
      levels,
      currentLevel,
      targetLevel,
      totalCurrentXp,
      totalXpMax,
      anyRequired,
      priority,
    });
  }

  // Sort: required first → priority → name.
  result.sort((a, b) => {
    if (a.anyRequired !== b.anyRequired) return a.anyRequired ? -1 : 1;
    const p = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (p !== 0) return p;
    return a.skillName.localeCompare(b.skillName);
  });

  return result;
}

/** True when the learner's current level has reached (or exceeded) the target. */
export function hasReachedTarget(skill: StackedSkill): boolean {
  if (skill.targetLevel == null) return true;
  if (skill.currentLevel == null) return false;
  return LEVEL_ORDER[skill.currentLevel] >= LEVEL_ORDER[skill.targetLevel];
}

export interface BaseSkillTargetStatus {
  skillSlug: string;
  skillName: string;
  currentLevel: MasteryLevel | null;
  targetLevel: MasteryLevel | null;
  targetReached: boolean;
}

/** Per-skill summary of whether the learner has hit the role's target level. */
export function checkBaseSkillTargets(progress: GroupRoleProgress): BaseSkillTargetStatus[] {
  return groupProgressBySkill(progress).map((s) => ({
    skillSlug: s.skillSlug,
    skillName: s.skillName,
    currentLevel: s.currentLevel,
    targetLevel: s.targetLevel,
    targetReached: hasReachedTarget(s),
  }));
}

export interface BaseSkillCounts {
  totalSkills: number;
  /** Has any XP but hasn't yet reached target. */
  activeSkills: number;
  /** Current level >= target level. */
  masteredSkills: number;
}

/** Shape-agnostic count of base skills for header summaries. */
export function getBaseSkillCounts(
  progress: AnyRoleProgress | null | undefined,
): BaseSkillCounts {
  if (!progress) return { totalSkills: 0, activeSkills: 0, masteredSkills: 0 };
  if (isGroupRoleProgress(progress)) {
    const stacked = groupProgressBySkill(progress);
    const required = stacked.filter((s) => s.anyRequired);
    const mastered = required.filter((s) => hasReachedTarget(s)).length;
    const active = required.filter(
      (s) => !hasReachedTarget(s) && s.totalCurrentXp > 0,
    ).length;
    return {
      totalSkills: required.length,
      activeSkills: active,
      masteredSkills: mastered,
    };
  }
  const units = getRoleUnits(progress).filter((u) => u.required);
  const mastered = units.filter((u) => u.currentXp >= u.xpMax && u.xpMax > 0).length;
  const active = units.filter((u) => u.currentXp > 0 && u.currentXp < u.xpMax).length;
  return {
    totalSkills: units.length,
    activeSkills: active,
    masteredSkills: mastered,
  };
}
