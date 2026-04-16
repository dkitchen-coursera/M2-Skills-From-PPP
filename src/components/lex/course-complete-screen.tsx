"use client";

import type { LearningPlan, PlanCourse } from "@/lib/plan-types";
import type { RoleProgress } from "@/lib/skills-store";
import { computeOverallMastery } from "@/lib/skills-store";

interface CourseCompleteScreenProps {
  completedCourse: PlanCourse;
  plan: LearningPlan | null;
  roleProgress: RoleProgress | null;
  onStartCourse: (course: PlanCourse) => void;
  onBackToPlan: () => void;
}

// ── Certificate Card ──────────────────────────────────────────────────────

function CertificateCard({ course }: { course: PlanCourse }) {
  const partnerName = course.partners[0] ?? "Coursera";
  const partnerLogo = course.partnerLogos[0];

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div
        className="relative overflow-hidden rounded-lg border border-[#d4d8dd] bg-white p-6 shadow-md"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 40%, #f0f2f5 100%)",
        }}
      >
        {/* Subtle metallic border effect */}
        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />

        {/* Partner logo + course info */}
        <div className="flex items-start justify-between">
          <div>
            {partnerLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={partnerLogo}
                alt={partnerName}
                className="mb-2 h-6 w-auto object-contain"
              />
            ) : (
              <p className="mb-2 text-sm font-semibold text-[#5b6780]">{partnerName}</p>
            )}
            <h3 className="text-base font-bold text-[#0f1114]">{course.name}</h3>
            {course.productDifficultyLevel && (
              <p className="mt-0.5 text-xs text-[#5b6780]">
                {course.productDifficultyLevel === "BEGINNER"
                  ? "Early Professional"
                  : course.productDifficultyLevel === "INTERMEDIATE"
                    ? "Professional"
                    : "Advanced Professional"}
              </p>
            )}
          </div>
        </div>

        {/* Learner name */}
        <div className="mt-4 border-t border-[#e3e8ef] pt-3">
          <p className="text-[10px] uppercase tracking-wider text-[#9ca3af]">Awarded to</p>
          <p className="text-sm font-medium text-[#0f1114]">Learner</p>
        </div>

        {/* Coursera logo bottom right */}
        <div className="mt-3 flex justify-end">
          <svg width="80" height="12" viewBox="0 0 80 12" fill="none" className="text-[#0056d2]">
            <text x="0" y="10" fontSize="10" fontWeight="600" fill="currentColor" fontFamily="system-ui">
              coursera
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Plan Progress Timeline ────────────────────────────────────────────────

function PlanTimeline({
  plan,
  completedCourseId,
  onStartCourse,
}: {
  plan: LearningPlan;
  completedCourseId: string;
  onStartCourse: (course: PlanCourse) => void;
}) {
  // Flatten all courses from milestones, preserving milestone labels
  const allCourses: { course: PlanCourse; milestoneLabel: string; courseIndex: number }[] = [];
  for (const milestone of plan.milestones) {
    for (let i = 0; i < milestone.courses.length; i++) {
      allCourses.push({
        course: milestone.courses[i],
        milestoneLabel: `Course ${allCourses.length + 1}`,
        courseIndex: allCourses.length,
      });
    }
  }

  // Find the completed course and determine "up next"
  const completedIdx = allCourses.findIndex((c) => c.course.id === completedCourseId);
  const upNextIdx = completedIdx >= 0 ? completedIdx + 1 : -1;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 pb-2" style={{ minWidth: "max-content" }}>
        {allCourses.map(({ course, milestoneLabel, courseIndex }) => {
          const isCompleted = courseIndex <= completedIdx;
          const isUpNext = courseIndex === upNextIdx;

          return (
            <div
              key={course.id}
              className={`relative flex w-[160px] shrink-0 flex-col rounded-xl border p-3 ${
                isUpNext
                  ? "border-[#0056d2] bg-[#f0f6ff]"
                  : isCompleted
                    ? "border-[#c4eed0] bg-[#f0faf3]"
                    : "border-[#e3e8ef] bg-white"
              }`}
            >
              {/* Top label */}
              <div className="mb-2 flex items-center gap-1.5">
                {isCompleted && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#137333]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    isUpNext
                      ? "text-[#0056d2]"
                      : isCompleted
                        ? "text-[#137333]"
                        : "text-[#9ca3af]"
                  }`}
                >
                  {isUpNext ? "Up next" : milestoneLabel}
                </span>
              </div>

              {/* Course name */}
              <p
                className={`line-clamp-3 flex-1 text-xs font-medium leading-snug ${
                  isCompleted ? "text-[#5b6780]" : "text-[#0f1114]"
                }`}
              >
                {course.name}
              </p>

              {/* Start button for up-next */}
              {isUpNext && (
                <button
                  onClick={() => onStartCourse(course)}
                  className="mt-2 w-full rounded-lg border border-[#0056d2] bg-white px-3 py-1.5 text-xs font-semibold text-[#0056d2] transition-colors hover:bg-[#f0f6ff]"
                >
                  Start
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export function CourseCompleteScreen({
  completedCourse,
  plan,
  roleProgress,
  onStartCourse,
  onBackToPlan,
}: CourseCompleteScreenProps) {
  const overallPercent = roleProgress ? computeOverallMastery(roleProgress) : 0;

  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-10">
        {/* Certificate card */}
        <CertificateCard course={completedCourse} />

        {/* Congratulations text */}
        <h1 className="mt-8 text-center text-3xl font-bold text-[#0f1114]">
          Congratulations!
        </h1>
        <p className="mt-2 text-center text-sm text-[#5b6780]">
          You&apos;ve completed{" "}
          <span className="font-semibold text-[#0f1114]">{completedCourse.name}</span>{" "}
          and your certificate is ready to share.
        </p>

        {/* Share on LinkedIn */}
        <button className="mt-5 rounded-full bg-[#0f1114] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2d3139]">
          Share on LinkedIn
        </button>

        {/* Plan mastery progress */}
        {roleProgress && (
          <p className="mt-4 text-center text-sm text-[#0056d2]">
            You&apos;re {overallPercent}% of the way to completing your skill mastery plan!
          </p>
        )}

        {/* Plan progress timeline */}
        {plan && (
          <div className="mt-8 w-full border-t border-[#e3e8ef] pt-6">
            <p className="mb-4 text-sm text-[#5b6780]">
              Continue making progress on{" "}
              <span className="font-medium text-[#0f1114]">{plan.title}</span>
            </p>
            <PlanTimeline
              plan={plan}
              completedCourseId={completedCourse.id}
              onStartCourse={onStartCourse}
            />
          </div>
        )}

        {/* Back to plan */}
        <button
          onClick={onBackToPlan}
          className="mt-8 text-sm font-medium text-[#0056d2] transition-colors hover:underline"
        >
          Back to My Learning
        </button>
      </div>
    </div>
  );
}
