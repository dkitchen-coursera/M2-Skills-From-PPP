# PPP Prototype — Personalized Progressive Pathways

A conversational AI prototype where Coursera Plus learners explore career goals, share their background and constraints, and receive a personalized, skills-focused learning plan. Built for rapid user testing (April 2026).

## Demo Flows

The prototype runs in **mock mode** (no API key required) with two scripted conversation paths. Both are accessible from the entry screen prompt pills.

### Flow 1: Role-Based Path (4 steps)

Click **"I want to become a Data Analyst"** (or any role pill).

1. AI confirms the role and asks about current skills/experience
2. Learner shares background
3. AI asks about timeline and availability
4. Learner provides constraints → plan auto-generates

The generated plan includes milestones targeting all skills for the chosen role.

### Flow 2: Skills-First Path (3 steps)

Click **"I want to learn SQL and data visualization"** (or any skills pill).

1. AI confirms the skills and asks about current role/experience
2. Learner shares background → AI asks about timeline
3. Learner provides constraints → plan auto-generates (auto-maps to closest role)

The generated plan focuses specifically on the named skills with a shorter milestone set.

### After Plan Generation

Once a plan is generated, the learner lands on the **My Learning** page with tabs:

- **My Plan** — Full plan with milestones and courses. Click "Start learning plan" to enter the course experience (LEX).
- **In Progress** — Courses grouped by partner with progress indicators.
- **Skills** — Role-focused skill areas with XP progress bars. "Should" skills are above the fold; other skill tiers are expandable below.

### Inside a Course (LEX)

The learning experience shows a sidebar syllabus with video, reading, practice, and graded items. Completing items earns Skill XP that feeds back into the Skills tab and plan mastery percentage.

### Celebration Events

- **Module Complete** — Triggered when all items in a module are done. Shows skill progress bars and overall plan mastery percentage.
- **Course Complete** — Triggered when all items in a course are done. Full-screen takeover with certificate card, LinkedIn share button, and plan progress timeline showing what's next.
- **Role Mastery** — Triggered when all "should" skills reach mastery. Congratulations screen with option to explore a new role.

## Proto Tools

A floating **"P" button** (bottom-right corner) opens the proto tools panel for demo control:

| Button | What it does |
|--------|-------------|
| **Jump to role** | Select any role from the catalog to set up role progress and start a conversation |
| **Set All Mastered** | Max out all skill XP for the active role |
| **Set Random Progress** | Randomize skill XP values for realistic-looking progress |
| **Reset Progress** | Zero out all skill XP |
| **Trigger Role Mastery** | Set all skills to mastered and show the role mastery celebration |
| **Trigger Module Complete** | Complete all items in the current module, award XP, and show the module complete modal (only available inside LEX) |
| **Trigger Course Complete** | Complete all items in the entire course, award all XP, and show the course complete screen (only available inside LEX) |

## Prototype Features

- Conversational onboarding to identify goal role & current experience
- Two mock paths: role-based (4-step) and skills-first (3-step)
- Skills-focused course plan generation (master skills, not just complete courses)
- Course item completion earns Skill XP toward role goals
- Role-focused Skills tab highlighting goal-relevant skills above the fold
- Module complete celebration with skill progress & plan-level mastery %
- Course complete screen with certificate, LinkedIn share & plan progress timeline
- Per-course completion tracking in My Plan and In Progress tabs
- Role mastery celebration on plan completion
- Role catalog (4 roles, 8 skills each)
- XP-based progress tracking (0-1500 per skill)
- Proto tools panel for triggering demo events

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript, React 19)
- **AI**: OpenAI API via Vercel AI SDK (`useChat`, streaming, structured output)
- **Styling**: Tailwind CSS v4
- **State**: Zustand + AI SDK conversation state
- **Deployment**: AWS Amplify (standalone output mode)

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. No API key is needed — mock mode activates automatically when `OPENAI_API_KEY` is not set.

To enable live AI mode, create `.env.local`:

```
OPENAI_API_KEY=sk-...
```

## Prompt Variants

The prototype supports multiple prompt variants selectable via URL parameter.

| Variant | URL |
|---------|-----|
| Default | `/` (no param needed) |
| Experimental | `/?prompt=experimental` |
| Onboarded | `/?prompt=onboarded` |

A red banner at the top confirms which variant is active. See `src/lib/prompts/` to add new variants.

### Adding a New Prompt Variant

1. Copy an existing file in `src/lib/prompts/` (e.g., `experimental.ts`)
2. Name it to match your desired URL param (e.g., `concise.ts` for `?prompt=concise`)
3. Register it in `src/lib/prompts/get-system-prompt.ts` by adding an import and entry in `promptRegistry`
4. Merge to `main` — Amplify auto-deploys in ~5 minutes
