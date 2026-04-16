"use client";

import type { Persona, GatheredInfo } from "@/lib/types";
import { SparkleIcon } from "@/components/shared/sparkle-icon";

interface PersonaBannerCTAProps {
  persona: Persona;
  gatheredInfo: GatheredInfo;
  onOpenChat: () => void;
  onSend: (text: string) => void;
}

const SKIPPED_PILLS = [
  "I want to start a new career",
  "I want to advance in my current role",
  "Build in-demand skills",
  "I want to advance my skills in AI",
];

function MiniSparkle() {
  return (
    <svg width="10" height="10" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path
        d="M8.68629 3.10073C8.92294 2.52111 9.74373 2.52111 9.98038 3.10074L11.2626 6.24137C11.9726 7.9802 13.3525 9.36012 15.0913 10.0701L18.2319 11.3523C18.8116 11.589 18.8116 12.4097 18.2319 12.6464L15.0913 13.9286C13.3525 14.6386 11.9726 16.0185 11.2626 17.7573L9.98038 20.898C9.74373 21.4776 8.92294 21.4776 8.68629 20.898L7.40404 17.7573C6.6941 16.0185 5.31419 14.6386 3.57535 13.9286L0.434719 12.6464C-0.144907 12.4097 -0.144906 11.589 0.434721 11.3523L3.57535 10.0701C5.31419 9.36012 6.6941 7.9802 7.40404 6.24136L8.68629 3.10073Z"
        fill="url(#mini-sparkle-g0)"
      />
      <path
        d="M16.8901 0.297812C17.0522 -0.0992702 17.6145 -0.0992708 17.7766 0.297811L18.468 1.9911C18.6301 2.38817 18.9452 2.70328 19.3423 2.8654L21.0356 3.55673C21.4326 3.71885 21.4326 4.28115 21.0356 4.44327L19.3423 5.1346C18.9452 5.29672 18.6301 5.61183 18.468 6.0089L17.7766 7.70219C17.6145 8.09927 17.0522 8.09927 16.8901 7.70219L16.1988 6.0089C16.0367 5.61183 15.7215 5.29672 15.3245 5.1346L13.6312 4.44327C13.2341 4.28115 13.2341 3.71885 13.6312 3.55673L15.3245 2.8654C15.7215 2.70328 16.0367 2.38817 16.1988 1.9911L16.8901 0.297812Z"
        fill="url(#mini-sparkle-g1)"
      />
      <defs>
        <radialGradient id="mini-sparkle-g0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.437501 2.22851) rotate(45) scale(27.0174 24.5827)">
          <stop stopColor="#6923DE" />
          <stop offset="1" stopColor="#3286FF" />
        </radialGradient>
        <radialGradient id="mini-sparkle-g1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13.1459 -0.1875) rotate(45) scale(11.5789 10.5354)">
          <stop stopColor="#6923DE" />
          <stop offset="1" stopColor="#3286FF" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.41667 12.8333C9.96049 12.8333 12.8333 9.96049 12.8333 6.41667C12.8333 2.87284 9.96049 0 6.41667 0C2.87284 0 0 2.87284 0 6.41667C0 9.96049 2.87284 12.8333 6.41667 12.8333ZM8.93801 4.21465L5.2302 7.92247L3.67708 6.3584C3.58958 6.2709 3.48567 6.22715 3.36536 6.22715C3.24505 6.22715 3.14114 6.2709 3.05364 6.3584C2.96614 6.4459 2.92057 6.54981 2.91692 6.67012C2.91328 6.79044 2.9552 6.89434 3.0427 6.98184L4.92395 8.86309C5.01145 8.95059 5.11354 8.99434 5.2302 8.99434C5.34687 8.99434 5.44895 8.95059 5.53645 8.86309L9.55052 4.83809C9.63802 4.75059 9.68177 4.64669 9.68177 4.52637C9.68177 4.40606 9.63802 4.30215 9.55052 4.21465C9.46302 4.12715 9.36093 4.0834 9.24427 4.0834C9.1276 4.0834 9.02552 4.12715 8.93801 4.21465Z" fill="#0056d2"/>
    </svg>
  );
}

