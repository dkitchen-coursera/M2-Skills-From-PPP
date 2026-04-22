/**
 * Role Catalog — 4 roles with skill areas and skill expressions.
 * Data Analyst skill data ported from ai-sprint-skills prototype.
 *
 * Data Analyst has migrated to the new `{skill × mastery-level}` group model
 * (`model: "groups"`) sourced from `data/da-mastery-groups.ts`. The legacy
 * `skills: SkillArea[]` is still populated on DA as a fallback for unmigrated
 * surfaces until Phase 8 cleanup removes it.
 */

import {
  DATA_ANALYST_MASTERY_GROUPS,
  REQUIRED_GROUP_KEYS,
  type MasteryGroupDef,
} from "./data/da-mastery-groups";

export interface SkillExpression {
  id: string;
  name: string;
  xpMax: number; // 300
}

export interface SkillArea {
  id: string;
  name: string;
  level: string; // e.g., "Level 1: Early Career"
  expressions: SkillExpression[];
  xpMax: number; // sum of expression xpMax values
}

export interface RoleDefinition {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  description: string;
  demandLabel: string;
  skills: SkillArea[];
  keywords: string[];
  /** Discriminator — defaults to "areas" when absent. "groups" roles also populate `groups`. */
  model?: "areas" | "groups";
  /** Populated when model === "groups" — unit of mastery is {skill × level}. */
  groups?: MasteryGroupDef[];
  /** Group keys that count toward plan completion. DA: Career Band 1 groups. */
  requiredGroupKeys?: string[];
}

const EXPR_XP = 300;

function expr(name: string): SkillExpression {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name,
    xpMax: EXPR_XP,
  };
}

function area(id: string, name: string, level: string, expressions: SkillExpression[]): SkillArea {
  return { id, name, level, expressions, xpMax: expressions.length * EXPR_XP };
}

// ── Data Analyst — ported from ai-sprint-skills prototype ─────────────────

const DA_L1 = "Level 1: Early Career";
const DA_L2 = "Level 2: Mid Career";

