"use client";

import { useState, useEffect } from "react";
import type { LexItem } from "@/lib/lex-types";

interface LexVideoEndModalProps {
  item: LexItem;
  nextItem: LexItem | null;
  onContinue: () => void;
}

export function LexVideoEndModal({ item, nextItem, onContinue }: LexVideoEndModalProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      onContinue();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, onContinue]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f6ff]">
            <span className="text-2xl">🎬</span>
          </div>
          <h3 className="text-lg font-semibold text-[#0f1114]">Video Complete!</h3>

          {/* Skill tags */}
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {item.skillTags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#f0f6ff] px-2.5 py-0.5 text-xs text-[#0056d2]">
                {tag}
              </span>
            ))}
          </div>

          {/* XP earned */}
          <div className="mt-4 rounded-lg bg-[#fafbfc] px-4 py-3">
            <p className="text-2xl font-bold text-[#0f1114]">+{item.xpValue} XP</p>
            <p className="text-xs text-[#5b6780]">earned from this video</p>
          </div>

          {/* Next item preview */}
          {nextItem && (
            <div className="mt-4 rounded-lg border border-[#e3e8ef] px-4 py-3 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#5b6780]">Up Next</p>
              <p className="mt-0.5 text-sm font-medium text-[#0f1114]">{nextItem.title}</p>
            </div>
          )}

          {/* Continue button with countdown */}
          <button
            onClick={onContinue}
            className="mt-4 w-full rounded-lg bg-[#0056d2] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0048b0]"
          >
            Continue {countdown > 0 ? `(${countdown})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