const GRADIENT_TEXT_STYLE = {
  backgroundImage:
    "linear-gradient(142deg, #3587fc 9%, #4a0fab 56%, #8040ed 91%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

function SkippedBanner({ onOpenChat, onSend }: { onOpenChat: () => void; onSend: (text: string) => void }) {
  return (
    <div
      className="flex flex-col gap-[11px] rounded-2xl p-5"
      style={{ backgroundImage: "linear-gradient(102deg, #f0f6ff 3%, #f9f5ff 100%)" }}
    >
      {/* Label + Heading */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <MiniSparkle />
          <button
            onClick={onOpenChat}
            className="text-sm font-semibold leading-[18px] tracking-tight text-[#5b6780] cursor-pointer hover:underline"
          >
            Create a personalized learning plan
          </button>
        </div>
        <h2 className="text-xl font-semibold leading-6 tracking-tight text-black">
          Your plan, built around you. Answer a few quick questions to get started.
        </h2>
      </div>

      {/* Pill buttons */}
      <div className="flex flex-wrap gap-2">
        {SKIPPED_PILLS.map((pill) => (
          <button
            key={pill}
            onClick={() => onSend(pill)}
            className="flex items-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-3 py-1.5 text-sm leading-5 text-[#0f1114] hover:border-[#0056d2] hover:bg-[#f0f6ff] transition-colors cursor-pointer"
          >
            <MiniSparkle />
            {pill}
          </button>
        ))}
        <button
          onClick={onOpenChat}
          className="flex items-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-3 py-1.5 text-sm leading-5 text-[#0f1114] hover:border-[#0056d2] hover:bg-[#f0f6ff] transition-colors cursor-pointer"
        >
          <MiniSparkle />
          Something else
        </button>
      </div>
    </div>
  );
}

function OnboardedBanner({ gatheredInfo, onOpenChat }: { gatheredInfo: GatheredInfo; onOpenChat: () => void }) {
  return (
    <div
      className="flex flex-col gap-[11px] rounded-2xl p-5"
      style={{ backgroundImage: "linear-gradient(102deg, #f0f6ff 3%, #f9f5ff 100%)" }}
    >
      {/* Label + Heading */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <MiniSparkle />
          <span className="text-sm font-semibold leading-[18px] tracking-tight text-[#5b6780]">
            Create a personalized learning plan
          </span>
        </div>
        <h2 className="text-xl font-semibold leading-6 tracking-tight text-black">
          We already know a bit about you. Let&apos;s build your plan.
        </h2>
      </div>

      {/* Onboarding data pills + CTA */}
      <div className="flex flex-wrap items-center gap-2">
        {gatheredInfo.goal && (
          <span className="flex items-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-3 py-1.5 text-sm leading-5 text-[#0f1114]">
            <CheckIcon />
            {gatheredInfo.goal}
          </span>
        )}
        {gatheredInfo.skills && (
          <span className="flex items-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-3 py-1.5 text-sm leading-5 text-[#0f1114]">
            <CheckIcon />
            {gatheredInfo.skills}
          </span>
        )}
        <button
          onClick={onOpenChat}
          className="flex items-center gap-1 rounded-lg border border-[#0056d2] bg-[#0056d2] px-3 py-1.5 text-sm font-semibold leading-5 text-white hover:bg-[#004bb5] transition-colors cursor-pointer"
        >
          Complete your plan
        </button>
      </div>
    </div>
  );
}

function InProgressBanner({ gatheredInfo, onOpenChat }: { gatheredInfo: GatheredInfo; onOpenChat: () => void }) {
  return (
    <div
      className="flex flex-col gap-[11px] rounded-2xl p-5"
      style={{ backgroundImage: "linear-gradient(102deg, #f0f6ff 3%, #f9f5ff 100%)" }}
    >
      {/* Label + Heading */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <MiniSparkle />
          <span className="text-sm font-semibold leading-[18px] tracking-tight text-[#5b6780]">
            Create a personalized learning plan
          </span>
        </div>
        <h2 className="text-xl font-semibold leading-6 tracking-tight text-black">
          Based on your activity, let&apos;s build a plan to reach your goals faster.
        </h2>
      </div>

      {/* Onboarding data pills + CTA */}
      <div className="flex flex-wrap items-center gap-2">
        {gatheredInfo.goal && (
          <span className="flex items-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-3 py-1.5 text-sm leading-5 text-[#0f1114]">
            <CheckIcon />
            {gatheredInfo.goal}
          </span>
        )}
        {gatheredInfo.skills && (
          <span className="flex items-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-3 py-1.5 text-sm leading-5 text-[#0f1114]">
            <CheckIcon />
            {gatheredInfo.skills}
          </span>
        )}
        <button
          onClick={onOpenChat}
          className="flex items-center gap-1 rounded-lg border border-[#0056d2] bg-[#0056d2] px-3 py-1.5 text-sm font-semibold leading-5 text-white hover:bg-[#004bb5] transition-colors cursor-pointer"
        >
          Complete your plan
        </button>
      </div>
    </div>
  );
}

const IN_PROGRESS_SKIPPED_PILLS = [
  "I want to become a Data Analyst",
  "I want to advance in my current role",
  "Build in-demand skills",
  "I want to advance my skills in AI",
];

function InProgressSkippedBanner({ onOpenChat, onSend }: { onOpenChat: () => void; onSend: (text: string) => void }) {
  return (
    <div
      className="flex flex-col gap-[11px] rounded-2xl p-5"
      style={{ backgroundImage: "linear-gradient(102deg, #f0f6ff 3%, #f9f5ff 100%)" }}
    >
      {/* Label + Heading */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <MiniSparkle />
          <button
            onClick={onOpenChat}
            className="text-sm font-semibold leading-[18px] tracking-tight text-[#5b6780] cursor-pointer hover:underline"
          >
            Create a personalized learning plan
          </button>
        </div>
        <h2 className="text-xl font-semibold leading-6 tracking-tight text-black">
          Your plan, built around you. Answer a few quick questions to get started.
        </h2>
      </div>

      {/* Pill buttons */}
      <div className="flex flex-wrap gap-2">
        {IN_PROGRESS_SKIPPED_PILLS.map((pill) => (
          <button
            key={pill}
            onClick={() => onSend(pill)}
            className="flex items-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-3 py-1.5 text-sm leading-5 text-[#0f1114] hover:border-[#0056d2] hover:bg-[#f0f6ff] transition-colors cursor-pointer"
          >
            <MiniSparkle />
            {pill}
          </button>
        ))}
        <button
          onClick={onOpenChat}
          className="flex items-center gap-1 rounded-lg border border-[#dae1ed] bg-white px-3 py-1.5 text-sm leading-5 text-[#0f1114] hover:border-[#0056d2] hover:bg-[#f0f6ff] transition-colors cursor-pointer"
        >
          <MiniSparkle />
          Something else
        </button>
      </div>
    </div>
  );
}

export function PersonaBannerCTA({ persona, gatheredInfo, onOpenChat, onSend }: PersonaBannerCTAProps) {
  if (persona === "onboarded") {
    return <OnboardedBanner gatheredInfo={gatheredInfo} onOpenChat={onOpenChat} />;
  }
  if (persona === "in-progress") {
    return <InProgressBanner gatheredInfo={gatheredInfo} onOpenChat={onOpenChat} />;
  }
  if (persona === "in-progress-skipped") {
    return <InProgressSkippedBanner onOpenChat={onOpenChat} onSend={onSend} />;
  }
  return <SkippedBanner onOpenChat={onOpenChat} onSend={onSend} />;
}
