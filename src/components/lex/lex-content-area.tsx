"use client";

import type { LexItem } from "@/lib/lex-types";
import { LexVideoContent } from "./lex-video-content";
import { LexReadingContent } from "./lex-reading-content";
import { LexAssignmentContent } from "./lex-assignment-content";

interface LexContentAreaProps {
  item: LexItem | null;
  onComplete: () => void;
}

export function LexContentArea({ item, onComplete }: LexContentAreaProps) {
  if (!item) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#fafbfc]">
        <p className="text-sm text-[#5b6780]">Select an item from the syllabus to begin.</p>
      </div>
    );
  }

  switch (item.type) {
    case "video":
      return <LexVideoContent item={item} onComplete={onComplete} />;
    case "reading":
      return <LexReadingContent item={item} onComplete={onComplete} />;
    case "practice":
    case "graded":
      return <LexAssignmentContent item={item} onComplete={onComplete} />;
  }
}
