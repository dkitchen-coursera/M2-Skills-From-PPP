"use client";

import { CourseraLogo } from "@/components/shared/coursera-logo";
import { SparkleOpenIcon } from "@/components/shared/sparkle-icon";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9h17M3.5 15h17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface LihpHeaderProps {
  /** Which nav item is active */
  activePage?: "home" | "my-learning";
  /** Navigate to a page */
  onNavigate?: (page: "home" | "my-learning") => void;
}

export function LihpHeader({ activePage = "home", onNavigate }: LihpHeaderProps) {
  return (
    <header className="w-full border-b border-[#dae1ed] bg-white px-8 py-[10px]">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Nav + Search — centered within max-width */}
        <div className="flex flex-1 items-center gap-6">
          <button onClick={() => onNavigate?.("home")} className="shrink-0 cursor-pointer">
            <CourseraLogo className="h-5" />
          </button>

          <nav className="flex shrink-0 items-center gap-4 text-sm text-[#5b6780]">
            <button className="flex items-center gap-0.5 hover:text-[#0056d2]">
              Explore
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4.5 6L8 9.5 11.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => onNavigate?.("my-learning")}
              className={activePage === "my-learning" ? "font-semibold text-[#0056d2]" : "cursor-pointer hover:text-[#0056d2]"}
            >
              My Learning
            </button>
          </nav>

          <div className="relative flex w-[625px] items-center rounded-full border border-[#dae1ed] bg-white py-1 pl-4 pr-1">
            <span className="flex-1 text-sm text-[#5b6780]">I want to learn...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0056d2] text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 11.5L14.5 14.5M7 13a6 6 0 100-12 6 6 0 000 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Sparkle, Globe, Bell, Avatar — always far right */}
        <div className="flex shrink-0 items-center gap-2">
          <SparkleOpenIcon className="h-6 w-6 shrink-0" />
          <button className="flex h-8 w-8 items-center justify-center text-[#5b6780] hover:text-[#0f1114]">
            <GlobeIcon className="h-5 w-5" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center text-[#5b6780] hover:text-[#0f1114]">
            <BellIcon className="h-5 w-5" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0056d2] text-xs font-semibold text-white">
            L
          </div>
        </div>
      </div>
    </header>
  );
}
