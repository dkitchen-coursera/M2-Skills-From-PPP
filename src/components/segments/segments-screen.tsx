"use client";

import Link from "next/link";
import {
  Compass,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CourseraLogo } from "@/components/shared/coursera-logo";
import { SparkleOpenIcon } from "@/components/shared/sparkle-icon";

type Segment = {
  id: string;
  persona: string;
  title: string;
  tagline: string;
  simulates: string;
  bullets: string[];
  cta: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  isCoursePlus: boolean;
};

const SEGMENTS: Segment[] = [
  {
    id: "new-non-cplus",
    persona: "new-non-cplus",
    title: "New, non-Coursera Plus",
    tagline: "First-time learner without a C+ subscription.",
    simulates:
      "A new learner without C+ (no subscription, or a standalone-course / specialization buyer) browsing the catalog and seeing C+ as a personalization upsell.",
    bullets: [
      "Lands on browse-first homepage",
      "Sees center upsell banner promoting personalized plan",
      "Clicking upgrade triggers simulated checkout flow",
      "After upgrade, enters conversational onboarding",
    ],
    cta: "Enter as new non-C+ learner",
    icon: <Compass className="h-5 w-5" strokeWidth={1.75} />,
    iconBg: "bg-[#fff4e5]",
    iconColor: "text-[#b85c00]",
    isCoursePlus: false,
  },
  {
    id: "new-cplus",
    persona: "new-cplus",
    title: "New, Coursera Plus",
    tagline: "First-time C+ subscriber starting fresh.",
    simulates:
      "A new C+ user landing directly into the personalized-plan onboarding chat as the primary value prop.",
    bullets: [
      "Lands on conversational entry screen",
      "Sets career goal through chat",
      "Generates personalized learning plan",
      "Lands on My Learning with full plan editing",
    ],
    cta: "Enter as new C+ learner",
    icon: <Sparkles className="h-5 w-5" strokeWidth={1.75} />,
    iconBg: "bg-[#e8f0fe]",
    iconColor: "text-[#0056d2]",
    isCoursePlus: true,
  },
  {
    id: "returning-non-cplus",
    persona: "returning-non-cplus",
    title: "Returning, non-Coursera Plus",
    tagline: "Existing non-C+ learner with course progress.",
    simulates:
      "A returning learner without C+ (e.g., a standalone-course or specialization customer) mid-course who is being introduced to C+ as the path to a personalized plan toward an inferred role goal.",
    bullets: [
      "Lands on My Learning",
      "Inferred role goal at top — confirm or edit inline",
      "My Plan tab: resume current course + skills snapshot + upsell",
      "Skills tab: progress focused on inferred role + bottom upsell",
      "Upgrade triggers simulated checkout, then plan setup chat",
    ],
    cta: "Enter as returning non-C+ learner",
    icon: <TrendingUp className="h-5 w-5" strokeWidth={1.75} />,
    iconBg: "bg-[#fff4e5]",
    iconColor: "text-[#b85c00]",
    isCoursePlus: false,
  },
  {
    id: "returning-cplus",
    persona: "returning-cplus",
    title: "Returning, Coursera Plus",
    tagline: "Existing C+ subscriber with prior ad-hoc learning.",
    simulates:
      "A returning C+ user with prior progress who is being introduced to the personalized-plan feature for the first time.",
    bullets: [
      "Lands on My Learning",
      "Inferred role goal at top — confirm or edit inline",
      "My Plan tab: prompt to set up personalized plan",
      "Skills tab: progress focused on inferred role's skills",
      "CTA opens chat with goal pre-filled — pick role-wide or skills-focused plan",
    ],
    cta: "Enter as returning C+ learner",
    icon: <GraduationCap className="h-5 w-5" strokeWidth={1.75} />,
    iconBg: "bg-[#e6f5ee]",
    iconColor: "text-[#0a7d44]",
    isCoursePlus: true,
  },
];

interface SegmentsScreenProps {
  preservedQuery: string;
}

export function SegmentsScreen({ preservedQuery }: SegmentsScreenProps) {
  const buildHref = (persona: string) => {
    const params = new URLSearchParams(preservedQuery);
    params.set("persona", persona);
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f7fa]">
      <header className="flex h-16 w-full items-center justify-between border-b border-[#dae1ed] bg-white px-6">
        <CourseraLogo className="h-5" />
        <SparkleOpenIcon className="h-5 w-5 text-[#0056d2]" />
      </header>

      <main className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="flex w-full max-w-[1180px] flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f0fe] px-3 py-1.5">
            <span className="text-xs font-medium text-[#0056d2]">
              Prototype mode
            </span>
          </div>

          <h1 className="mt-6 text-center text-[32px] font-bold leading-[40px] tracking-tight text-[#0f1114]">
            PPP — Personalized Pathways
          </h1>
          <p className="mt-3 max-w-[640px] text-center text-base text-[#4d5765]">
            Select a learner segment to preview how the personalized-plan
            experience differs across audiences and Coursera Plus tiers.
          </p>

          <div className="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {SEGMENTS.map((segment) => (
              <div
                key={segment.id}
                className="flex flex-col rounded-xl border border-[#dae1ed] bg-white p-6 shadow-[0_1px_2px_rgba(15,17,20,0.04)]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg ${segment.iconBg} ${segment.iconColor}`}
                  >
                    {segment.icon}
                  </div>
                  {segment.isCoursePlus ? (
                    <span className="inline-flex items-center rounded-full bg-[#0f1114] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      Coursera Plus
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-[#f0f2f5] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#4d5765]">
                      Non-C+
                    </span>
                  )}
                </div>

                <h2 className="mt-5 text-lg font-semibold leading-6 text-[#0f1114]">
                  {segment.title}
                </h2>
                <p className="mt-1.5 text-sm text-[#4d5765]">
                  {segment.tagline}
                </p>

                <div className="mt-4 rounded-lg bg-[#f7f9fc] px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#4d5765]">
                    Simulates
                  </p>
                  <p className="mt-1 text-xs leading-[18px] text-[#0f1114]">
                    {segment.simulates}
                  </p>
                </div>

                <ul className="mt-4 flex-1 space-y-2">
                  {segment.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-xs leading-[18px] text-[#4d5765]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#9ca6b6]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={buildHref(segment.persona)}
                  className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-[#0056d2] text-sm font-semibold text-white transition-colors hover:bg-[#003e9c]"
                >
                  {segment.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-12 text-xs text-[#9ca6b6]">
            PPP Prototype — for internal review only
          </p>
        </div>
      </main>
    </div>
  );
}
