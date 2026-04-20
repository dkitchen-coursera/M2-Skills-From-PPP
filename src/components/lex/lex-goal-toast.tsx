"use client";

import { useEffect, useState } from "react";

interface LexGoalToastProps {
  /** Heading line (e.g. "High five!") */
  heading: string;
  /** Body line (e.g. "You've completed a daily goal by finishing 5 learning items.") */
  body: string;
  /** A new value here re-triggers the slide-in. Pass a goal id or counter. */
  triggerKey: string | number | null;
  /** How long the toast stays visible (ms). Default 4000. */
  durationMs?: number;
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16.875L7.9 19.325c-.367.2-.712.163-1.037-.112-.325-.275-.475-.613-.45-1.013l.65-4.575-3.625-3.075c-.3-.267-.4-.567-.3-.9.1-.333.3-.567.6-.7l4.75-.425L10.363 4.25c.167-.367.4-.55.7-.55s.533.183.7.55l1.875 4.45 4.75.4c.3.033.5.267.6.7.1.333 0 .633-.3.9l-3.625 3.075.65 4.575c.025.4-.125.738-.45 1.013-.325.275-.67.312-1.037.112L12 16.875z"
        fill="#6923de"
      />
    </svg>
  );
}

/**
 * Daily-goal completion toast — slides down from just below the header,
 * stays for a few seconds, then slides back up. Mirrors the M1 prototype's
 * "High five!" pattern for celebratory moments.
 */
export function LexGoalToast({
  heading,
  body,
  triggerKey,
  durationMs = 4000,
}: LexGoalToastProps) {
  // visible: card mounted in DOM; entered: animation class applied (slid down)
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (triggerKey === null) return;

    setVisible(true);
    // Next frame: kick off the slide-down animation
    const enterRaf = requestAnimationFrame(() => setEntered(true));

    // Start the slide-up animation just before unmount
    const exitTimer = setTimeout(() => setEntered(false), durationMs);
    // Fully unmount after the animation finishes
    const unmountTimer = setTimeout(() => setVisible(false), durationMs + 350);

    return () => {
      cancelAnimationFrame(enterRaf);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [triggerKey, durationMs]);

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed left-0 right-0 top-[56px] z-40 flex justify-center px-6"
    >
      <div
        className={
          "pointer-events-auto flex w-full max-w-[640px] items-center gap-3 rounded-2xl border-2 border-[#6923de] bg-white px-5 py-4 shadow-lg transition-all duration-300 ease-out " +
          (entered ? "translate-y-3 opacity-100" : "-translate-y-2 opacity-0")
        }
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1e8ff]">
          <StarIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold leading-5 text-[#6923de]">{heading}</p>
          <p className="mt-0.5 text-sm leading-5 text-[#6923de]">{body}</p>
        </div>
      </div>
    </div>
  );
}
