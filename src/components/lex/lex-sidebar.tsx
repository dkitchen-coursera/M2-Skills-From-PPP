"use client";

import { useState } from "react";
import { ChevronDown, Play, BookOpen, FileText, CheckCircle2, Circle } from "lucide-react";
import clsx from "clsx";
import type { LexSyllabus, LexModule, LexItem, LexItemType } from "@/lib/lex-types";

function typeIcon(type: LexItemType, size: number = 14) {
  switch (type) {
    case "video":
      return <Play size={size} />;
    case "reading":
      return <BookOpen size={size} />;
    case "practice":
      return <FileText size={size} />;
    case "graded":
      return <FileText size={size} />;
  }
}

function typeLabel(type: LexItemType): string {
  switch (type) {
    case "video": return "Video";
    case "reading": return "Reading";
    case "practice": return "Practice";
    case "graded": return "Graded Assignment";
  }
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
        "flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left transition-colors",
        isActive && "bg-[#f0f6ff]",
        !isActive && "hover:bg-[#fafbfc]",
      )}
    >
      <div className="mt-0.5 shrink-0">
        {isCompleted ? (
          <CheckCircle2 size={16} className="text-[#137333]" />
        ) : (
          <Circle size={16} className={isActive ? "text-[#0056d2]" : "text-[#c1cad9]"} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className={clsx(
          "text-sm leading-tight",
          isCompleted && "text-[#5b6780]",
          isActive && !isCompleted && "font-medium text-[#0056d2]",
          !isActive && !isCompleted && "text-[#0f1114]",
        )}>
          {item.title}
        </p>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-[#5b6780]">
          {typeIcon(item.type, 12)}
          <span>{typeLabel(item.type)}</span>
          <span>·</span>
          <span>{item.durationMinutes} min</span>
        </div>
      </div>
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
  const allItems = module.lessonGroups.flatMap((g) => g.items);
  const completedCount = allItems.filter((item) => completedItemIds.has(item.id)).length;

  return (
    <div className="border-b border-[#e3e8ef] last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-[#fafbfc]"
      >
        <ChevronDown
          size={16}
          className={clsx("shrink-0 text-[#5b6780] transition-transform duration-200", expanded && "rotate-180")}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#0f1114]">{module.title}</p>
          {module.subtitle && (
            <p className="text-xs text-[#5b6780]">{module.subtitle}</p>
          )}
        </div>
        <span className="shrink-0 text-xs text-[#5b6780]">
          {completedCount}/{allItems.length}
        </span>
      </button>
      {expanded && (
        <div className="px-2 pb-2">
          {module.lessonGroups.map((group) => (
            <div key={group.id} className="mb-1">
              <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#5b6780]">
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
}

export function LexSidebar({
  syllabus,
  activeItemId,
  completedItemIds,
  sessionXp,
  onSelectItem,
  onOpenSkillProgress,
}: LexSidebarProps) {
  const activeModuleId = activeItemId
    ? syllabus.modules.find((m) =>
        m.lessonGroups.some((g) => g.items.some((item) => item.id === activeItemId)),
      )?.id
    : syllabus.modules[0]?.id;

  return (
    <aside className="flex h-full w-[320px] shrink-0 flex-col border-r border-[#dae1ed] bg-white">
      {/* Course title + XP */}
      <div className="border-b border-[#e3e8ef] px-4 py-4">
        <h2 className="text-base font-semibold text-[#0f1114]">{syllabus.courseTitle}</h2>
        <p className="mt-0.5 text-xs text-[#5b6780]">{syllabus.partner}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🪙</span>
            <span className="text-sm font-semibold text-[#0f1114]">{sessionXp} XP</span>
            <span className="text-xs text-[#5b6780]">earned today</span>
          </div>
          <button
            onClick={onOpenSkillProgress}
            className="text-xs font-medium text-[#0056d2] hover:underline"
          >
            See skill progress
          </button>
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto">
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
