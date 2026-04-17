"use client";

import { Check, Sparkles } from "lucide-react";
import { CourseraLogo } from "@/components/shared/coursera-logo";

interface UpgradeConfirmationProps {
  inferredRoleTitle: string | null;
  onConfirm: () => void;
}

const BENEFITS = [
  "Personalized learning plan tailored to your goal",
  "Unlimited access to 10,000+ courses",
  "Hands-on projects, certificates, and skill tracking",
  "Edit and refine your plan any time",
];

export function UpgradeConfirmation({
  inferredRoleTitle,
  onConfirm,
}: UpgradeConfirmationProps) {
  const ctaSubcopy = inferredRoleTitle
    ? `We'll start building your plan for becoming a ${inferredRoleTitle}.`
    : "Let's build your personalized learning plan.";

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f7fa]">
      <header className="flex h-16 w-full items-center border-b border-[#dae1ed] bg-white px-6">
        <CourseraLogo className="h-5" />
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[560px] rounded-2xl border border-[#dae1ed] bg-white p-10 text-center shadow-[0_2px_8px_rgba(15,17,20,0.06)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0fe]">
            <Sparkles className="h-6 w-6 text-[#0056d2]" strokeWidth={1.75} />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e8f0fe] px-3 py-1">
            <span className="text-xs font-semibold text-[#0056d2]">
              Welcome to Coursera Plus
            </span>
          </div>

          <h1 className="mt-5 text-[28px] font-bold leading-[34px] tracking-tight text-[#0f1114]">
            You&rsquo;re all set
          </h1>
          <p className="mt-2 text-base text-[#4d5765]">{ctaSubcopy}</p>

          <ul className="mt-7 space-y-3 text-left">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f5ee]">
                  <Check className="h-3.5 w-3.5 text-[#0a7d44]" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-[#0f1114]">{b}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onConfirm}
            className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-[#0056d2] text-base font-semibold text-white transition-colors hover:bg-[#003e9c]"
          >
            Set up my personalized plan
          </button>

          <p className="mt-3 text-xs text-[#9ca6b6]">
            Simulated checkout — no payment required
          </p>
        </div>
      </main>
    </div>
  );
}
