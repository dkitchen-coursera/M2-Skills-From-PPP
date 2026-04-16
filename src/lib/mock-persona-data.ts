import type { GatheredInfo } from "@/lib/types";

export const ONBOARDED_GATHERED_INFO: GatheredInfo = {
  goal: "Data Analyst",
  skills: "SQL, Python, Data Visualization",
  background: null,
  constraints: null,
};

export const IN_PROGRESS_GATHERED_INFO: GatheredInfo = {
  goal: "Software Developer",
  skills: "JavaScript, React, Node.js",
  background: null,
  constraints: null,
};

export type InProgressCourse = {
  title: string;
  partner: string;
  partnerLogo: string;
  rating: number;
  productType: string;
  progress?: number;
};

export const HERO_COURSE: InProgressCourse = {
  title: "Introduction to Software Engineering",
  partner: "IBM",
  partnerLogo: "/assets/ibm-logo.png",
  rating: 4.7,
  productType: "Course",
  progress: 0,
};

export const RECENTLY_VIEWED_COURSES: InProgressCourse[] = [
  {
    title: "Google Data Analytics",
    partner: "Google",
    partnerLogo: "/assets/google-logo.png",
    rating: 4.8,
    productType: "Professional Certificate",
  },
  {
    title: "Dynamic Public Speaking",
    partner: "University of Washington",
    partnerLogo: "/assets/umich-logo.png",
    rating: 4.7,
    productType: "Specialization",
  },
  {
    title: "Meta React Native",
    partner: "Meta",
    partnerLogo: "/assets/meta-logo.png",
    rating: 4.6,
    productType: "Specialization",
  },
];

export const SIMILAR_ACTIVITY_COURSES: InProgressCourse[] = [
  {
    title: "IBM Data Analytics with Excel and R",
    partner: "IBM",
    partnerLogo: "/assets/ibm-logo.png",
    rating: 4.7,
    productType: "Professional Certificate",
  },
  {
    title: "Business and Financial Modeling",
    partner: "University of Pennsylvania",
    partnerLogo: "/assets/umich-logo.png",
    rating: 4.5,
    productType: "Specialization",
  },
];
