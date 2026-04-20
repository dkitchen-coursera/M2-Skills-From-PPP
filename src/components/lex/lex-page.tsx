"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { PlanCourse } from "@/lib/plan-types";
import type { RoleProgress } from "@/lib/skills-store";
import type { LexItem, LexModule } from "@/lib/lex-types";
import { generateSyllabusForCourse, distributeXpToSkills, DEFAULT_DAILY_GOALS } from "@/lib/lex-data";
import { LexHeader } from "./lex-header";
import { DailyGoalPanel } from "./daily-goal-panel";
import { LexSidebar } from "./lex-sidebar";
import { LexContentArea } from "./lex-content-area";
import { SkillProgressModal } from "./skill-progress-modal";
import { LexVideoEndModal } from "./lex-video-end-modal";
import { LexModuleCompleteModal } from "./lex-module-complete-modal";
import { LexGoalToast } from "./lex-goal-toast";

type ModalState =
  | { type: "none" }
  | { type: "video-end"; item: LexItem; nextItem: LexItem | null }
  | { type: "module-complete"; module: LexModule }
  | { type: "skill-progress" };

interface LexPageProps {
  course: PlanCourse;
  roleProgress: RoleProgress | null;
  onXpEarned: (skillXpMap: Record<string, number>) => void;
  onExit: () => void;
  onCourseComplete: () => void;
  itemsCompleted: number;
  onRegisterTriggerModuleComplete?: (trigger: () => void) => void;
  onRegisterTriggerCourseComplete?: (trigger: () => void) => void;
}

