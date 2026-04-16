"use client";

import type { LexItem } from "@/lib/lex-types";

interface LexReadingContentProps {
  item: LexItem;
  onComplete: () => void;
}

export function LexReadingContent({ item, onComplete }: LexReadingContentProps) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.skillTags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#f0f6ff] px-2.5 py-0.5 text-xs text-[#0056d2]">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-[#0f1114]">{item.title}</h1>
          <p className="mt-1 text-sm text-[#5b6780]">{item.durationMinutes} min read · +{item.xpValue} XP</p>
        </div>

        {/* Content */}
        <div className="space-y-4 text-[15px] leading-relaxed text-[#1f1f1f]">
          <p>
            This reading explores the foundational concepts behind {item.skillTags[0] ?? "this topic"},
            helping you build a solid understanding that you can apply in real-world scenarios.
          </p>
          <p>
            Effective practitioners combine theoretical knowledge with hands-on experience.
            As you read through this material, consider how each concept connects to your
            broader learning goals and the skills you&apos;re developing.
          </p>

          <h2 className="!mt-8 text-lg font-semibold text-[#0f1114]">Key Concepts</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Understanding the fundamental principles and how they relate to practice</li>
            <li>Identifying common patterns and when to apply specific techniques</li>
            <li>Recognizing the relationship between theory and real-world application</li>
            <li>Building a framework for continued learning and skill development</li>
          </ul>

          <h2 className="!mt-8 text-lg font-semibold text-[#0f1114]">Key Takeaways</h2>
          <div className="rounded-xl border border-[#e3e8ef] bg-[#fafbfc] p-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0056d2] text-[10px] text-white">✓</span>
                <span>Master the core principles before moving to advanced applications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0056d2] text-[10px] text-white">✓</span>
                <span>Practice consistently to develop fluency with key techniques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0056d2] text-[10px] text-white">✓</span>
                <span>Connect new knowledge to your existing skill framework</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Complete button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onComplete}
            className="rounded-lg bg-[#0056d2] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0048b0]"
          >
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
}
