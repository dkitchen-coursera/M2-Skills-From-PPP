"use client";

import type { RoleProgress } from "@/lib/skills-store";
import { computeOverallMastery } from "@/lib/skills-store";
import { LihpHeader } from "@/components/lihp/lihp-header";
import { SparkleIcon } from "@/components/shared/sparkle-icon";

// ── Types ──────────────────────────────────────────────────────────────────

interface HomepageProps {
  /** Learner's display name */
  learnerName?: string;
  /** Role the learner is working toward */
  roleTitle?: string;
  /** Demand label for the role */
  demandLabel?: string;
  /** Skill progress (if role identified) */
  roleProgress?: RoleProgress | null;
  /** Open the AI chat to start/continue onboarding */
  onStartChat: (message?: string) => void;
  /** Navigate to My Learning */
  onNavigateMyLearning: () => void;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function DemandChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e3e8ef] bg-white px-3 py-1 text-xs font-medium text-[#1f1f1f]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0056d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
      {label}
    </span>
  );
}

function RecommendCard({
  provider,
  title,
  skills,
  rating,
  isTopRec = false,
}: {
  provider: string;
  title: string;
  skills: string;
  rating: string;
  isTopRec?: boolean;
}) {
  return (
    <div className="group rounded-2xl border border-[#e3e8ef] bg-white transition-shadow hover:shadow-md">
      <div className="h-[120px] rounded-t-2xl bg-gradient-to-br from-[#f0f6ff] to-[#e8f0fe]" />
      <div className="p-4">
        {isTopRec && (
          <span className="mb-2 inline-block rounded-full bg-[#f0f6ff] px-2 py-0.5 text-xs font-medium text-[#0056d2]">
            Top recommendation
          </span>
        )}
        <p className="text-xs text-[#5b6780]">{provider}</p>
        <h3 className="mt-1 text-sm font-semibold text-[#1f1f1f] line-clamp-2">{title}</h3>
        <p className="mt-1 text-xs text-[#5b6780]">{skills}</p>
        <p className="mt-1 text-xs text-[#5b6780]">{rating}</p>
      </div>
    </div>
  );
}