const DATA_ANALYST_SKILLS: SkillArea[] = [
  // Level 1: Early Career
  area("data-acquisition-preparation", "Data Acquisition and Preparation", DA_L1, [
    expr("Connecting to Data Sources"),
    expr("Data Cleaning Techniques"),
    expr("Data Collection Methods"),
    expr("Data Ethics and Privacy"),
    expr("Data Formatting and Transformation"),
    expr("Data Import and Export"),
    expr("Data Quality Assessment"),
    expr("Data Sampling Techniques"),
    expr("Data Validation"),
    expr("File Format Handling"),
    expr("Missing Data Handling"),
    expr("Spreadsheet Data Management"),
  ]),
  area("data-analysis-exploration", "Data Analysis and Exploration", DA_L1, [
    expr("Analytical Thinking"),
    expr("Data-Driven Decision Making"),
    expr("Descriptive Statistics"),
    expr("Exploratory Data Analysis"),
    expr("Pattern Recognition"),
    expr("Problem Framing"),
    expr("Structured Thinking"),
  ]),
  area("data-transformation-manipulation", "Data Transformation and Manipulation", DA_L1, [
    expr("Data Aggregation"),
    expr("Data Filtering and Sorting"),
    expr("Data Merging and Joining"),
    expr("Data Pivoting"),
    expr("Data Type Conversion"),
    expr("String Manipulation"),
    expr("Variable Creation"),
  ]),
  area("data-visualization-reporting", "Data Visualization and Reporting", DA_L1, [
    expr("Chart Selection"),
    expr("Dashboard Design"),
    expr("Data Storytelling"),
    expr("Presentation Skills"),
    expr("Report Generation"),
    expr("Visual Design Principles"),
    expr("Visualization Tools"),
    expr("Audience Communication"),
  ]),
  area("database-operations", "Database Operations for Data Analysis", DA_L1, [
    expr("SQL Fundamentals"),
    expr("Database Querying"),
    expr("Data Retrieval"),
    expr("Database Concepts"),
  ]),
  area("gen-ai-assistance", "Generative AI Assistance", DA_L1, [
    expr("AI Tool Usage"),
    expr("Prompt Engineering Basics"),
    expr("AI Output Evaluation"),
  ]),
  area("statistical-modeling-inference", "Statistical Modeling and Inference", DA_L1, [
    expr("Basic Probability"),
    expr("Correlation Analysis"),
    expr("Distributions"),
    expr("Hypothesis Testing"),
    expr("Confidence Intervals"),
    expr("Regression Basics"),
    expr("Sample Size Determination"),
    expr("Statistical Significance"),
    expr("Variance Analysis"),
    expr("Bayesian Basics"),
  ]),
  // Level 2: Mid Career
  area("advanced-analytics-techniques", "Advanced Analytics & Techniques", DA_L2, [
    expr("A/B Testing"),
    expr("Anomaly Detection"),
    expr("Causal Inference"),
    expr("Clustering Analysis"),
    expr("Cohort Analysis"),
    expr("Customer Segmentation"),
    expr("Dimensionality Reduction"),
    expr("Feature Engineering"),
    expr("Funnel Analysis"),
    expr("Market Basket Analysis"),
    expr("Optimization Techniques"),
    expr("Sentiment Analysis"),
    expr("Text Analytics"),
    expr("Network Analysis"),
  ]),
  area("advanced-data-viz-reporting", "Advanced Data Visualization & Reporting", DA_L2, [
    expr("Advanced Dashboard Design"),
    expr("Custom Visualizations"),
    expr("Data Journalism"),
    expr("Executive Reporting"),
    expr("Geographic Visualization"),
    expr("Interactive Visualizations"),
    expr("KPI Dashboard Design"),
    expr("Real-Time Dashboards"),
    expr("Stakeholder Communication"),
    expr("Tableau Advanced"),
    expr("Visual Analytics"),
    expr("Power BI Advanced"),
  ]),
  area("data-engineering-management", "Data Engineering & Management", DA_L2, [
    expr("API Integration"),
    expr("Cloud Data Services"),
    expr("Data Architecture"),
    expr("Data Governance"),
    expr("Data Lake Management"),
    expr("Data Modeling"),
    expr("Data Pipeline Design"),
    expr("Data Warehousing"),
    expr("Database Administration"),
    expr("ETL Processes"),
    expr("NoSQL Databases"),
    expr("Performance Optimization"),
    expr("Schema Design"),
    expr("SQL Advanced"),
    expr("Streaming Data"),
    expr("Version Control for Data"),
    expr("Big Data Frameworks"),
    expr("Data Security"),
    expr("Workflow Automation"),
  ]),
  area("gen-ai-applications", "Generative AI Applications", DA_L2, [
    expr("AI-Assisted Analysis"),
    expr("Code Generation"),
    expr("LLM Integration"),
    expr("Prompt Engineering Advanced"),
    expr("RAG Techniques"),
  ]),
  area("predictive-analytics-forecasting", "Predictive Analytics & Forecasting", DA_L2, [
    expr("Classification Models"),
    expr("Decision Trees"),
    expr("Ensemble Methods"),
    expr("Feature Selection"),
    expr("Forecasting Methods"),
    expr("Model Evaluation"),
    expr("Model Selection"),
    expr("Neural Networks Basics"),
    expr("Regression Models"),
    expr("Time Series Analysis"),
    expr("Cross-Validation"),
    expr("Hyperparameter Tuning"),
  ]),
  area("statistical-analysis-modeling", "Statistical Analysis & Modeling", DA_L2, [
    expr("Advanced Regression"),
    expr("ANOVA"),
    expr("Bayesian Analysis"),
    expr("Effect Size Estimation"),
    expr("Experimental Design"),
    expr("Mixed Models"),
    expr("Multivariate Analysis"),
    expr("Non-Parametric Tests"),
    expr("Survival Analysis"),
    expr("Power Analysis"),
  ]),
];

// ── Digital Marketing Specialist ──────────────────────────────────────────

const DM_L1 = "Level 1: Foundations";
const DM_L2 = "Level 2: Advanced";

const DIGITAL_MARKETING_SKILLS: SkillArea[] = [
  area("seo-sem", "SEO & SEM", DM_L1, [
    expr("Keyword Research"),
    expr("On-Page SEO"),
    expr("Technical SEO"),
    expr("Search Console Analytics"),
    expr("Link Building Strategies"),
  ]),
  area("content-strategy", "Content Strategy", DM_L1, [
    expr("Content Planning"),
    expr("Editorial Calendar Management"),
    expr("Content Audit"),
    expr("Copywriting Fundamentals"),
  ]),
  area("social-media", "Social Media Marketing", DM_L1, [
    expr("Platform Strategy"),
    expr("Community Management"),
    expr("Social Listening"),
    expr("Influencer Marketing"),
  ]),
  area("analytics-metrics", "Analytics & Metrics", DM_L1, [
    expr("Google Analytics"),
    expr("Attribution Modeling"),
    expr("KPI Definition"),
    expr("Reporting Dashboards"),
    expr("Conversion Tracking"),
  ]),
  area("email-marketing", "Email Marketing", DM_L1, [
    expr("List Segmentation"),
    expr("A/B Testing Emails"),
    expr("Automation Workflows"),
  ]),
  area("brand-storytelling", "Brand & Storytelling", DM_L2, [
    expr("Brand Positioning"),
    expr("Narrative Frameworks"),
    expr("Visual Brand Identity"),
  ]),
  area("paid-advertising", "Paid Advertising", DM_L2, [
    expr("PPC Campaign Management"),
    expr("Display Advertising"),
    expr("Retargeting Strategies"),
    expr("Budget Optimization"),
    expr("Ad Creative Testing"),
  ]),
  area("marketing-tools", "Marketing Tools & Platforms", DM_L2, [
    expr("Marketing Automation"),
    expr("CRM Integration"),
    expr("Tag Management"),
    expr("Landing Page Optimization"),
  ]),
];

