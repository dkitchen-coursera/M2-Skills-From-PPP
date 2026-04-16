"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import type { LexItem } from "@/lib/lex-types";

interface LexVideoContentProps {
  item: LexItem;
  onComplete: () => void;
}

export function LexVideoContent({ item, onComplete }: LexVideoContentProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    completedRef.current = false;
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [item.id]);

  useEffect(() => {
    if (playing && progress < 100) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 2;
          if (next >= 100) {
            clearInterval(intervalRef.current!);
            setPlaying(false);
            if (!completedRef.current) {
              completedRef.current = true;
              setTimeout(onComplete, 300);
            }
            return 100;
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, progress, onComplete]);

  return (
    <div className="flex flex-1 flex-col">
      {/* Mock video player */}
      <div className="relative flex aspect-video w-full items-center justify-center bg-[#1a1a2e]">
        {!playing && progress === 0 && (
          <button
            onClick={() => setPlaying(true)}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-transform hover:scale-110"
          >
            <Play size={36} fill="white" />
          </button>
        )}
        {playing && (
          <button
            onClick={() => setPlaying(false)}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur"
          >
            <Pause size={36} fill="white" />
          </button>
        )}
        {progress === 100 && !playing && (
          <div className="text-center text-white">
            <p className="text-lg font-semibold">Video Complete</p>
            <p className="text-sm opacity-80">+{item.xpValue} XP</p>
          </div>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-[#0056d2] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time display */}
        <div className="absolute bottom-3 right-4 text-xs text-white/70">
          {Math.floor((progress / 100) * item.durationMinutes)}:{String(Math.floor((progress / 100) * 60) % 60).padStart(2, "0")} / {item.durationMinutes}:00
        </div>
      </div>

      {/* Info below */}
      <div className="border-t border-[#e3e8ef] px-8 py-6">
        <h2 className="text-xl font-semibold text-[#0f1114]">{item.title}</h2>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-sm text-[#5b6780]">{item.durationMinutes} min</span>
          <span className="text-sm text-[#5b6780]">·</span>
          <span className="text-sm font-medium text-[#0056d2]">+{item.xpValue} XP</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.skillTags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#f0f6ff] px-2.5 py-0.5 text-xs text-[#0056d2]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
