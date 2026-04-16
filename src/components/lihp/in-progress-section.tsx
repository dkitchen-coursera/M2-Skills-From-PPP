"use client";

import Image from "next/image";

function CheckBadge() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 11.5l2 2 4-4" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InProgressSection() {
  return (
    <div style={{ backgroundColor: "#e3eeff" }}>
      <div className="mx-auto flex max-w-[1345px] flex-col gap-6 px-12 py-8">
        {/* Top bar: course + progress */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold leading-7 tracking-tight text-[#0f1114]">
            Foundations: Data, Data Everywhere
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-2 w-[246px] overflow-hidden rounded-full border border-[#dae1ed] bg-[#f2f5fa]">
              <div className="h-full w-[30%] rounded-full bg-[#087051]" />
            </div>
            <span className="text-sm text-[#5b6780]">30% complete</span>
          </div>
        </div>

        {/* Main content: course preview + sidebar */}
        <div className="flex gap-3">
          {/* Left: course card with video preview */}
          <div className="flex flex-1 overflow-hidden rounded-2xl bg-white">
            {/* Course info */}
            <div className="flex w-[475px] shrink-0 flex-col gap-4 p-8 pb-6">
              <div className="flex flex-col gap-1">
                <p className="text-xl font-semibold leading-6 tracking-tight text-[#0f1114]">
                  Up next: Discovering Data Skill Sets
                </p>
                <p className="text-xs text-[#5b6780]">Video &middot; 5 min</p>
              </div>

              {/* Learning preview card */}
              <div className="flex flex-col gap-2 rounded-2xl border border-[#dae1ed] p-4">
                <div className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M8.68629 3.10073C8.92294 2.52111 9.74373 2.52111 9.98038 3.10074L11.2626 6.24137C11.9726 7.9802 13.3525 9.36012 15.0913 10.0701L18.2319 11.3523C18.8116 11.589 18.8116 12.4097 18.2319 12.6464L15.0913 13.9286C13.3525 14.6386 11.9726 16.0185 11.2626 17.7573L9.98038 20.898C9.74373 21.4776 8.92294 21.4776 8.68629 20.898L7.40404 17.7573C6.6941 16.0185 5.31419 14.6386 3.57535 13.9286L0.434719 12.6464C-0.144907 12.4097 -0.144906 11.589 0.434721 11.3523L3.57535 10.0701C5.31419 9.36012 6.6941 7.9802 7.40404 6.24136L8.68629 3.10073Z" fill="url(#sp-g0)"/>
                    <defs><radialGradient id="sp-g0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.4 2.2) rotate(45) scale(27 24.6)"><stop stopColor="#6923DE"/><stop offset="1" stopColor="#3286FF"/></radialGradient></defs>
                  </svg>
                  <span className="text-sm font-semibold tracking-tight text-[#0f1114]">By continuing, you will learn:</span>
                </div>
                <p className="text-sm leading-5 text-[#5b6780]">
                  How you can implore an implementation of impossibly interconnected intersections. Not what you expected?{" "}
                  <span className="font-semibold tracking-tight text-[#0056d2]">Help me find a better fit.</span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button className="rounded-lg bg-[#0056d2] px-5 py-2 text-sm font-semibold text-white hover:bg-[#004bb5] transition-colors cursor-pointer">
                  Resume
                </button>
                <span className="text-xs text-[#5b6780]">How&apos;s the course so far?</span>
                <div className="flex gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 17v-5H3a1 1 0 01-1-1V8a6 6 0 016-6h2a6 6 0 016 6v3a1 1 0 01-1 1h-3v5a1 1 0 01-1 1H7a1 1 0 01-1-1z" stroke="#5b6780" strokeWidth="1.2"/></svg>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="rotate-180"><path d="M6 17v-5H3a1 1 0 01-1-1V8a6 6 0 016-6h2a6 6 0 016 6v3a1 1 0 01-1 1h-3v5a1 1 0 01-1 1H7a1 1 0 01-1-1z" stroke="#5b6780" strokeWidth="1.2"/></svg>
                </div>
              </div>
            </div>

            {/* Video thumbnail */}
            <div className="relative flex-1">
              <Image
                src="/assets/google-project-management.jpg"
                alt="Course video preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1114] via-transparent to-transparent" />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex w-[324px] shrink-0 flex-col gap-4">
            {/* Today's goals */}
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-4">
              <p className="text-sm font-semibold tracking-tight text-[#0f1114]">Today&apos;s goals</p>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f9f5ff]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="#f5c451"><path d="M6 0l1.76 3.57L12 4.14 8.88 7.1l.74 4.3L6 9.27 2.38 11.4l.74-4.3L0 4.14l4.24-.57L6 0z"/></svg>
                  </div>
                  <span className="text-sm text-[#5b6780]">Gain 12XP for completing learning items</span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f2f5fa]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="#5b6780"><path d="M6 0l1.76 3.57L12 4.14 8.88 7.1l.74 4.3L6 9.27 2.38 11.4l.74-4.3L0 4.14l4.24-.57L6 0z"/></svg>
                  </div>
                  <span className="text-sm text-[#5b6780]">Unlock daily goal stats on <span className="underline">My Learning</span></span>
                </div>
              </div>
            </div>

            {/* Weekly streak */}
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-4">
              <p className="text-sm font-semibold tracking-tight text-[#0f1114]">1 week streak</p>
              <div className="flex gap-2">
                {[
                  { day: "Mo", done: false },
                  { day: "Tu", done: false },
                  { day: "", done: true },
                  { day: "", done: true },
                  { day: "", done: true },
                  { day: "Sa", done: false, bold: true },
                  { day: "Su", done: false },
                ].map((d, i) => (
                  <div
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm ${
                      d.done
                        ? "border-[#c29ffc] bg-[#f1e8ff]"
                        : "border-[#dae1ed]"
                    } ${d.bold ? "font-semibold text-[#0f1114]" : "text-[#5b6780]"}`}
                  >
                    {d.done ? <CheckBadge /> : d.day}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#5b6780]">3 items completed &middot; 10 minutes learned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
