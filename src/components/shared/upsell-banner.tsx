"use client";

import { Sparkles } from "lucide-react";

type Variant = "hero" | "inline";

interface UpsellBannerProps {
  headline: string;
  subhead: string;
  ctaLabel?: string;
  variant?: Variant;
  onUpgrade: () => void;
}

export function UpsellBanner({
  headline,
  subhead,
  ctaLabel = "Upgrade to Coursera Plus",
  variant = "inline",
  onUpgrade,
}: UpsellBannerProps) {
  if (variant === "hero") {
    return (
      <div
        className="relative overflow-hidden rounded-2xl border border-[#dae1ed] px-8 py-7 shadow-[0_2px_8px_rgba(15,17,20,0.05)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(53,135,252,0.08) 0%, rgba(164,154,255,0.08) 100%)",
        }}
      >
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <Sparkles className="h-6 w-6 text-[#0056d2]" strokeWidth={1.75} />
            </div>
            <div>
              <div className="inline-flex items-center rounded-full bg-[#0f1114] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Coursera Plus
              </div>
              <h3 className="mt-2 text-xl font-bold leading-7 text-[#0f1114]">
                {headline}
              </h3>
              <p className="mt-1 max-w-[560px] text-sm text-[#4d5765]">
                {subhead}
              </p>
            </div>
          </div>
          <button
            onClick={onUpgrade}
            className="flex h-11 shrink-0 items-center justify-center rounded-lg bg-[#0056d2] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    );
  }

  // Inline variant — used inside My Learning tabs
  return (
    <div className="rounded-xl border border-[#dae1ed] bg-white p-5 shadow-[0_1px_2px_rgba(15,17,20,0.04)]">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8f0fe]">
          <Sparkles className="h-5 w-5 text-[#0056d2]" strokeWidth={1.75} />
        </div>
        <div className="flex-1">
          <div className="inline-flex items-center rounded-full bg-[#0f1114] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Coursera Plus
          </div>
          <h4 className="mt-1.5 text-base font-semibold leading-6 text-[#0f1114]">
            {headline}
          </h4>
          <p className="mt-1 text-sm text-[#4d5765]">{subhead}</p>
          <button
            onClick={onUpgrade}
            className="mt-3 inline-flex h-10 items-center justify-center rounded-lg bg-[#0056d2] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
