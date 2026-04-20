"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Sparkles, BookOpen, FileText, ArrowRight } from "lucide-react";
import clsx from "clsx";
import type { LexItem, LexItemType } from "@/lib/lex-types";

interface LexVideoContentProps {
  item: LexItem;
  nextItem?: LexItem | null;
  onComplete: () => void;
  onNext?: () => void;
}

type Tab = "transcript" | "notes" | "downloads";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "transcript", label: "Transcript" },
  { id: "notes", label: "Notes" },
  { id: "downloads", label: "Downloads" },
];

const COACH_PROMPTS = [
  "Give me a summary",
  "Give me real-life examples",
  "Explain this topic in simple terms",
];

const MOCK_TRANSCRIPT: Array<{ time: string; text: string }> = [
  {
    time: "0:10",
    text: "So, Go language is object-oriented, but let's say, weakly object-oriented. So, what I mean by that is that it implements objects but maybe they have fewer features than you would see in another object-oriented language.",
  },
  {
    time: "0:30",
    text: "Data visualization is the practice of translating information into a visual context — using charts, graphs, and maps — so the human brain can more easily spot patterns and trends.",
  },
  {
    time: "1:05",
    text: "A well-designed visualization can communicate insights in seconds that might take paragraphs of text to explain. The same dataset can tell very different stories depending on how it's presented.",
  },
  {
    time: "1:42",
    text: "We'll cover three core principles in this lesson: choosing the right chart type for your data, using color and contrast intentionally, and designing for accessibility from the start.",
  },
  {
    time: "2:18",
    text: "By the end of the course, you'll be able to look at a dataset and confidently pick a visualization that highlights the most important story in the data.",
  },
];

function nextItemMeta(type: LexItemType): { label: string; Icon: typeof Play } {
  switch (type) {
    case "video":
      return { label: "Video", Icon: Play };
    case "reading":
      return { label: "Reading", Icon: BookOpen };
    case "practice":
      return { label: "Practice Assignment", Icon: FileText };
    case "graded":
      return { label: "Graded Assignment", Icon: FileText };
  }
}

export function LexVideoContent({ item, nextItem, onComplete, onNext }: LexVideoContentProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("transcript");
  // Inline video-end overlay state — replaces the previous full-screen modal
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setShowEndOverlay(false);
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
              onComplete();
              setShowEndOverlay(true);
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

  const totalSeconds = item.durationMinutes * 60;
  const elapsed = Math.floor((progress / 100) * totalSeconds);
  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const skillSubtitle = item.skillTags[0] ?? "Visualizing and Reporting Clean Data";

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-y-auto">
      {/* Mock video player */}
      <div className="relative flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden bg-[#1a1a2e]">
        {!playing && progress === 0 && (
          <button
            onClick={() => setPlaying(true)}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-transform hover:scale-110"
            aria-label="Play"
          >
            <Play size={36} fill="white" />
          </button>
        )}
        {playing && (
          <button
            onClick={() => setPlaying(false)}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur"
            aria-label="Pause"
          >
            <Pause size={36} fill="white" />
          </button>
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
          {formatTime(elapsed)} / {formatTime(totalSeconds)}
        </div>

        {/* Inline video-end overlay — shown within the player frame, not full-screen */}
        {showEndOverlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-6">
            <div className="w-full max-w-[420px] rounded-2xl bg-white p-5 shadow-xl">
              <h3 className="text-lg font-semibold leading-6 text-[#0f1114]">
                Keep up the good work!
              </h3>
              <div className="mt-4 flex items-center gap-3">
                {onNext ? (
                  <button
                    onClick={() => {
                      setShowEndOverlay(false);
                      onNext();
                    }}
                    className="flex-1 rounded-lg bg-[#0056d2] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
                  >
                    Next item
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 cursor-not-allowed rounded-lg bg-[#c1cad9] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Next item
                  </button>
                )}
                <button
                  onClick={() => setShowEndOverlay(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#0056d2] transition-colors hover:bg-[#f0f6ff]"
                >
                  Pause
                </button>
              </div>
              {nextItem && (() => {
                const meta = nextItemMeta(nextItem.type);
                return (
                  <div className="mt-4 border-t border-[#dae1ed] pt-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#5b6780]">
                      <meta.Icon size={14} strokeWidth={1.75} />
                      <span>{meta.label}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-[#0f1114]">
                      {nextItem.title}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Title + meta + Save note */}
      <div className="flex items-start justify-between gap-4 px-8 pt-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-8 tracking-tight text-[#0f1114]">
            {item.title}
          </h2>
          <p className="mt-1 text-sm text-[#5b6780]">
            <span className="font-semibold text-[#946100]">{item.xpValue} XP</span>
            <span className="mx-1.5">·</span>
            {skillSubtitle}
          </p>
        </div>
        <button className="shrink-0 text-sm font-semibold text-[#0056d2] hover:underline">
          + Save note
        </button>
      </div>

      {/* Coach box */}
      <div className="mx-6 mt-5 rounded-2xl bg-[#F8FAFC] p-5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold leading-6 text-[#2F3746]">Coach</h3>
          <span className="rounded bg-[#E2E8F0] px-1.5 py-0.5 text-[11px] font-medium text-[#6B7280]">
            Beta
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {COACH_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#0056D2] bg-white px-4 py-2 text-sm font-semibold text-[#0056D2] transition-colors hover:bg-[#f0f6ff]"
            >
              <Sparkles size={16} className="shrink-0" strokeWidth={1.75} />
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-[#dae1ed] px-6">
        <div className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "relative pb-3 text-sm transition-colors",
                activeTab === tab.id
                  ? "font-semibold text-[#0f1114]"
                  : "text-[#5b6780] hover:text-[#0f1114]",
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#0056d2]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-8 pb-12 pt-5">
        {activeTab === "transcript" && (
          <div className="space-y-4">
            {MOCK_TRANSCRIPT.map((line) => (
              <div key={line.time} className="flex gap-4">
                <span className="w-12 shrink-0 text-sm font-medium text-[#0056d2]">
                  {line.time}
                </span>
                <p className="flex-1 text-sm leading-6 text-[#0f1114]">
                  {line.text}
                </p>
              </div>
            ))}
          </div>
        )}
        {activeTab === "notes" && (
          <div className="rounded-xl border border-dashed border-[#dae1ed] bg-[#fafbfc] p-6 text-center">
            <p className="text-sm text-[#5b6780]">
              Take notes as you watch. Your notes are private and saved automatically.
            </p>
          </div>
        )}
        {activeTab === "downloads" && (
          <div className="rounded-xl border border-dashed border-[#dae1ed] bg-[#fafbfc] p-6 text-center">
            <p className="text-sm text-[#5b6780]">
              No downloadable resources for this item.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