export function LexPage({ course, roleProgress, onXpEarned, onExit, onCourseComplete, itemsCompleted, onRegisterTriggerModuleComplete, onRegisterTriggerCourseComplete }: LexPageProps) {
  const syllabus = useMemo(() => generateSyllabusForCourse(course), [course]);

  const allItems = useMemo(
    () => syllabus.modules.flatMap((m) => m.lessonGroups.flatMap((g) => g.items)),
    [syllabus],
  );

  const [completedItemIds, setCompletedItemIds] = useState<Set<string>>(new Set());
  const [activeItemId, setActiveItemId] = useState<string | null>(allItems[0]?.id ?? null);
  const [modalState, setModalState] = useState<ModalState>({ type: "none" });
  const [sessionXp, setSessionXp] = useState(0);
  const [dailyGoalOpen, setDailyGoalOpen] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState(0);

  const activeItem = useMemo(
    () => allItems.find((item) => item.id === activeItemId) ?? null,
    [allItems, activeItemId],
  );

  // Register proto tools trigger for module complete modal
  useEffect(() => {
    if (!onRegisterTriggerModuleComplete) return;
    onRegisterTriggerModuleComplete(() => {
      // Find the module containing the active item (or fall back to first module)
      const module = activeItemId
        ? syllabus.modules.find((m) =>
            m.lessonGroups.some((g) => g.items.some((item) => item.id === activeItemId)),
          ) ?? syllabus.modules[0]
        : syllabus.modules[0];
      if (!module) return;

      // Complete all uncompleted items in this module and award XP
      const moduleItems = module.lessonGroups.flatMap((g) => g.items);
      setCompletedItemIds((prev) => {
        const next = new Set(prev);
        let addedXp = 0;
        let addedPractice = 0;
        const aggregatedSkillXp: Record<string, number> = {};

        for (const item of moduleItems) {
          if (!next.has(item.id)) {
            next.add(item.id);
            addedXp += item.xpValue;
            if (item.type === "practice" || item.type === "graded") {
              addedPractice++;
            }
            // Distribute XP to skills
            const xpMap = distributeXpToSkills(item.xpValue, syllabus.targetSkillIds);
            for (const [skillId, xp] of Object.entries(xpMap)) {
              aggregatedSkillXp[skillId] = (aggregatedSkillXp[skillId] ?? 0) + xp;
            }
          }
        }

        // Batch award all XP at once
        if (Object.keys(aggregatedSkillXp).length > 0) {
          onXpEarned(aggregatedSkillXp);
        }
        if (addedXp > 0) {
          setSessionXp((prev) => prev + addedXp);
        }
        if (addedPractice > 0) {
          setPracticeCompleted((prev) => prev + addedPractice);
        }

        return next;
      });

      // Advance active item to the first item in the next module
      const moduleIdx = syllabus.modules.indexOf(module);
      const nextModule = syllabus.modules[moduleIdx + 1];
      if (nextModule) {
        const firstNextItem = nextModule.lessonGroups[0]?.items[0];
        if (firstNextItem) setActiveItemId(firstNextItem.id);
      }

      setModalState({ type: "module-complete", module });
    });
  }, [onRegisterTriggerModuleComplete, activeItemId, syllabus, onXpEarned]);

  // Register proto tools trigger for course complete
  useEffect(() => {
    if (!onRegisterTriggerCourseComplete) return;
    onRegisterTriggerCourseComplete(() => {
      // Complete ALL uncompleted items in the entire course and award XP
      setCompletedItemIds((prev) => {
        const next = new Set(prev);
        let addedXp = 0;
        let addedPractice = 0;
        const aggregatedSkillXp: Record<string, number> = {};

        for (const item of allItems) {
          if (!next.has(item.id)) {
            next.add(item.id);
            addedXp += item.xpValue;
            if (item.type === "practice" || item.type === "graded") {
              addedPractice++;
            }
            const xpMap = distributeXpToSkills(item.xpValue, syllabus.targetSkillIds);
            for (const [skillId, xp] of Object.entries(xpMap)) {
              aggregatedSkillXp[skillId] = (aggregatedSkillXp[skillId] ?? 0) + xp;
            }
          }
        }

        if (Object.keys(aggregatedSkillXp).length > 0) {
          onXpEarned(aggregatedSkillXp);
        }
        if (addedXp > 0) {
          setSessionXp((prev) => prev + addedXp);
        }
        if (addedPractice > 0) {
          setPracticeCompleted((prev) => prev + addedPractice);
        }

        return next;
      });

      // Notify app shell to show the course complete screen
      onCourseComplete();
    });
  }, [onRegisterTriggerCourseComplete, allItems, syllabus.targetSkillIds, onXpEarned, onCourseComplete]);

  const findNextItem = useCallback(
    (currentId: string): LexItem | null => {
      const idx = allItems.findIndex((item) => item.id === currentId);
      if (idx < 0 || idx >= allItems.length - 1) return null;
      return allItems[idx + 1];
    },
    [allItems],
  );

  const findModuleForItem = useCallback(
    (itemId: string): LexModule | null => {
      return syllabus.modules.find((m) =>
        m.lessonGroups.some((g) => g.items.some((item) => item.id === itemId)),
      ) ?? null;
    },
    [syllabus],
  );

  const isLastItemInModule = useCallback(
    (itemId: string): boolean => {
      const module = findModuleForItem(itemId);
      if (!module) return false;
      const moduleItems = module.lessonGroups.flatMap((g) => g.items);
      const otherIncomplete = moduleItems.filter(
        (item) => item.id !== itemId && !completedItemIds.has(item.id),
      );
      return otherIncomplete.length === 0;
    },
    [findModuleForItem, completedItemIds],
  );

  const handleItemComplete = useCallback(() => {
    if (!activeItem || completedItemIds.has(activeItem.id)) return;

    setCompletedItemIds((prev) => new Set(prev).add(activeItem.id));
    setSessionXp((prev) => prev + activeItem.xpValue);

    if (activeItem.type === "practice" || activeItem.type === "graded") {
      setPracticeCompleted((prev) => prev + 1);
    }

    const xpMap = distributeXpToSkills(activeItem.xpValue, syllabus.targetSkillIds);
    onXpEarned(xpMap);

    // Practice/graded items render their own success state with a Next button —
    // skip auto-advancement so the success view stays visible until the learner clicks Next.
    if (activeItem.type === "practice" || activeItem.type === "graded") {
      return;
    }

    // All item types now defer advancement to the user's explicit "Next item" click.
    // - video → inline "Keep up the good work!" overlay
    // - reading → "Mark as complete" → "Go to next item"
    // - practice/graded → success-state screen with Next item CTA
    // The parent only handles XP recording here; advancement happens via the
    // onNext callback wired through LexContentArea.
  }, [activeItem, completedItemIds, syllabus.targetSkillIds, onXpEarned]);

  function advanceToNext(currentId: string) {
    const next = allItems.find((item) => {
      const idx = allItems.indexOf(item);
      return idx > allItems.findIndex((i) => i.id === currentId) && !completedItemIds.has(item.id);
    });
    if (next) setActiveItemId(next.id);
  }

  const handleVideoEndContinue = useCallback(() => {
    if (modalState.type !== "video-end") return;
    const { item } = modalState;
    setModalState({ type: "none" });

    if (isLastItemInModule(item.id)) {
      const module = findModuleForItem(item.id);
      if (module) {
        setModalState({ type: "module-complete", module });
        return;
      }
    }
    advanceToNext(item.id);
  }, [modalState, isLastItemInModule, findModuleForItem]);

  const handleModuleCompleteContinue = useCallback(() => {
    setModalState({ type: "none" });

    // Check if the entire course is now complete
    const allDone = allItems.every((item) => completedItemIds.has(item.id));
    if (allDone) {
      onCourseComplete();
      return;
    }

    if (activeItem) {
      advanceToNext(activeItem.id);
    }
  }, [activeItem, allItems, completedItemIds, onCourseComplete]);

  // completedItemIds is the authoritative source — it gets +1 per single completion
  // and +N per batched proto-trigger. The parent's `itemsCompleted` (from XP-earned events)
  // would double-count for single completions and undercount for batch triggers.
  const totalItemsCompleted = completedItemIds.size;

  // ── Daily-goal completion toast ──────────────────────────────────────────
  // Track which goals are met so we can fire a celebratory toast on each transition
  // from unmet → met. Heading + body are tailored to the goal completed.
  const [toast, setToast] = useState<{ heading: string; body: string; key: number } | null>(null);
  const [metGoalIds, setMetGoalIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const goalProgress: Record<string, number> = {
      "learning-items": totalItemsCompleted,
      practice: practiceCompleted,
      coach: 0,
    };

    for (const goal of DEFAULT_DAILY_GOALS) {
      const current = goalProgress[goal.id] ?? 0;
      const isMet = current >= goal.target;
      if (isMet && !metGoalIds.has(goal.id)) {
        // Transition unmet → met: fire toast
        let heading = "High five!";
        let body = `You've completed a daily goal — ${goal.label.toLowerCase()}.`;
        if (goal.id === "learning-items") {
          heading = "High five!";
          body = `You've completed a daily goal by finishing ${goal.target} learning items.`;
        } else if (goal.id === "practice") {
          heading = "Nice work!";
          body = "You've completed a daily goal by finishing a practice item.";
        } else if (goal.id === "coach") {
          heading = "Great move!";
          body = "You've completed a daily goal by using Coach.";
        }
        setToast({ heading, body, key: Date.now() });
        setMetGoalIds((prev) => {
          const next = new Set(prev);
          next.add(goal.id);
          return next;
        });
        // Only fire one toast per render cycle so multiple simultaneous completions don't overlap
        break;
      }
    }
  }, [totalItemsCompleted, practiceCompleted, metGoalIds]);

  return (
    <div className="flex h-screen flex-col bg-[#F2F5FA]">
      <LexHeader
        completedCount={totalItemsCompleted}
        dailyGoalTarget={DEFAULT_DAILY_GOALS[0].target}
        totalGoals={DEFAULT_DAILY_GOALS.length}
        completedGoals={metGoalIds.size}
        currentGoalLabel={
          DEFAULT_DAILY_GOALS.find((g) => !metGoalIds.has(g.id))?.label ?? null
        }
        dailyGoalOpen={dailyGoalOpen}
        onToggleDailyGoal={() => setDailyGoalOpen((prev) => !prev)}
        onExit={onExit}
      />

      {/* Daily goal dropdown */}
      {dailyGoalOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setDailyGoalOpen(false)} />
          <DailyGoalPanel
            goals={DEFAULT_DAILY_GOALS}
            completedItems={totalItemsCompleted}
            completedPractice={practiceCompleted}
          />
        </>
      )}

      {/* Daily-goal completion toast */}
      <LexGoalToast
        heading={toast?.heading ?? ""}
        body={toast?.body ?? ""}
        triggerKey={toast?.key ?? null}
      />

      {/* Main layout — sidebar + content as rounded white cards on light grey bg */}
      <div className="flex flex-1 gap-4 overflow-hidden bg-[#F2F5FA] px-4 pb-4">
        <LexSidebar
          syllabus={syllabus}
          activeItemId={activeItemId}
          completedItemIds={completedItemIds}
          sessionXp={sessionXp}
          onSelectItem={setActiveItemId}
          onOpenSkillProgress={() => setModalState({ type: "skill-progress" })}
        />
        <div className="flex flex-1 overflow-hidden rounded-2xl bg-white">
          <LexContentArea
            item={activeItem}
            nextItem={activeItem ? findNextItem(activeItem.id) : null}
            targetSkillIds={syllabus.targetSkillIds}
            roleProgress={roleProgress}
            onComplete={handleItemComplete}
            onNext={() => {
              if (!activeItem) return;
              if (isLastItemInModule(activeItem.id)) {
                const module = findModuleForItem(activeItem.id);
                if (module) {
                  setModalState({ type: "module-complete", module });
                  return;
                }
              }
              advanceToNext(activeItem.id);
            }}
          />
        </div>
      </div>

      {/* Modals */}
      {modalState.type === "video-end" && (
        <LexVideoEndModal
          item={modalState.item}
          nextItem={modalState.nextItem}
          onContinue={handleVideoEndContinue}
        />
      )}
      {modalState.type === "module-complete" && (
        <LexModuleCompleteModal
          module={modalState.module}
          roleProgress={roleProgress}
          targetSkillIds={syllabus.targetSkillIds}
          onContinue={handleModuleCompleteContinue}
          onSeeProgress={() => {
            setModalState({ type: "skill-progress" });
          }}
        />
      )}
      {modalState.type === "skill-progress" && (
        <SkillProgressModal
          roleProgress={roleProgress}
          targetSkillIds={syllabus.targetSkillIds}
          onClose={() => setModalState({ type: "none" })}
        />
      )}
    </div>
  );
}
