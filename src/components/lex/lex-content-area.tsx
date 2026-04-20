"use client";

import type { LexItem } from "@/lib/lex-types";
import type { RoleProgress } from "@/lib/skills-store";
import { LexVideoContent } from "./lex-video-content";
import { LexReadingContent } from "./lex-reading-content";
import { LexAssignmentContent } from "./lex-assignment-content";

interface LexContentAreaProps {
  item: LexItem | null;
  nextItem?: LexItem | null;
  targetSkillIds: string[];
  roleProgress: RoleProgress | null;
  onComplete: () => void;
  onNext?: () => void;
}

export function LexContentArea({
  item,
  nextItem,
  targetSkillIds,
  roleProgress,
  onComplete,
  onNext,
}: LexContentAreaProps) {
  if (!item) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#fafbfc]">
        <p className="text-sm text-[#5b6780]">Select an item from the syllabus to begin.</p>
      </div>
    );
  }

  switch (item.type) {
    case "video":
      return (
        <LexVideoContent
          item={item}
          nextItem={nextItem}
          onComplete={onComplete}
          onNext={onNext}
        />
      );
    case "reading":
      return <LexReadingContent item={item} onComplete={onComplete} onNext={onNext} />;
    case "practice":
    case "graded":
      return (
        <LexAssignmentContent
          item={item}
          targetSkillIds={targetSkillIds}
          roleProgress={roleProgress}
          onComplete={onComplete}
          onNext={onNext}
        />
      );
  }
}