function TrendingColumn({ title, items }: { title: string; items: { name: string; meta: string }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-[#1f1f1f]">{title}</h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-[#e3e8ef] bg-white px-4 py-3 text-sm hover:bg-[#fafbfc] transition-colors cursor-pointer">
            <span className="font-medium text-[#1f1f1f]">{item.name}</span>
            <span className="text-[#5b6780]"> - {item.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <button className="rounded-full border border-[#dae1ed] bg-white px-4 py-2 text-sm text-[#1f1f1f] hover:border-[#0056d2] hover:text-[#0056d2] transition-colors">
      {label}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function Homepage({
  learnerName = "there",
  roleTitle,
  demandLabel,
  roleProgress,
  onStartChat,
  onNavigateMyLearning,
}: HomepageProps) {
  const hasRole = !!roleTitle;
  const overallPercent = roleProgress ? computeOverallMastery(roleProgress) : 0;

  return (
    <div className="flex h-screen flex-col bg-white">
      <LihpHeader activePage="home" onNavigate={(page) => {
        if (page === "my-learning") onNavigateMyLearning();
      }} />

      <main className="flex-1 overflow-y-auto">
        {/* Hero Banner */}
        <div className="w-full bg-[#f5f7fa] border-b border-[#e3e8ef]">
          <div className="mx-auto max-w-[1200px] px-8 py-8">
            {hasRole ? (
              <>
                <p className="text-base text-[#5b6780]">
                  Hi {learnerName}, here&apos;s your progress in
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-[#1f1f1f]">{roleTitle}</h1>
                  {demandLabel && <DemandChip label={demandLabel} />}
                </div>
              </>
            ) : (
              <>
                <p className="text-base text-[#5b6780]">
                  Welcome, {learnerName}!
                </p>
                <h1 className="mt-1 text-2xl font-bold text-[#1f1f1f]">
                  Find courses to build in-demand skills
                </h1>
              </>
            )}

            {/* Hero content grid: course card + sidebar */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Main card — either resume learning or start chat */}
              <div className="lg:col-span-2 rounded-2xl border border-[#e3e8ef] bg-white p-6">
                {hasRole && roleProgress ? (
                  <div className="flex items-center gap-6">
                    {/* Progress ring */}
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                      <svg width="64" height="64" viewBox="0 0 36 36" className="-rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e3e8ef" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15.9"
                          fill="none"
                          stroke="#0056d2"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={`${overallPercent} 100`}
                        />
                      </svg>
                      <span className="absolute text-sm font-bold text-[#1f1f1f]">{overallPercent}%</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#1f1f1f]">{roleTitle} Mastery</h2>
                      <p className="text-sm text-[#5b6780]">
                        {Object.values(roleProgress.skills).filter(s => s.currentXp > 0).length} of{" "}
                        {Object.values(roleProgress.skills).length} skills in progress
                      </p>
                    </div>
                    <button
                      onClick={onNavigateMyLearning}
                      className="shrink-0 rounded-lg bg-[#0056d2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0048b0] transition-colors"
                    >
                      View my plan
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <SparkleIcon className="h-8 w-8 shrink-0" />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#1f1f1f]">
                        Get a personalized learning plan
                      </h2>
                      <p className="text-sm text-[#5b6780]">
                        Tell us your career goals and we&apos;ll create a skill-focused plan just for you.
                      </p>
                    </div>
                    <button
                      onClick={() => onStartChat()}
                      className="shrink-0 rounded-lg bg-[#0056d2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0048b0] transition-colors"
                    >
                      Start planning
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar widgets */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#e3e8ef] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#1f1f1f]">Today&apos;s goals</h3>
                    <span className="rounded-full bg-[#ede9fe] px-2 py-0.5 text-xs font-medium text-[#7c3aed]">
                      Personalized
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {["Complete any 8 learning items", "Complete 1 practice item", "Use Coach"].map((goal, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#5b6780]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" rx="12" fill="#f2f5fa" />
                          <path d="M12 16.875L7.9 19.325c-.367.2-.712.163-1.037-.112-.325-.275-.475-.613-.45-1.013l.65-4.575-3.625-3.075c-.3-.267-.4-.567-.3-.9.1-.333.3-.567.6-.7l4.75-.425L10.363 4.25c.167-.367.4-.55.7-.55.3 0 .533.183.7.55L13.638 8.7l4.75.4c.3.033.5.267.6.7.1.333 0 .633-.3.9l-3.625 3.075.65 4.575c.025.4-.125.738-.45 1.013-.325.275-.67.312-1.037.112L12 16.875z" fill="#c1cad9" />
                        </svg>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#e3e8ef] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#1f1f1f]">Weekly activity</h3>
                    <span className="rounded-full bg-[#ede9fe] px-2 py-0.5 text-xs font-medium text-[#7c3aed]">
                      1 week streak
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#5b6780]">Way to go! Keep your streak going.</p>
                  <div className="mt-2 flex gap-1.5">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div
                        key={i}
                        className={
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium " +
                          (i < 4
                            ? "bg-[#0056d2] text-white"
                            : i === 4
                              ? "border-2 border-[#0056d2] text-[#0056d2]"
                              : "bg-[#f2f5fa] text-[#5b6780]")
                        }
                      >
                        {i < 4 ? "\u2713" : day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="mx-auto max-w-[1200px] px-8 py-8 space-y-10">
          {/* Recommendations */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1f1f1f]">
                {hasRole ? `Master skills as a ${roleTitle}` : "Recommended for you"}
              </h2>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <RecommendCard
                provider="Google"
                title="Google Data Analytics Professional Certificate"
                skills="Skills: Data Analysis, SQL, Spreadsheets"
                rating="\u2605 4.8 (147K reviews)"
                isTopRec
              />
              <RecommendCard
                provider="IBM"
                title="Data Science Professional Certificate"
                skills="Skills: Python, Machine Learning, SQL"
                rating="\u2605 4.6 (72K reviews)"
              />
              <RecommendCard
                provider="Meta"
                title="Marketing Analytics Professional Certificate"
                skills="Skills: Marketing, Data Analysis"
                rating="\u2605 4.7 (23K reviews)"
              />
              <RecommendCard
                provider="University of Michigan"
                title="Python for Everybody Specialization"
                skills="Skills: Python, JSON, SQL"
                rating="\u2605 4.8 (230K reviews)"
              />
            </div>
          </section>

          {/* Trending */}
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Trending now</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
              <TrendingColumn
                title="Most popular"
                items={[
                  { name: "Google AI Essentials", meta: "Google - Course - \u2605 4.9" },
                  { name: "Agentic AI and AI Agents", meta: "Microsoft - Course - \u2605 4.9" },
                  { name: "Prompt Engineering for ChatGPT", meta: "Vanderbilt - Course - \u2605 4.8" },
                ]}
              />
              <TrendingColumn
                title="Weekly spotlight"
                items={[
                  { name: "Successful Negotiation", meta: "U of Michigan - Course - \u2605 4.9" },
                  { name: "IBM Data Engineering", meta: "IBM - Prof. Certificate - \u2605 4.6" },
                  { name: "UX Design Fundamentals", meta: "Google - Course - \u2605 4.8" },
                ]}
              />
              <TrendingColumn
                title="Earn a degree"
                items={[
                  { name: "MS in Data Science", meta: "U of Illinois - Degree" },
                  { name: "MBA", meta: "U of Illinois - Degree" },
                  { name: "MS in Computer Science", meta: "Arizona State - Degree" },
                ]}
              />
            </div>
          </section>

          {/* In-demand skills */}
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">In-demand skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Natural Language", "Prompt Engineering", "Python", "Generative AI", "Computer Vision", "SQL", "Responsible AI", "Data Visualization", "Machine Learning"].map((skill) => (
                <SkillChip key={skill} label={skill} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
