"use client";

import type { LearningPlan, PlanCourse } from "@/lib/plan-types";

interface InProgressTabProps {
  plan: LearningPlan | null;
}

function CourseProgressCard({
  course,
  courseIndex,
  totalCourses,
  isActive,
}: {
  course: PlanCourse;
  courseIndex: number;
  totalCourses: number;
  isActive: boolean;
}) {
  const progress = isActive ? Math.floor(Math.random() * 60) + 10 : 0;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#e3e8ef] py-4 last:border-0">
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-medium text-[#0056d2]">{course.name}</h4>
        <p className="mt-0.5 text-xs text-[#5b6780]">
          Course {courseIndex} of {totalCourses}
          {isActive
            ? ` · ${progress}% Complete`
            : " · Not started"}
        </p>
        {isActive && (
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e3e8ef]">
            <div
              className="h-full rounded-full bg-[#137333] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      {isActive && (
        <button className="shrink-0 rounded-lg bg-[#0056d2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0048b0] transition-colors">
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
}: {
  title: string;
  partner: string;
  partnerLogo?: string;
  courses: PlanCourse[];
}) {
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
            isActive={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}

export function InProgressTab({ plan }: InProgressTabProps) {
  if (!plan) {
    return (
      <div className="rounded-xl border border-dashed border-[#dae1ed] bg-[#fafbfc] px-6 py-10 text-center">
        <p className="text-sm font-medium text-[#1f1f1f]">No courses in progress</p>
        <p className="mt-1 text-xs text-[#5b6780]">
          Once you have a learning plan, your enrolled courses will appear here.
        </p>
      </div>
    );
  }

  // Group courses by first partner (as a proxy for certificate grouping)
  const groups: { title: string; partner: string; partnerLogo?: string; courses: PlanCourse[] }[] = [];

  for (const milestone of plan.milestones) {
    for (const course of milestone.courses) {
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

  return (
    <div className="space-y-4">
      {groups.map((group, i) => (
        <CertificateCard
          key={i}
          title={group.title}
          partner={group.partner}
          partnerLogo={group.partnerLogo}
          courses={group.courses}
        />
      ))}
    </div>
  );
}
