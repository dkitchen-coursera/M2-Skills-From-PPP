"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import clsx from "clsx";
import type { LexSyllabus, LexModule, LexItem, LexItemType } from "@/lib/lex-types";

/**
 * Returns the M1-style descriptor for an item type. Combines with the duration
 * for the lecture-meta line, e.g. "Video · 6 min" or "Graded Assignment".
 */
function itemMeta(type: LexItemType, durationMinutes: number): string {
  switch (type) {
    case "video":
      return `Video · ${durationMinutes} min`;
    case "reading":
      return `Reading · ${durationMinutes} min`;
    case "practice":
      return durationMinutes >= 60
        ? `Practice Assignment · ${Math.round(durationMinutes / 60)}h`
        : `Practice Assignment · ${durationMinutes} min`;
    case "graded":
      return "Graded Assignment";
  }
}

/**
 * Lecture-status icon — filled green check for completed, hollow grey circle for pending.
 * Sized at 20px to match M1.
 */
function LectureStatusIcon({ completed }: { completed: boolean }) {
  if (completed) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#137333" />
        <path d="M5.5 10.5l3 3 6-6" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9.25" fill="white" stroke="#C1CAD9" strokeWidth="1.5" />
    </svg>
  );
}

function XpCoinIcon({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/assets/xp-coin.svg" alt="" className={className} aria-hidden="true" />;
}

function ItemRow({
  item,
  isActive,
  isCompleted,
  onClick,
}: {
  item: LexItem;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors",
        isActive ? "bg-[#E8F0FE]" : "hover:bg-[#E8F0FE]",
      )}
    >
      <span className="shrink-0">
        <LectureStatusIcon completed={isCompleted} />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={clsx(
            "block text-sm leading-5",
            isActive ? "font-semibold text-[#0f1114]" : "font-normal text-[#0f1114]",
          )}
        >
          {item.title}
        </span>
        <span className="mt-0.5 block text-xs leading-[18px] text-[#5b6780]">
          {itemMeta(item.type, item.durationMinutes)}
        </span>
      </span>
    </button>
  );
}

function ModuleSection({
  module,
  activeItemId,
  completedItemIds,
  onSelectItem,
  defaultExpanded,
}: {
  module: LexModule;
  activeItemId: string | null;
  completedItemIds: Set<string>;
  onSelectItem: (itemId: string) => void;
  defaultExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between gap-2 rounded-lg px-1 py-3 text-left hover:bg-[#E8F0FE]"
      >
        <span className="flex min-w-0 flex-1 flex-col gap-0">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#5b6780]">
            Module {module.title.replace(/^Module\s*/, "")}
          </span>
          <span className="text-base font-semibold leading-6 text-[#0f1114]">
            {module.subtitle}
          </span>
        </span>
        <ChevronDown
          size={20}
          strokeWidth={2}
          className={clsx(
            "mt-1 shrink-0 text-[#5b6780] transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>
      {expanded && (
        <div className="pb-2">
          {module.lessonGroups.map((group, gIdx) => (
            <div key={group.id}>
              <p
                className={clsx(
                  "px-1 pb-1 pt-2 text-xs font-semibold leading-[18px] text-[#5b6780]",
                  gIdx === 0 && "pt-1",
                )}
              >
                {group.title}
              </p>
              {group.items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  isActive={item.id === activeItemId}
                  isCompleted={completedItemIds.has(item.id)}
                  onClick={() => onSelectItem(item.id)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface LexSidebarProps {
  syllabus: LexSyllabus;
  activeItemId: string | null;
  completedItemIds: Set<string>;
  sessionXp: number;
  onSelectItem: (itemId: string) => void;
  onOpenSkillProgress: () => void;
  onClose?: () => void;
}

export function LexSidebar({
  syllabus,
  activeItemId,
  completedItemIds,
  sessionXp,
  onSelectItem,
  onOpenSkillProgress,
  onClose,
}: LexSidebarProps) {
  const activeModuleId = activeItemId
    ? syllabus.modules.find((m) =>
        m.lessonGroups.some((g) => g.items.some((item) => item.id === activeItemId)),
      )?.id
    : syllabus.modules[0]?.id;

  return (
    <aside className="flex h-full w-[320px] shrink-0 flex-col rounded-2xl bg-white">
      {/* Sidebar header — course title + close button */}
      <div className="flex min-h-[52px] shrink-0 items-center justify-between gap-2 px-4 pb-4 pt-4">
        <h2 className="min-w-0 flex-1 text-[20px] font-semibold leading-6 tracking-tight text-[#0f172a]">
          {syllabus.courseTitle}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#5b6780] transition-colors hover:bg-[#e3e8ef] hover:text-[#0f1114]"
          >
            <X size={18} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Skill points tracker — between header and module list */}
      <div className="flex shrink-0 flex-col gap-1 border-b border-t border-[#dae1ed] bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-[#0f1114]">
            Today&rsquo;s Skill Points
          </span>
          <button
            onClick={onOpenSkillProgress}
            className="inline-flex items-center gap-1.5 text-[#946100] hover:text-[#7a5000]"
            aria-label="View Skill Points details"
          >
            <XpCoinIcon className="h-5 w-5" />
            <span className="text-sm font-semibold">{sessionXp} XP</span>
          </button>
        </div>
        <button
          onClick={onOpenSkillProgress}
          className="self-start text-xs leading-[18px] text-[#0f1114] underline underline-offset-2 hover:text-[#5b6780]"
        >
          See skill progress
        </button>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto px-4">
        {syllabus.modules.map((module) => (
          <ModuleSection
            key={module.id}
            module={module}
            activeItemId={activeItemId}
            completedItemIds={completedItemIds}
            onSelectItem={onSelectItem}
            defaultExpanded={module.id === activeModuleId}
          />
        ))}
      </div>
    </aside>
  );
}