// ── UX Designer ───────────────────────────────────────────────────────────

const UX_L1 = "Level 1: Foundations";
const UX_L2 = "Level 2: Advanced";

const UX_DESIGNER_SKILLS: SkillArea[] = [
  area("user-research", "User Research", UX_L1, [
    expr("Interview Techniques"),
    expr("Survey Design"),
    expr("Persona Development"),
    expr("Journey Mapping"),
    expr("Competitive Analysis"),
  ]),
  area("interaction-design", "Interaction Design", UX_L1, [
    expr("Navigation Patterns"),
    expr("Micro-Interactions"),
    expr("Responsive Design"),
    expr("Gesture Design"),
    expr("State Management"),
  ]),
  area("visual-design", "Visual Design", UX_L1, [
    expr("Color Theory"),
    expr("Typography"),
    expr("Layout Principles"),
    expr("Iconography"),
  ]),
  area("prototyping", "Prototyping & Wireframing", UX_L1, [
    expr("Low-Fidelity Wireframing"),
    expr("High-Fidelity Prototyping"),
    expr("Interactive Prototypes"),
    expr("Design Handoff"),
  ]),
  area("usability-testing", "Usability Testing", UX_L1, [
    expr("Test Planning"),
    expr("Moderated Testing"),
    expr("Unmoderated Testing"),
    expr("Heuristic Evaluation"),
  ]),
  area("info-architecture", "Information Architecture", UX_L2, [
    expr("Card Sorting"),
    expr("Site Mapping"),
    expr("Content Hierarchy"),
  ]),
  area("design-systems", "Design Systems", UX_L2, [
    expr("Component Libraries"),
    expr("Design Tokens"),
    expr("Documentation Standards"),
    expr("Governance Processes"),
  ]),
  area("accessibility", "Accessibility & Inclusion", UX_L2, [
    expr("WCAG Guidelines"),
    expr("Screen Reader Testing"),
    expr("Color Contrast"),
  ]),
];

// ── Project Manager ───────────────────────────────────────────────────────

const PM_L1 = "Level 1: Foundations";
const PM_L2 = "Level 2: Advanced";

const PROJECT_MANAGER_SKILLS: SkillArea[] = [
  area("planning-scheduling", "Planning & Scheduling", PM_L1, [
    expr("Work Breakdown Structure"),
    expr("Gantt Charts"),
    expr("Critical Path Method"),
    expr("Resource Allocation"),
    expr("Milestone Planning"),
  ]),
  area("risk-management", "Risk Management", PM_L1, [
    expr("Risk Identification"),
    expr("Risk Assessment"),
    expr("Mitigation Planning"),
    expr("Risk Monitoring"),
  ]),
  area("stakeholder-comm", "Stakeholder Communication", PM_L1, [
    expr("Status Reporting"),
    expr("Stakeholder Analysis"),
    expr("Meeting Facilitation"),
    expr("Conflict Resolution"),
  ]),
  area("agile-scrum", "Agile & Scrum", PM_L1, [
    expr("Sprint Planning"),
    expr("Daily Standups"),
    expr("Retrospectives"),
    expr("Backlog Grooming"),
    expr("Velocity Tracking"),
  ]),
  area("budgeting", "Budgeting & Cost Control", PM_L1, [
    expr("Cost Estimation"),
    expr("Budget Tracking"),
    expr("Earned Value Management"),
  ]),
  area("quality-management", "Quality Management", PM_L2, [
    expr("Quality Planning"),
    expr("Process Improvement"),
    expr("Metrics & KPIs"),
  ]),
  area("leadership", "Leadership & Team Building", PM_L2, [
    expr("Team Motivation"),
    expr("Delegation"),
    expr("Performance Management"),
    expr("Cross-Functional Leadership"),
    expr("Coaching & Mentoring"),
  ]),
  area("pm-tools", "PM Tools & Documentation", PM_L2, [
    expr("Jira & Agile Tools"),
    expr("Project Documentation"),
    expr("Change Management"),
    expr("Lessons Learned"),
  ]),
];

