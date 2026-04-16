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
  itemsCompleted: number;
  onRegisterTriggerModuleComplete?: (trigger: () => void) => void;
}

export function LexPage({ course, roleProgress, onXpEarned, onExit, itemsCompleted, onRegisterTriggerModuleComplete }: LexPageProps) {
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

    if (activeItem.type === "video") {
      const nextItem = findNextItem(activeItem.id);
      setModalState({ type: "video-end", item: activeItem, nextItem });
    } else if (isLastItemInModule(activeItem.id)) {
      const module = findModuleForItem(activeItem.id);
      if (module) {
        setModalState({ type: "module-complete", module });
      } else {
        advanceToNext(activeItem.id);
      }
    } else {
      advanceToNext(activeItem.id);
    }
  }, [activeItem, completedItemIds, syllabus.targetSkillIds, onXpEarned, findNextItem, isLastItemInModule, findModuleForItem]);

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
    if (activeItem) {
      advanceToNext(activeItem.id);
    }
  }, [activeItem]);

  const totalItemsCompleted = itemsCompleted + completedItemIds.size;

  return (
    <div className="flex h-screen flex-col bg-white">
      <LexHeader
        completedCount={totalItemsCompleted}
        dailyGoalTarget={DEFAULT_DAILY_GOALS[0].target}
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

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <LexSidebar
          syllabus={syllabus}
          activeItemId={activeItemId}
          completedItemIds={completedItemIds}
          sessionXp={sessionXp}
          onSelectItem={setActiveItemId}
          onOpenSkillProgress={() => setModalState({ type: "skill-progress" })}
        />
        <LexContentArea item={activeItem} onComplete={handleItemComplete} />
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
