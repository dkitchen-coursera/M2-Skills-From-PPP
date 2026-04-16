"use client";

import Image from "next/image";

const CAREERS = [
  {
    title: "Data Analyst",
    description: "Collect, organize, and transform data to make informed decisions",
    salary: "$90,500",
    jobs: "82,489",
    image: "/assets/google-data-analytics.jpg",
    bgColor: "#f0f6ff",
  },
  {
    title: "Project Manager",
    description: "Collect, organize, and transform data to make informed decisions",
    salary: "$90,500",
    jobs: "82,489",
    image: "/assets/google-project-management.jpg",
    bgColor: "#fff4e8",
  },
  {
    title: "Cyber Security Analyst",
    description: "Collect, organize, and transform data to make informed decisions",
    salary: "$90,500",
    jobs: "82,489",
    image: "/assets/ibm-ai-developer.jpg",
    bgColor: "#f9f5ff",
  },
  {
    title: "Digital Marketing Specialist",
    description: "Collect, organize, and transform data to make informed decisions",
    salary: "$90,500",
    jobs: "82,489",
    image: "/assets/ibm-data-analyst.png",
    bgColor: "#e3eeff",
  },
  {
    title: "UI / UX Designer",
    description: "Collect, organize, and transform data to make informed decisions",
    salary: "$90,500",
    jobs: "82,489",
    image: "/assets/data-science.jpg",
    bgColor: "#fff4e8",
  },
];

function CareerCard({ career }: { career: (typeof CAREERS)[number] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#dae1ed] bg-white">
      <div className="relative h-[125px] overflow-hidden rounded-lg m-2" style={{ backgroundColor: career.bgColor }}>
        <Image
          src={career.image}
          alt={career.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-4 pt-2">
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold leading-5 text-[#0f1114]">{career.title}</p>
          <p className="text-sm leading-5 text-[#5b6780]">{career.description}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm">
            <span className="font-semibold text-[#0f1114]">{career.salary}</span>{" "}
            <span className="text-[#5b6780]">median salary&nbsp;&sup1;</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-[#0f1114]">{career.jobs}</span>{" "}
            <span className="text-[#636363]">jobs available&nbsp;&sup1;</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function ExploreCareersSection() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <h2 className="text-xl font-semibold leading-6 text-[#0f1114]">Explore careers</h2>
        <button className="flex items-center gap-1 text-sm font-semibold text-[#0056d2]">
          View all
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="#0056d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {CAREERS.map((career) => (
          <CareerCard key={career.title} career={career} />
        ))}
      </div>
    </div>
  );
}
