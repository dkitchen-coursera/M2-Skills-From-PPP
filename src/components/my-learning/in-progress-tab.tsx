"use client";

import type { LearningPlan, PlanCourse } from "@/lib/plan-types";
import type { InProgressCourse } from "@/lib/mock-persona-data";

interface InProgressTabProps {
  plan: LearningPlan | null;
  completedCourseIds?: Set<string>;
  /** Courses the learner has actually entered. A course is "in progress" only if started or completed. */
  startedCourseIds?: Set<string>;
  /**
   * Standalone (non-plan) in-progress courses — used by returning-learner segments
   * to simulate prior ad-hoc learning activity that exists outside of a plan.
   */
  seededInProgressCourses?: InProgressCourse[];
  onResumeCourse?: (course: PlanCourse) => void;
}

function SeededCourseCard({ course }: { course: InProgressCourse }) {
  const progress = course.progress ?? 0;
  const isCompleted = progress >= 100;
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#e3e8ef] py-4 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {isCompleted && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#137333]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
          <h4 className={`text-sm font-medium ${isCompleted ? "text-[#5b6780]" : "text-[#0056d2]"}`}>
            {course.title}
          </h4>
        </div>
        <p className="mt-0.5 text-xs text-[#5b6780]">
          {course.productType}
          {isCompleted ? " · Completed" : ` · ${progress}% Complete`}
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e3e8ef]">
          <div
            className="h-full rounded-full bg-[#137333] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {!isCompleted && (
        <button className="shrink-0 rounded-lg bg-[#0056d2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0048b0] transition-colors">
          Resume
        </button>
      )}
    </div>
  );
}

function SeededCertificateCard({
  partner,
  partnerLogo,
  courses,
}: {
  partner: string;
  partnerLogo?: string;
  courses: InProgressCourse[];
}) {
  return (
    <div className="rounded-2xl border border-[#e3e8ef] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 pb-4">
        {partnerLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={partnerLogo} alt={partner} className="h-7 w-7 rounded" />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#f0f6ff] text-xs font-bold text-[#0056d2]">
            {partner.charAt(0)}
          </div>
        )}
        <h3 className="text-base font-semibold text-[#0f1114]">{partner}</h3>
      </div>
      <div>
        {courses.map((c) => (
          <SeededCourseCard key={c.title} course={c} />
        ))}
      </div>
    </div>
  );
}

function CourseProgressCard({
  course,
  courseIndex,
  totalCourses,
  isActive,
  isCompleted,
  onResume,
}: {
  course: PlanCourse;
  courseIndex: number;
  totalCourses: number;
  isActive: boolean;
  isCompleted: boolean;
  onResume?: () => void;
}) {
  const progress = isCompleted ? 100 : isActive ? Math.floor(Math.random() * 60) + 10 : 0;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#e3e8ef] py-4 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {isCompleted && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#137333]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
          <h4 className={`text-sm font-medium ${isCompleted ? "text-[#5b6780]" : "text-[#0056d2]"}`}>{course.name}</h4>
        </div>
        <p className="mt-0.5 text-xs text-[#5b6780]">
          Course {courseIndex} of {totalCourses}
          {isCompleted
            ? " · Completed"
            : isActive
              ? ` · ${progress}% Complete`
              : " · Not started"}
        </p>
        {!isCompleted && isActive && (
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e3e8ef]">
            <div
              className="h-full rounded-full bg-[#137333] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {isCompleted && (
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e3e8ef]">
            <div className="h-full rounded-full bg-[#137333]" style={{ width: "100%" }} />
          </div>
        )}
      </div>
      {!isCompleted && isActive && onResume && (
        <button
          onClick={onResume}
          className="shrink-0 rounded-lg bg-[#0056d2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0048b0] transition-colors"
        >
          Resume
        </button>
      )}
    </div>
  );
}