// ── Catalog ───────────────────────────────────────────────────────────────

export const ROLE_CATALOG: RoleDefinition[] = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    subtitle: "Early Professional",
    category: "Data & Analytics",
    icon: "query_stats",
    description:
      "Collect, transform, and organize data to draw conclusions, make predictions, and drive informed decision-making.",
    demandLabel: "+12% job demand",
    skills: DATA_ANALYST_SKILLS,
    keywords: [
      "data", "analyst", "analytics", "sql", "statistics", "python",
      "spreadsheet", "tableau", "power bi", "excel", "visualization", "dashboard",
    ],
    model: "groups",
    groups: DATA_ANALYST_MASTERY_GROUPS,
    requiredGroupKeys: REQUIRED_GROUP_KEYS,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Specialist",
    subtitle: "Early Professional",
    category: "Marketing",
    icon: "campaign",
    description:
      "Plan and execute digital campaigns across channels, analyze performance data, and optimize for growth.",
    demandLabel: "+18% job demand",
    skills: DIGITAL_MARKETING_SKILLS,
    keywords: [
      "marketing", "digital", "seo", "sem", "social media", "content",
      "campaign", "advertising", "ads", "email marketing", "brand", "growth",
    ],
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    subtitle: "Early Professional",
    category: "Design & Product",
    icon: "draw",
    description:
      "Research user needs, design intuitive interfaces, prototype solutions, and test usability to create user-centered products.",
    demandLabel: "+14% job demand",
    skills: UX_DESIGNER_SKILLS,
    keywords: [
      "ux", "ui", "design", "user experience", "user interface", "prototype",
      "wireframe", "figma", "research", "usability", "interaction",
    ],
  },
  {
    id: "project-manager",
    title: "Project Manager",
    subtitle: "Early Professional",
    category: "Business & Operations",
    icon: "assignment",
    description:
      "Lead cross-functional teams, manage timelines and budgets, mitigate risks, and deliver projects on time and within scope.",
    demandLabel: "+10% job demand",
    skills: PROJECT_MANAGER_SKILLS,
    keywords: [
      "project", "manager", "management", "agile", "scrum", "pmp",
      "planning", "schedule", "stakeholder", "budget", "leadership", "team lead",
    ],
  },
];

/** Find a role by exact ID. */
export function findRoleById(id: string): RoleDefinition | null {
  return ROLE_CATALOG.find((r) => r.id === id) ?? null;
}

/** Match a role from free text using keyword scoring. */
export function findRoleByKeywords(text: string): RoleDefinition | null {
  if (!text) return null;
  const lower = text.toLowerCase();
  let best: RoleDefinition | null = null;
  let bestScore = 0;

  for (const role of ROLE_CATALOG) {
    let score = 0;
    for (const kw of role.keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = role;
    }
  }

  return best;
}

/** Get a role catalog summary suitable for embedding in a system prompt. */
export function getRoleCatalogForPrompt(): string {
  return ROLE_CATALOG.map((role) => {
    let skillsBlock: string;
    if (role.model === "groups" && role.groups) {
      // Group-shape: emit `  - Intermediate SQL (Band 1, 4 expressions)` lines,
      // grouped by career band to reflect the required vs. other distinction.
      const band1 = role.groups.filter((g) => g.careerBand === 1);
      const band2 = role.groups.filter((g) => g.careerBand === 2);
      const fmt = (g: MasteryGroupDef) =>
        `  - ${g.displayName} [${g.key}] (${g.expressions.length} expression${g.expressions.length === 1 ? "" : "s"})`;
      const parts: string[] = [];
      if (band1.length) {
        parts.push("Required (Data Career Band 1):");
        parts.push(band1.map(fmt).join("\n"));
      }
      if (band2.length) {
        parts.push("Other (Data Career Band 2 — not required for plan completion):");
        parts.push(band2.map(fmt).join("\n"));
      }
      skillsBlock = parts.join("\n");
    } else {
      skillsBlock = role.skills
        .map((s) => `  - ${s.name} (${s.expressions.length} skill expressions)`)
        .join("\n");
    }
    return `### ${role.title} (${role.subtitle}) — ${role.category}
ID: ${role.id}
${role.description}
Demand: ${role.demandLabel}
Skills:
${skillsBlock}`;
  }).join("\n\n");
}
