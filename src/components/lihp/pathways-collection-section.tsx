"use client";

import Image from "next/image";

type PathwayCourse = {
  title: string;
  partner: string;
  partnerLogo: string;
  thumbnail: string;
  skills: string[];
  rating: number;
  reviews: string;
  level: string;
  productType: string;
  courseCount: number;
  duration: string;
  isTopRecommendation?: boolean;
};

const DATA_ANALYST_COURSES: PathwayCourse[] = [
  {
    title: "IBM Data Analyst Professional Certificate",
    partner: "IBM",
    partnerLogo: "/assets/ibm-logo.png",
    thumbnail: "/assets/ibm-data-analyst.png",
    skills: ["Data Analysis", "Microsoft Excel", "SQL"],
    rating: 4.8,
    reviews: "147K",
    level: "Beginner",
    productType: "Professional Certificate",
    courseCount: 11,
    duration: "6-9 months",
    isTopRecommendation: true,
  },
  {
    title: "Google Data Analytics Professional Certificate",
    partner: "Google",
    partnerLogo: "/assets/google-logo.png",
    thumbnail: "/assets/google-data-analytics.jpg",
    skills: ["Data Visualization", "Python Programming", "SQL"],
    rating: 4.8,
    reviews: "132K",
    level: "Beginner",
    productType: "Professional Certificate",
    courseCount: 8,
    duration: "6 months",
  },
  {
    title: "Data Science: Foundations using R",
    partner: "Johns Hopkins University",
    partnerLogo: "/assets/umich-logo.png",
    thumbnail: "/assets/data-science.jpg",
    skills: ["R Programming", "Data Cleaning", "Statistical Analysis"],
    rating: 4.7,
    reviews: "89K",
    level: "Beginner",
    productType: "Specialization",
    courseCount: 5,
    duration: "3-6 months",
  },
  {
    title: "Python for Data Science, AI & Development",
    partner: "IBM",
    partnerLogo: "/assets/ibm-logo.png",
    thumbnail: "/assets/ibm-ai-developer.jpg",
    skills: ["Python Programming", "Data Science", "AI"],
    rating: 4.6,
    reviews: "74K",
    level: "Beginner",
    productType: "Course",
    courseCount: 1,
    duration: "4-6 weeks",
  },
];

const SOFTWARE_DEV_COURSES: PathwayCourse[] = [
  {
    title: "IBM Full Stack Software Developer",
    partner: "IBM",
    partnerLogo: "/assets/ibm-logo.png",
    thumbnail: "/assets/ibm-ai-developer.jpg",
    skills: ["JavaScript", "React", "Node.js"],
    rating: 4.7,
    reviews: "52K",
    level: "Beginner",
    productType: "Professional Certificate",
    courseCount: 12,
    duration: "6-9 months",
    isTopRecommendation: true,
  },
  {
    title: "Google IT Automation with Python",
    partner: "Google",
    partnerLogo: "/assets/google-logo.png",
    thumbnail: "/assets/google-project-management.jpg",
    skills: ["Python", "Git", "Automation"],
    rating: 4.8,
    reviews: "98K",
    level: "Beginner",
    productType: "Professional Certificate",
    courseCount: 6,
    duration: "6 months",
  },
  {
    title: "Meta Front-End Developer",
    partner: "Meta",
    partnerLogo: "/assets/meta-logo.png",
    thumbnail: "/assets/ai-for-everyone.png",
    skills: ["HTML", "CSS", "React"],
    rating: 4.7,
    reviews: "63K",
    level: "Beginner",
    productType: "Professional Certificate",
    courseCount: 9,
    duration: "7 months",
  },
  {
    title: "Introduction to Computer Science",
    partner: "Harvard University",
    partnerLogo: "/assets/umich-logo.png",
    thumbnail: "/assets/data-science.jpg",
    skills: ["C", "Python", "Algorithms"],
    rating: 4.9,
    reviews: "41K",
    level: "Beginner",
    productType: "Course",
    courseCount: 1,
    duration: "10 weeks",
  },
];

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="#f5c451" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0l1.76 3.57L12 4.14 8.88 7.1l.74 4.3L6 9.27 2.38 11.4l.74-4.3L0 4.14l4.24-.57L6 0z" />
    </svg>
  );
}

function PathwayCard({ course }: { course: PathwayCourse }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[#dae1ed] bg-white">
      {/* Thumbnail */}
      <div className="relative m-2 h-[131px] overflow-hidden rounded-lg">
        {course.isTopRecommendation && (
          <span className="absolute right-2 top-2 z-10 rounded-full bg-[#f0f6ff] px-2.5 py-0.5 text-xs font-semibold text-[#0056d2]">
            Top recommendation
          </span>
        )}
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 pt-2">
        {/* Partner + title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Image
              src={course.partnerLogo}
              alt={course.partner}
              width={20}
              height={20}
              className="h-5 w-5 shrink-0 rounded-full"
            />
            <span className="text-sm text-[#5b6780]">{course.partner}</span>
          </div>
          <p className="text-base font-semibold leading-5 text-[#0f1114]">{course.title}</p>
        </div>

        {/* Skills */}
        <p className="text-sm leading-5">
          <span className="font-semibold text-[#1f1f1f]">Skills you&apos;ll gain: </span>
          <span className="text-[#5b6780]">{course.skills.join(", ")}</span>
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <StarIcon />
          <span className="font-semibold text-[#0f1114]">{course.rating}</span>
          <span className="text-[#5b6780]">&middot; {course.reviews} reviews</span>
        </div>

        {/* Metadata */}
        <p className="text-xs text-[#5b6780]">
          {course.level} &middot; {course.productType}
          {course.courseCount > 1 ? ` (${course.courseCount} courses)` : ""}
          {" "}&middot; {course.duration}
        </p>

        {/* CTA */}
        <button className="mt-auto w-full rounded-lg bg-[#0056d2] py-2 text-sm font-semibold text-white hover:bg-[#004bb5] transition-colors cursor-pointer">
          Enroll for free
        </button>
      </div>
    </div>
  );
}

interface PathwaysCollectionSectionProps {
  role: string;
}

export function PathwaysCollectionSection({ role }: PathwaysCollectionSectionProps) {
  const courses = role === "Data Analyst" ? DATA_ANALYST_COURSES : SOFTWARE_DEV_COURSES;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold leading-6 text-[#0f1114]">
        {role === "Data Analyst" ? (
          <>Build your skills as a <span className="underline">Data Analyst</span></>
        ) : (
          <>Master Agile as a <span className="underline">{role}</span></>
        )}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {courses.map((course) => (
          <PathwayCard key={course.title} course={course} />
        ))}
      </div>
    </div>
  );
}
