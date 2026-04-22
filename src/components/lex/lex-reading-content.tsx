"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Clock, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";
import type { LexItem } from "@/lib/lex-types";

interface LexReadingContentProps {
  item: LexItem;
  onComplete: () => void;
  onNext?: () => void;
}

export function LexReadingContent({ item, onComplete, onNext }: LexReadingContentProps) {
  // `skillTags` is populated by `computeItemSkillTags` in lex-data.ts — for DA
  // every item resolves to a {Level} {Skill} mastery label, either from its
  // expression-XP mapping or the course's target groups. Fallback kept just
  // in case a legacy-shaped item reaches this component without tags.
  const skillSubtitle = item.skillTags[0] ?? "";

  // Local "marked complete" state — gates the Completed indicator + Next-item CTA.
  // Resets on item change so the next reading starts fresh.
  const [marked, setMarked] = useState(false);
  useEffect(() => {
    setMarked(false);
  }, [item.id]);

  const handleMarkComplete = () => {
    if (marked) return;
    setMarked(true);
    onComplete();
  };

  const handleGoNext = () => {
    if (onNext) onNext();
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-[820px] px-8 pb-32 pt-8">
        {/* Title + meta */}
        <div>
          <h1 className="text-2xl font-bold leading-8 tracking-tight text-[#0f1114]">
            {item.title}
          </h1>
          {/* XP + skill tag — only shown when the item awards skill XP. Items
              without a mapped mastery group don't contribute to progress, so
              displaying "N XP" would be misleading. */}
          {skillSubtitle && (
            <p className="mt-1 text-sm text-[#5b6780]">
              <span className="font-semibold text-[#946100]">{item.xpValue} XP</span>
              <span className="mx-1.5">·</span>
              {skillSubtitle}
            </p>
          )}
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#5b6780]">
            <Clock size={14} strokeWidth={1.75} />
            {item.durationMinutes} min read
          </p>
        </div>

        {/* Body */}
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#1f1f1f]">
          <p>
            Effective data reporting starts with clean, well-formatted data. When your
            data is properly structured, it becomes easier to analyze, visualize, and
            communicate insights to stakeholders.
          </p>
          <p>
            Key principles for formatting data include using consistent date formats,
            removing duplicates, handling null values appropriately, and ensuring column
            headers are clear and descriptive.
          </p>
          <p>
            Tools like spreadsheets and databases offer built-in formatting options, but
            understanding the underlying principles helps you make better decisions about
            how to organize your data.
          </p>
        </div>

        {/* Key Takeaways — light grey box with bullet list */}
        <div className="mt-6 rounded-xl bg-[#F8FAFC] p-5">
          <h2 className="text-base font-semibold text-[#0f1114]">Key Takeaways</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[#0f1114]">
            <li className="flex gap-2.5">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f1114]" />
              <span>Use consistent formatting across your dataset to avoid errors in analysis</span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f1114]" />
              <span>Clean null values before analysis — either remove them or replace with appropriate defaults</span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f1114]" />
              <span>Document your formatting decisions so others can understand your process</span>
            </li>
          </ul>
        </div>

        {/* Action row — Mark as complete (initial) OR Go to next item + Completed (after) */}
        <div className="mt-6 flex items-center gap-3">
          {!marked ? (
            <button
              onClick={handleMarkComplete}
              className="inline-flex items-center justify-center rounded-lg bg-[#0056d2] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
            >
              Mark as complete
            </button>
          ) : (
            <>
              <button
                onClick={handleGoNext}
                className="inline-flex items-center justify-center rounded-lg bg-[#0056d2] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
              >
                Go to next item
              </button>
              <span className="inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold text-[#137333]">
                <Check size={16} strokeWidth={2.5} />
                Completed
              </span>
            </>
          )}
        </div>

        {/* Feedback row */}
        <div className="mt-3 flex items-center gap-5 text-xs text-[#5b6780]">
          <button className="inline-flex items-center gap-1.5 hover:text-[#0f1114]">
            <ThumbsUp size={14} strokeWidth={1.75} />
            Like
          </button>
          <button className="inline-flex items-center gap-1.5 hover:text-[#0f1114]">
            <ThumbsDown size={14} strokeWidth={1.75} />
            Dislike
          </button>
          <button className="inline-flex items-center gap-1.5 hover:text-[#0f1114]">
            <AlertCircle size={14} strokeWidth={1.75} />
            Report an issue
          </button>
        </div>
      </div>

      {/* Sticky bottom-right CTA — only appears after the reading is marked complete */}
      {marked && (
        <div className="pointer-events-none sticky bottom-0 z-10 border-t border-[#dae1ed] bg-white px-8 py-3">
          <div className="pointer-events-auto flex justify-end">
            <button
              onClick={handleGoNext}
              className="inline-flex items-center gap-2 rounded-lg border border-[#0056d2] bg-white px-5 py-2.5 text-sm font-semibold text-[#0056d2] transition-colors hover:bg-[#f0f6ff]"
            >
              Go to next item
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