function CertificateCard({
  title,
  partner,
  partnerLogo,
  courses,
  completedCourseIds,
  onResumeCourse,
}: {
  title: string;
  partner: string;
  partnerLogo?: string;
  courses: PlanCourse[];
  completedCourseIds?: Set<string>;
  onResumeCourse?: (course: PlanCourse) => void;
}) {
  // Find the first non-completed course to mark as active
  const firstActiveIdx = courses.findIndex((c) => !completedCourseIds?.has(c.id));

  return (
    <div className="rounded-2xl border border-[#e3e8ef] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        {partnerLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={partnerLogo} alt={partner} className="h-7 w-7 rounded" />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#f0f6ff] text-xs font-bold text-[#0056d2]">
            {partner.charAt(0)}
          </div>
        )}
        <h3 className="text-base font-semibold text-[#0f1114]">{title}</h3>
      </div>

      {/* Course list */}
      <div>
        {courses.map((course, idx) => (
          <CourseProgressCard
            key={course.id}
            course={course}
            courseIndex={idx + 1}
            totalCourses={courses.length}
            isActive={idx === firstActiveIdx}
            isCompleted={completedCourseIds?.has(course.id) ?? false}
            onResume={() => onResumeCourse?.(course)}
          />
        ))}
      </div>
    </div>
  );
}

export function InProgressTab({
  plan,
  completedCourseIds,
  startedCourseIds,
  seededInProgressCourses,
  onResumeCourse,
}: InProgressTabProps) {
  // Group seeded standalone courses by partner for "certificate-style" display
  const seededGroups = (() => {
    if (!seededInProgressCourses || seededInProgressCourses.length === 0) return [];
    const map = new Map<string, { partner: string; partnerLogo?: string; courses: InProgressCourse[] }>();
    for (const c of seededInProgressCourses) {
      const existing = map.get(c.partner);
      if (existing) {
        existing.courses.push(c);
      } else {
        map.set(c.partner, { partner: c.partner, partnerLogo: c.partnerLogo, courses: [c] });
      }
    }
    return Array.from(map.values());
  })();

  if (!plan) {
    if (seededGroups.length > 0) {
      return (
        <div className="space-y-4">
          {seededGroups.map((g) => (
            <SeededCertificateCard
              key={g.partner}
              partner={g.partner}
              partnerLogo={g.partnerLogo}
              courses={g.courses}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="rounded-xl border border-dashed border-[#dae1ed] bg-[#fafbfc] px-6 py-10 text-center">
        <p className="text-sm font-medium text-[#1f1f1f]">No courses in progress</p>
        <p className="mt-1 text-xs text-[#5b6780]">
          Once you have a learning plan, your enrolled courses will appear here.
        </p>
      </div>
    );
  }

  // Group courses by first partner (as a proxy for certificate grouping).
  // Only include courses the learner has actually entered (started or completed).
  // A new learner with a plan but no started courses sees the empty state below.
  const groups: { title: string; partner: string; partnerLogo?: string; courses: PlanCourse[] }[] = [];

  for (const milestone of plan.milestones) {
    for (const course of milestone.courses) {
      const isStarted = startedCourseIds?.has(course.id) ?? false;
      const isCompleted = completedCourseIds?.has(course.id) ?? false;
      if (!isStarted && !isCompleted) continue;

      const partner = course.partners[0] ?? "Coursera";
      const partnerLogo = course.partnerLogos?.[0];
      const existing = groups.find(
        (g) => g.partner === partner && g.courses.length < 5
      );
      if (existing) {
        existing.courses.push(course);
      } else {
        groups.push({
          title: `${partner} — ${milestone.name}`,
          partner,
          partnerLogo,
          courses: [course],
        });
      }
    }
  }

  if (groups.length === 0 && seededGroups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#dae1ed] bg-[#fafbfc] px-6 py-10 text-center">
        <p className="text-sm font-medium text-[#1f1f1f]">No courses in progress yet</p>
        <p className="mt-1 text-xs text-[#5b6780]">
          Open a course from your plan to start learning. It&rsquo;ll show up here as you make progress.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group, i) => (
        <CertificateCard
          key={i}
          title={group.title}
          partner={group.partner}
          partnerLogo={group.partnerLogo}
          courses={group.courses}
          completedCourseIds={completedCourseIds}
          onResumeCourse={onResumeCourse}
        />
      ))}
      {seededGroups.map((g) => (
        <SeededCertificateCard
          key={g.partner}
          partner={g.partner}
          partnerLogo={g.partnerLogo}
          courses={g.courses}
        />
      ))}
    </div>
  );
}
